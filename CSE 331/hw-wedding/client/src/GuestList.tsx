import React, { Component, MouseEvent } from 'react';
import { Guest, calcGuestsAndFam, parseGuest } from './guest';
import { isRecord } from './record';


type ListProps = {
  onAddGuestClick: () => void,
  onGuestClick: (name: string) => void
};

type ListState = {
  guests: Guest[] | undefined,
};

export class GuestList extends Component<ListProps, ListState> {

  constructor(props: ListProps) {
    super(props);
    this.state = {guests: undefined};
  }

  componentDidMount = (): void => {
    this.doRefreshClick();
  }

  render = (): JSX.Element => {
    return (
      <div>
        <h2>Guest List</h2>
        {this.renderGuests()}
        <br />
        <button type="button" onClick={this.doAddGuestClick}>Add Guest</button>
      </div>);
  };

  renderGuests = (): JSX.Element => {
    if (this.state.guests === undefined) {
      return <p>Loading guest list...</p>;
    } else {
      const guests: JSX.Element[] = [];
      for (const guest of this.state.guests) {
        const plusOne = (guest.hasPlusOne === undefined) ? "+1?" : ` +${guest.hasPlusOne}`
        guests.push(
          <li key={guest.name}>
            <label><a href="#" onClick={(evt) => this.doGuestClick(evt, guest.name)}>{guest.name}</a>, guest of {guest.guestOf}, <b>{plusOne}</b></label>
          </li>);
      }
      const guestsOfMolly = calcGuestsAndFam("Molly", this.state.guests);
      const guestsOfJames = calcGuestsAndFam("James", this.state.guests);
      const rangeMolly = guestsOfMolly.min === guestsOfMolly.max? guestsOfMolly.min: guestsOfMolly.min + "-" + guestsOfMolly.max;
      const rangeJames = guestsOfJames.min === guestsOfJames.max? guestsOfJames.min: guestsOfJames.min + "-" + guestsOfJames.max;
      return <div>
                <ul>{guests}</ul>
                <h2>Summary:</h2>
                <p><b>{rangeMolly}</b> guest(s) of Molly <b>({guestsOfMolly.family})</b></p>
                <p><b>{rangeJames}</b> guest(s) of James <b>({guestsOfJames.family})</b></p>
            </div>;
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

    if (!Array.isArray(data.guests)) {
      console.error("bad data from /api/list: guests is not an array", data);
      return;
    }

    const guests: Guest[] = [];
    for (const val of data.guests) {
      const guest = parseGuest(val);
      if (guest === undefined)
        return;
      guests.push(guest);
    }
    this.setState({guests: guests});  // fix time also
  };

  doListError = (msg: string): void => {
    console.error(`Error fetching /api/list: ${msg}`);
  };

  doRefreshClick = (): void => {
    fetch("/api/list").then(this.doListResp)
        .catch(() => this.doListError("failed to connect to server"));
  };

  doAddGuestClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    this.props.onAddGuestClick();  // tell the parent to show the new guest page
  };

  // Opens the guest details page for guest.
  doGuestClick = (evt: MouseEvent<HTMLAnchorElement>, name: string): void => {
    evt.preventDefault();
    this.props.onGuestClick(name);
  };
}