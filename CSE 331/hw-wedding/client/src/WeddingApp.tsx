import React, { Component } from 'react';
import { AddGuest } from './AddGuest';
import { GuestDetails } from './GuestDetails';
import { GuestList } from './GuestList';


// Indicates which page to show. If it is the details page, the argument
// includes the specific guest to show the details of.
type Page = "list" | "new" | {kind: "details", name: string}; 

// RI: If page is "details", then index is a valid index into guests array.
type AppState = {page: Page};

// Whether to show debugging information in the console.
const DEBUG: boolean = true;


// Top-level component that displays the appropriate page.
export class WeddingApp extends Component<{}, AppState> {

  constructor(props: {}) {
    super(props);
    this.state = {page: "list"};
  }

  render = (): JSX.Element => {
    if (this.state.page === "list") { 
      if (DEBUG) console.debug("rendering list page");
      return <GuestList onAddGuestClick={this.doAddGuestClick}
                          onGuestClick={this.doGuestClick}/>;

    } else if (this.state.page === "new") {
      if (DEBUG) console.debug("rendering add page");
      return <AddGuest onBackClick={this.doBackClick}/>;

    } else {  // details
      if (DEBUG) console.debug(`rendering details page for "${this.state.page.name}"`);
      return <GuestDetails name={this.state.page.name} onBackClick={this.doBackClick}/>;
    }
  };

  doAddGuestClick = (): void => {
    if (DEBUG) console.debug("set state to new");
    this.setState({page: "new"});
  };
  
  doGuestClick = (name: string): void => {
    if (DEBUG) console.debug(`set state to details for guest ${name}`);
    this.setState({page: {kind: "details", name}});
  };
  
  doBackClick = (): void => {
    if (DEBUG) console.debug("set state to list");
    this.setState({page: "list"});
  };
}