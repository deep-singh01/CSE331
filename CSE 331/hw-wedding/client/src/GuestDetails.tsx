import React, { Component, ChangeEvent, MouseEvent } from 'react';
import { parseGuest } from './guest';
import { isRecord } from './record';


type DetailsProps = {
  name: string,
  onBackClick: () => void
};

type DetailsState = {
  name: string,
  guestOf: string,
  family: boolean,
  dietRestrictions: string | undefined,
  hasPlusOne?: 0 | 1,
  plusOneName?: string,
  plusOneDietRest?: string,
  error: string
};

export class GuestDetails extends Component<DetailsProps, DetailsState> {

  constructor(props: DetailsProps) {
    super(props);

    this.state = {name: this.props.name,
      guestOf: "unknown", family: false,
      dietRestrictions: "",
      hasPlusOne: undefined,
      plusOneName: undefined,
      plusOneDietRest: undefined, error: ""};
  }

  componentDidMount = (): void => {
    this.doRefreshClick(); 
  };

  render = (): JSX.Element => {
    if (this.state.guestOf === "unknown") {
      return <p>Loading guest "{this.props.name}"...</p>
    } else {
      return (<div>
      <h2>Guest Details</h2>
        {this.renderGuest()}
        {this.renderPlusOne()}
        <button type="button" onClick={this.doSaveClick}>Save</button>
        <button type="button" onClick={this.doBackClick}>Back</button>
        {this.renderError()}
      </div>);
    }
  };

  // Renders the guest details
  renderGuest = (): JSX.Element => {
    return (
      <div>
          <p>{this.state.name}, guest of {this.state.guestOf}{(this.state.family === true) ? ", family" : ""}</p>
          <div>
              <label htmlFor="diet">Dietary Restrictions: (specify "none" if none):    </label>
              <input id="diet" type="text" value={this.state.dietRestrictions} placeholder="Enter dietary restrictions" onChange={this.doDietChange}/>
          </div>
          <br></br>
          <div>
              <label htmlFor="plus_one_rsvp">Additional Guest?     </label>
              <select id="plus_one_rsvp" value={this.state.hasPlusOne} onChange={this.doPlusOneChange}>
                  <option value="undefined">Unknown</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
              </select>
          </div>
          <br></br>
      </div>);
  };

  // Renders the additional guest details
  renderPlusOne = (): JSX.Element => {
    if (this.state.hasPlusOne !== 1) return <div></div>;
    return (<div>
        <div>
            <label htmlFor="plusOneName">Additional Guest Name:</label> <br></br>
            <input id="plusOneName" type="text" value={this.state.plusOneName} placeholder="Enter plus-one's name here" onChange={this.doPlusOneNameChange}/>
        </div>
        <div>
            <label htmlFor="plusOneDiet">Additional Guest Dietary Restrictions (specify "none" if none):</label> <br></br>
            <input id="plusOneDiet" type="text" value={this.state.plusOneDietRest} placeholder="Enter plus-one's dietary restrictions here" onChange={this.doPlusOneDietChange}/>
        </div>
        <br></br>
    </div>);
  };

  renderError = (): JSX.Element => {
    if (this.state.error.length === 0) {
      return <div></div>;
    } else {
      return (<div><b>Error</b>: {this.state.error}</div>);
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

    this.doGuestChange(data);
  }

  // Updates the name of the additional guest.
  doPlusOneNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({plusOneName: evt.target.value, error: ""});
  };

  // Updates the dietary restrictions of the additional guest.
  doPlusOneDietChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({plusOneDietRest: evt.target.value, error: ""});
  };

  // Shared helper to update the state with the new guest.
  doGuestChange = (data: {guest?: unknown}): void => {
    const guest = parseGuest(data.guest);
    if (guest !== undefined) {
      this.setState({
        name: guest.name,
        guestOf: guest.guestOf,
        family: guest.family,
        dietRestrictions: guest.dietRestrictions,
        hasPlusOne: guest.hasPlusOne,
        plusOneName: guest.plusOneName,
        plusOneDietRest: guest.plusOneDietRest,
        error: ""
      });
    } else {
      console.error("guest from /api/get did not parse", data.guest)
    }
  };

  doGetError = (msg: string): void => {
    console.error(`Error fetching /api/get: ${msg}`);
  };

  // Updates the dietary restrictions of the guest.
  doDietChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({dietRestrictions: evt.target.value, error: ""});
  };

  // Updates record for additional guest
  doPlusOneChange = (evt: ChangeEvent<HTMLSelectElement>): void => {
      if (evt.target.value === "0") {
          this.setState({ hasPlusOne: 0, plusOneName: undefined, plusOneDietRest: undefined});
      } else if (evt.target.value === "1") {
          this.setState({ hasPlusOne: 1 });
      } else {
          this.setState({ hasPlusOne: undefined, plusOneName: undefined, plusOneDietRest: undefined});
      }
  };

  // Saves the guest details
  doSaveClick = (_: MouseEvent<HTMLButtonElement>): void => {
    if (this.state.dietRestrictions === undefined ||
        this.state.dietRestrictions.trim().length === 0) {
      this.setState({error: "a required field is missing."});
      return;
    }

    if (this.state.hasPlusOne === undefined) {
      const args = { name: this.state.name, guestOf: this.state.guestOf,
          family: this.state.family, dietRestrictions: this.state.dietRestrictions};
      fetch("/api/add", {
          method: "POST", body: JSON.stringify(args),
          headers: {"Content-Type": "application/json"} })
        .then(this.doSaveResp)
        .catch(() => this.doSaveError("failed to connect to server"));
    }

    if (this.state.hasPlusOne === 1 && 
      (this.state.plusOneName === undefined ||
      this.state.plusOneName.trim().length === 0 ||
      this.state.plusOneDietRest === undefined ||
      this.state.plusOneDietRest.trim().length === 0)) {
      this.setState({error: "a required field for plus one is missing."});
      return;
    }
    const args = { name: this.state.name, guestOf: this.state.guestOf,
      family: this.state.family, dietRestrictions: this.state.dietRestrictions,
      hasPlusOne: this.state.hasPlusOne, plusOneName: this.state.plusOneName, plusOneDietRest: this.state.plusOneDietRest};
    fetch("/api/add", {
        method: "POST", body: JSON.stringify(args),
        headers: {"Content-Type": "application/json"} })
      .then(this.doSaveResp)
      .catch(() => this.doSaveError("failed to connect to server"));
  };

  doSaveResp = (resp: Response): void => {
    if (resp.status === 200) {
      resp.json().then(this.doSaveJson)
          .catch(() => this.doSaveError("200 response is not JSON"));
    } else if (resp.status === 400) {
      resp.text().then(this.doSaveError)
          .catch(() => this.doSaveError("400 response is not text"));
    } else {
      this.doSaveError(`bad status code from /api/addSave: ${resp.status}`);
    }
  };
  
  doSaveJson = (data: unknown): void => {
    if (!isRecord(data)) {
      console.error("bad data from /api/add: not a record", data);
      return;
    }
      
    if (!isRecord(data.guest)) {
      console.error("bad data from /api/add: missing 'guest'", data);
      return;
    }
    this.props.onBackClick();  // show the updated list
  };
  
  doSaveError = (msg: string): void => {
    this.setState({error: msg})
  };

  doBackClick = (_: MouseEvent<HTMLButtonElement>): void => {
    this.props.onBackClick();  // tell the parent to show the full list again
  };
}