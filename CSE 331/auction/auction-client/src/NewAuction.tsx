import React, { Component, ChangeEvent, MouseEvent } from 'react';
import { isRecord } from './record';


type NewAuctionProps = {
  onBackClick: () => void
};

type NewAuctionState = {
  name: string,
  description: string,
  seller: string,
  minutes: string,
  minBid: string
  error: string
};


// Allows the user to create a new auction.
export class NewAuction extends Component<NewAuctionProps, NewAuctionState> {

  constructor(props: NewAuctionProps) {
    super(props);
    this.state = {name: "", description: "", seller: "", minutes: "60",
                  minBid: "1", error: ""};
  }

  render = (): JSX.Element => {
    return (
      <div>
        <h2>New Auction</h2>
        <div>
          <label htmlFor="name">Item Name:</label>
          <input id="name" type="text" value={this.state.name}
              onChange={this.doNameChange}></input>
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input id="description" type="text" value={this.state.description}
              onChange={this.doDescChange}></input>
        </div>
        <div>
          <label htmlFor="seller">Seller Name:</label>
          <input id="seller" type="text" value={this.state.seller}
              onChange={this.doSellerChange}></input>
        </div>
        <div>
          <label htmlFor="minutes">Minutes:</label>
          <input id="minutes" type="number" min="1" value={this.state.minutes}
              onChange={this.doMinutesChange}></input>
        </div>
        <div>
          <label htmlFor="minBid">Minimum Bid:</label>
          <input id="minBid" type="number" min="1" value={this.state.minBid}
              onChange={this.doMinBidChange}></input>
        </div>
        <button type="button" onClick={this.doStartClick}>Start</button>
        <button type="button" onClick={this.doBackClick}>Back</button>
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

  doNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({name: evt.target.value, error: ""});
  };

  doDescChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({description: evt.target.value, error: ""});
  };

  doSellerChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({seller: evt.target.value, error: ""});
  };

  doMinutesChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({minutes: evt.target.value, error: ""});
  };

  doMinBidChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({minBid: evt.target.value, error: ""});
  };

  doStartClick = (_: MouseEvent<HTMLButtonElement>): void => {
    // Verify that the user entered all required information.
    if (this.state.name.trim().length === 0 ||
        this.state.description.trim().length === 0 ||
        this.state.seller.trim().length === 0 ||
        this.state.minutes.trim().length === 0 ||
        this.state.minBid.trim().length === 0) {
      this.setState({error: "a required field is missing."});
      return;
    }

    // Verify that minutes is a number.
    const minutes = parseFloat(this.state.minutes);
    if (isNaN(minutes) || minutes < 1 || Math.floor(minutes) !== minutes) {
      this.setState({error: "minutes is not a positive integer"});
      return;
    }

    // Ignore this request if the minutes or minBid are not numbers.
    const minBid = parseFloat(this.state.minBid);
    if (isNaN(minBid) || minBid < 1 || Math.floor(minBid) !== minBid) {
      this.setState({error: "min bid is not a positive integer"});
      return;
    }

    // Ask the app to start this auction (adding it to the list).
    const args = { name: this.state.name,
        description: this.state.description, seller: this.state.seller,
        minBid: minBid, minutes: minutes };
    fetch("/api/add", {
        method: "POST", body: JSON.stringify(args),
        headers: {"Content-Type": "application/json"} })
      .then(this.doAddResp)
      .catch(() => this.doAddError("failed to connect to server"));
  };

  doAddResp = (resp: Response): void => {
    if (resp.status === 200) {
      resp.json().then(this.doAddJson)
          .catch(() => this.doAddError("200 response is not JSON"));
    } else if (resp.status === 400) {
      resp.text().then(this.doAddError)
          .catch(() => this.doAddError("400 response is not text"));
    } else {
      this.doAddError(`bad status code from /api/add: ${resp.status}`);
    }
  };

  doAddJson = (data: unknown): void => {
    if (!isRecord(data)) {
      console.error("bad data from /api/add: not a record", data);
      return;
    }

    this.props.onBackClick();  // show the updated list
  };

  doAddError = (msg: string): void => {
    this.setState({error: msg})
  };

  doBackClick = (_: MouseEvent<HTMLButtonElement>): void => {
    this.props.onBackClick();  // tell the parent this was clicked
  };
}
