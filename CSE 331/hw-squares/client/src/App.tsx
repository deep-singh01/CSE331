import React, { Component } from "react";
import { solid, Path, Square} from './square';
import { FilePicker } from "./FilePicker";
import { FileEditor } from "./FileEditor";
import { saveFile, loadFile, listFiles } from "./server";

/** Describes set of possible app page views */
type Page = {kind: "FileEditor"} | {kind: "FilePicker"}; // TODO: modify to set of relevant page states         

type AppState = {
  show: Page;   // Stores state for the current page of the app to show
  names: string[];  // List of file names
  name: string;  // Name of the file currently being edited
  root: Square;  // Root square of the file currently being edited
  loading: boolean;  // Loading state
};

/**
 * Displays the square application containing either a list of files names
 * to pick from or an editor for files files
 */
export class App extends Component<{}, AppState> {

  constructor(props: {}) {
    super(props);

    this.state = {show: {kind: "FilePicker"}, names: [], name: "", root: solid("white"), loading: false};
  }

  componentDidMount = (): void => {
    this.setState({loading: true});
    listFiles(this.doListFilesResp);
  };

  render = (): JSX.Element => {
    //const sq: Square = split(solid("blue"), solid("orange"), solid("purple"), solid("red"));

    // TODO (Q2): Replace return with commented out line to render full editor
    //            component instead of always a static square
    // return <SquareElem width={600n} height={600n} square={sq}
    //          onClick={this.doSquareClick}/>;

    if(this.state.loading === true){
      return <h1>Loading...</h1>
    }
    if (this.state.show.kind === "FileEditor") {
      return <FileEditor initialState={this.state.root} onSave={this.doSaveClick}
        onBack={this.doBackClick} name={this.state.name}/>
    } else {
      return <FilePicker files={this.state.names} onSelectFile={this.doSelectClick} onCreateFile={this.doCreateClick}/>
    }
      

    // TODO (Q4): render the correct component or loading message depending on 
    // current view instead of always displaying editor
  };

  doSquareClick = (path: Path): void => {
    console.log(path);
    alert("Stop that!");
  };

  // TODO: write functions here to handle switching between app pages and
  //       for accessing server through server.ts helper functions

  // Updates the UI to show the file editor with a new file (solid white square)
  doCreateClick = (name: string): void => {
    this.setState({show: {kind: "FileEditor"}, name: name, root: solid("white")});
  };

  // Loads and updates the UI to show the selected file
  doSelectClick = (name: string): void => {
    this.setState({loading: true});
    loadFile(name, this.doLoadFileResp);
  };

  // Handles callback for loading a file
  doLoadFileResp = (name: string, sq: Square | null): void => {
    if(sq !== null) {
      this.setState({show: {kind: "FileEditor"}, name: name, root: sq, loading: false });
    } else {
      alert("Failed to load file");
    }
  };

  // Handles callback for listing files
  doListFilesResp = (names: string[]): void => {
    this.setState({loading: false, names: names, show: {kind: "FilePicker"}});
  }

  // Saves the current file and updates the UI to show the file picker
  doSaveClick = (name: string, root: Square): void => {
    this.setState({loading: false});
    saveFile(name, root, this.doSaveFileResp);
  }

  // Handles callback for saving a file
  doSaveFileResp = (name: string, saved: boolean): void => {
    if(saved) {
      console.log("Saved file: " + name);
    } else {
      alert("Failed to save file");
    }
  }

  // Updates the UI to show the file picker
  doBackClick = (): void => {
    listFiles(this.doListFilesResp);
  }
}
