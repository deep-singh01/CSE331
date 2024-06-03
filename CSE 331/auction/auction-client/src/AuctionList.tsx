import React, { Component, MouseEvent } from 'react';
import { Auction, parseAuction } from './auction';
import { isRecord } from './record';


type ListProps = {
  onNewClick: () => void,
  onAuctionClick: (name: string) => void
};

type ListState = {
  now: number,  // current time when rendering
  auctions: Auction[] | undefined,
};


// Shows the list of all the auctions.
export class AuctionList extends Component<ListProps, ListState> {

  constructor(props: ListProps) {
    super(props);
    this.state = {now: Date.now(), auctions: undefined};
  }

  componentDidMount = (): void => {
    this.doRefreshClick();
  }

  componentDidUpdate = (prevProps: ListProps): void => {
    if (prevProps !== this.props) {
      this.setState({now: Date.now()});  // Force a refresh
    }
  };

  render = (): JSX.Element => {
    return (
      <div>
        <h2>Current Auctions</h2>
        {this.renderAuctions()}
        <button type="button" onClick={this.doRefreshClick}>Refresh</button>
        <button type="button" onClick={this.doNewClick}>New Auction</button>
      </div>);
  };

  renderAuctions = (): JSX.Element => {
    if (this.state.auctions === undefined) {
      return <p>Loading auction list...</p>;
    } else {
      const auctions: JSX.Element[] = [];
      for (const auction of this.state.auctions) {
        const min = (auction.endTime - this.state.now) / 60 / 1000;
        const desc = (min < 0) ? "" :
            <span>&nbsp;&ndash; {Math.round(min)} minutes remaining</span>;
        auctions.push(
          <li key={auction.name}>
            <a href="#" onClick={(evt) => this.doAuctionClick(evt, auction.name)}>{auction.name}</a>
            {desc}
          </li>);
      }
      return <ul>{auctions}</ul>;
    }
  };

  doListResp = (resp: Response): void => {
    if (resp.status === 200) {
      resp.json().then(this.doListJson)
          .catch(() => this.doListError("200 response is not JSON"));
    } else if (resp.status === 400) {
      resp.text().then(this.doListError)
          .catch(() => this.doListError("400 response is not text"));
    } else {
      this.doListError(`bad status code from /api/list: ${resp.status}`);
    }
  };

  doListJson = (data: unknown): void => {
    if (!isRecord(data)) {
      console.error("bad data from /api/list: not a record", data);
      return;
    }

    if (!Array.isArray(data.auctions)) {
      console.error("bad data from /api/list: auctions is not an array", data);
      return;
    }

    const auctions: Auction[] = [];
    for (const val of data.auctions) {
      const auction = parseAuction(val);
      if (auction === undefined)
        return;
      auctions.push(auction);
    }
    this.setState({auctions, now: Date.now()});  // fix time also
  };

  doListError = (msg: string): void => {
    console.error(`Error fetching /api/list: ${msg}`);
  };

  doRefreshClick = (): void => {
    fetch("/api/list").then(this.doListResp)
        .catch(() => this.doListError("failed to connect to server"));
  };

  doNewClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    this.props.onNewClick();  // tell the parent to show the new auction page
  };

  doAuctionClick = (evt: MouseEvent<HTMLAnchorElement>, name: string): void => {
    evt.preventDefault();
    this.props.onAuctionClick(name);
  };
}
