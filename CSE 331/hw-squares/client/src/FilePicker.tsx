import React, { Component, ChangeEvent, MouseEvent } from "react";


type FilePickerProps = {
  // TODO: may want to add some props
  files: string[]; // list of file names (squares)
  onSelectFile: (name: string) => void; // selected file name
  onCreateFile: (name: string) => void; // created file name
};


type FilePickerState = {
  name: string;  // text in the name text box
};


/** Displays the list of created design files. */
export class FilePicker extends Component<FilePickerProps, FilePickerState> {

  constructor(props: FilePickerProps) {
    super(props);

    this.state = {name: ''};
  }

  render = (): JSX.Element => {
    // TODO: format list of files as links
    const fileElems: JSX.Element[] = [];

    // turns file names into clickable links
    for (const file of this.props.files) {
      fileElems.push(<li key={file}>
          <a href="#" onClick={(_evt) => this.doSelectClick(file)}>{file}</a>
        </li>);
    }

    return (<div>
        <h3>Files</h3>
        {/* TODO: Render file links & textbox for creating a file here */}
        <ul>{fileElems}</ul>
        <label>Name: </label>
        <input type="text" value={this.state.name} style={{ marginRight: '5px'}} onChange={this.doNameChange} />
        <button onClick={this.doCreateClick}>Create</button>
      </div>);
  };

  // Updates our record with the name text being typed in
  doNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    // TODO: remove this code, implement
    this.setState({name: evt.target.value});
  };

  // Updates the UI to show the file editor
  doCreateClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    // TODO: implement
    this.props.onCreateFile(this.state.name);
    this.setState({name: ''});
  };

  // Updates the UI to show the selected file
  doSelectClick = (name: string): void => {
    this.props.onSelectFile(name);
  }
}
