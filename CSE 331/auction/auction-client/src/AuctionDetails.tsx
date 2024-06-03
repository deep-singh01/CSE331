import React, { Component, ChangeEvent, MouseEvent } from 'react';
import { Auction, parseAuction } from './auction';
import { isRecord } from './record';


type DetailsProps = {
  name: string,
  onBackClick: () => void,
};

type DetailsState = {
  now: number,
  auction: Auction | undefined,
  bidder: string,
  amount: string,
  error: string
};


// Shows an individual auction and allows bidding (if ongoing).
export class AuctionDetails extends Component<DetailsProps, DetailsState> {

  constructor(props: DetailsProps) {
    super(props);

    this.state = {now: Date.now(), auction: undefined,
                  bidder: "", amount: "", error: ""};
  }

  componentDidMount = (): void => {
    this.doRefreshClick(); 
  };

  render = (): JSX.Element => {
    if (this.state.auction === undefined) {
      return <p>Loading auction "{this.props.name}"...</p>
    } else {
      if (this.state.auction.endTime <= this.state.now) {
        return this.renderCompleted(this.state.auction);
      } else {
        return this.renderOngoing(this.state.auction);
      }
    }
  };

  renderCompleted = (auction: Auction): JSX.Element => {
    return (
      <div>
        <h2>{auction.name}</h2>
        <p>{auction.description}</p>
        <p>Winning Bid: {auction.maxBid} (by {auction.maxBidder})</p>
      </div>);
  };

  renderOngoing = (auction: Auction): JSX.Element => {
    const min = Math.round((auction.endTime - this.state.now) / 60 / 100) / 10;
    return (
      <div>
        <h2>{auction.name}</h2>
        <p>{auction.description}</p>
        <p><i>Bidding ends in {min} minutes...</i></p>
        <p>Current Bid: ${auction.maxBid} by {auction.maxBidder}</p>
        <div>
          <label htmlFor="bidder">Name:</label>
          <input type="text" id="bidder" value={this.state.bidder} 
              onChange={this.doBidderChange}></input>
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input type="number" min={auction.maxBid + 1}
              id="amount" value={this.state.amount} 
              onChange={this.doAmountChange}></input>
        </div>
        <button type="button" onClick={this.doBidClick}>Bid</button>
        <button type="button" onClick={this.doRefreshClick}>Refresh</button>
        <button type="button" onClick={this.doDoneClick}>Done</button>
        {this.renderError()}
      </div>);
  };

  renderError = (): JSX.Element => {
    if (this.state.error.length === 0) {
      return <div></div>;
    } else {
      const style = {width: '300px', backgroundColor: 'rgb(246,194,192)',
          border: '1px solid rgb(137,66,61)', borderRadius: '5px', padding: '5px' };
      return (<div style={{marginTop: '15px'}}>
          <span style={style}><b>Error</b>: {this.state.error}</span>
        </div>);
    }
  };

  doRefreshClick = (): void => {
    fetch("/api/get?name=" + encodeURIComponent(this.props.name))
      .then(this.doGetResp)
      .catch(() => this.doGetError("failed to connect to server"));
  };

  doGetResp = (res: Response): void => {
    if (res.status === 200) {
      res.json().then(this.doGetJson)
          .catch(() => this.doGetError("200 res is not JSON"));
    } else if (res.status === 400) {
      res.text().then(this.doGetError)
          .catch(() => this.doGetError("400 response is not text"));
    } else {
      this.doGetError(`bad status code from /api/get: ${res.status}`);
    }
  };

  doGetJson = (data: unknown): void => {
    if (!isRecord(data)) {
      console.error("bad data from /api/get: not a record", data);
      return;
    }

    this.doAuctionChange(data);
  }

  // Shared helper to update the state with the new auction.
  doAuctionChange = (data: {auction?: unknown}): void => {
    const auction = parseAuction(data.auction);
    if (auction !== undefined) {
      // If the current bid is too small, let's also fix that.
      const amount = parseFloat(this.state.amount);
      if (isNaN(amount) || amount < auction.maxBid + 1) {
        this.setState({auction, now: Date.now(), error: "",
                       amount: '' + (auction.maxBid + 1)});
      } else {
        this.setState({auction, now: Date.now(), error: ""});
      }
    } else {
      console.error("auction from /api/get did not parse", data.auction)
    }
  };

  doGetError = (msg: string): void => {
    console.error(`Error fetching /api/get: ${msg}`);
  };

  doBidderChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({bidder: evt.target.value, error: ""});
  };

  doAmountChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({amount: evt.target.value, error: ""});
  };

  doBidClick = (_: MouseEvent<HTMLButtonElement>): void => {
    if (this.state.auction === undefined)
      throw new Error("impossible");

    // Verify that the user entered all required information.
    if (this.state.bidder.trim().length === 0 ||
        this.state.amount.trim().length === 0) {
      this.setState({error: "a required field is missing."});
      return;
    }

    // Verify that amount is a positive integer.
    const amount = parseFloat(this.state.amount);
    if (isNaN(amount) || Math.floor(amount) !== amount) {
      this.setState({error: "amount is not an integer"});
      return;
    }

    // Verify that amount is bigger than the current bid.
    if (amount < this.state.auction.maxBid + 1) {
      this.setState({error: "amount is not bigger than current bid"});
      return;
    }

    const args = {name: this.props.name, bidder: this.state.bidder, amount};
    fetch("/api/bid", {
        method: "POST", body: JSON.stringify(args),
        headers: {"Content-Type": "application/json"} })
      .then(this.doBidResp)
      .catch(() => this.doBidError("failed to connect to server"));
  };

  doBidResp = (res: Response): void => {
    if (res.status === 200) {
      res.json().then(this.doBidJson)
          .catch(() => this.doBidError("200 response is not JSON"));
    } else if (res.status === 400) {
      res.text().then(this.doBidError)
          .catch(() => this.doBidError("400 response is not text"));
    } else {
      this.doBidError(`bad status code from /api/bid: ${res.status}`);
    }
  };

  doBidJson = (data: unknown): void => {
    if (this.state.auction === undefined)
      throw new Error("impossible");

    if (!isRecord(data)) {
      console.error("bad data from /api/bid: not a record", data);
      return;
    }

    this.doAuctionChange(data);
  };

  doBidError = (msg: string): void => {
    console.error(`Error fetching /api/bid: ${msg}`);
  };

  doDoneClick = (_: MouseEvent<HTMLButtonElement>): void => {
    this.props.onBackClick();  // tell the parent to show the full list again
  };
}
