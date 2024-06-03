import React, { Component, ChangeEvent, MouseEvent } from 'react';
import { isRecord } from './record';

type AddGuestProps = {
  onBackClick: () => void
};

type AddGuestState = {
  name: string,
  guestOf: string,
  family: boolean,
  error: string
};

// Allows the user to add new guest to the guest list.
export class AddGuest extends Component<AddGuestProps, AddGuestState> {

  constructor(props: AddGuestProps) {
    super(props);
    this.state = {name: "", guestOf: "unknown", family: false, error: ""};
  }

  render = (): JSX.Element => {
    return (
      <div>
        <h2>Add Guest</h2>
        <br />
        <div>
          <label htmlFor="name">Name:      </label>
           <input id="name" type="text" value={this.state.name} placeholder='Enter name here'
              onChange={this.doNameChange}></input>
        </div>
        <br></br>
        <div>
          <label>Guest of:</label> <br></br>
          <label htmlFor="molly"><input type="radio" name="guestOf" value="Molly" onChange={this.doGuestOfClick}></input>Molly</label><br></br>
          <label htmlFor="james"><input type="radio"name="guestOf"  value="James" onChange={this.doGuestOfClick}></input>James</label><br></br>
        </div>
        <br></br>
        <div>
          <label><input type="checkbox" id="family" onChange={this.doIsFamilyClick}></input>Family?</label> <br></br>
        </div>
        <br></br>
        <button type="button" onClick={this.doAddClick}>Add</button>
        <button type="button" onClick={this.doBackClick}>Back</button>
        {this.renderError()}
      </div>);
  };

  renderError = (): JSX.Element => {
    if (this.state.error.length === 0) {
      return <div></div>;
    } else {
      return (<div><b>Error</b>: {this.state.error}</div>);
    }
  };

  // Updates the name of the guest.
  doNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({name: evt.target.value, error: ""});
  };

  // Updates the member of the couple the guest is associate with.
  doGuestOfClick = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({guestOf: evt.target.value, error: ""});
  }

  // Updates whether the guest is a family member.
  doIsFamilyClick = (evt: ChangeEvent<HTMLInputElement>): void => {
    this.setState({family: evt.target.checked, error: ""});
  }

  // Adds the guest to the guest list.
  doAddClick = (_: MouseEvent<HTMLButtonElement>): void => {
    if (this.state.name.trim().length === 0 ||
        this.state.guestOf === "unknown") {
      this.setState({error: "a required field is missing."});
      return;
    }
    // Ask the app to add this guest (adding it to the list).
    const args = { name: this.state.name,
      guestOf: this.state.guestOf, family: this.state.family};
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

    if (!isRecord(data.guest)) {
      console.error("bad data from /api/add: missing 'guest'", data);
      return;
    }

    this.props.onBackClick();  // show the updated list
  };

  doAddError = (msg: string): void => {
    this.setState({error: msg})
  };

  // Tells the parent to show the guest list.
  doBackClick = (_: MouseEvent<HTMLButtonElement>): void => {
    this.props.onBackClick();  // tell the parent this was clicked
  };
}