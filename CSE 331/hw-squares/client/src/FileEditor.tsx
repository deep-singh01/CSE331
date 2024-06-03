import React, { Component, ChangeEvent, MouseEvent } from "react";
import { Square, Path, get, split, solid, newSquare, toColor  } from './square';
import { SquareElem } from "./square_draw";
import { len, prefix } from "./list";


type FileEditorProps = {
  /** Initial state of the file. */
  initialState: Square;

  /** Called to ask parent to save file contents in server. */
  onSave: (name: string, root: Square) => void;

  // TODO: may want to add more props

  /** Called to ask parent to go back to file picker. */
  onBack: () => void;

  /** Name of the file currently being edited. */
  name: string;
};


type FileEditorState = {
  /** The root square of all squares in the design */
  root: Square;

  /** Path to the square that is currently clicked on, if any */
  selected?: Path;

  /** Name of the file currently being edited. */
  name: string;

  /** Color selected in the dropdown */
  selectedColor?: string;
};


/** UI for editing square design page. */
export class FileEditor extends Component<FileEditorProps, FileEditorState> {

  constructor(props: FileEditorProps) {
    super(props);

    this.state = { root: props.initialState, name: props.name};
  }

  render = (): JSX.Element => {
    // TODO: add some editing tools here
    // if a square is selected, show the split, merge, and color change buttons
    // in addition to save and back buttons
    if (this.state.selected) {
      return (<div>
              <div style={{ display: 'flex' }}>
              <SquareElem width={600n} height={600n}
                    square={this.state.root} selected={this.state.selected}
                    onClick={this.doSquareClick}></SquareElem>
              <div style={{ marginLeft: '10px' , marginTop: '250px'}}>
                <label style={{ fontWeight: 'bold', fontSize: '20px' }}>Tools</label>
                <br />
                <br />
                <button type="button"  style={{marginBottom: '5px', marginRight: '5px'}}onClick={this.doSplitClick}>Split</button>
                <button type="button" style={{marginBottom: '5px', marginRight: '5px'}} onClick={this.doMergeClick}>Merge</button>
                <select name="colors" style={{marginBottom: '5px', marginRight: '5px'}} id="colors" value={this.state.selectedColor} onChange={this.doColorChange}>
                  <option value="white">White</option>
                  <option value="red">Red</option>
                  <option value="orange">Orange</option>
                  <option value="yellow">Yellow</option>
                  <option value="green">Green</option>
                  <option value="blue">Blue</option>
                  <option value="purple">Purple</option>
                </select>
                <br />
                <button type="button" style={{marginBottom: '5px', marginRight: '5px'}} onClick={this.doSaveClick}>Save</button>
                <button type="button" style={{marginBottom: '5px', marginRight: '5px'}} onClick={this.doBackClick}>Back</button>
              </div>
              </div>
          </div>);
    }

    return (<div>
              <div style={{ display: 'flex' }}>
              <SquareElem width={600n} height={600n}
                    square={this.state.root} selected={this.state.selected}
                    onClick={this.doSquareClick}></SquareElem>
              <div style={{ marginLeft: '10px' , marginTop: '250px'}}>
                <label style={{ fontWeight: 'bold', fontSize: '20px' }}>Tools</label>
                <br />
                <br />
                <button type="button" style={{marginBottom: '5px', marginRight: '5px'}} onClick={this.doSaveClick}>Save</button>
                <button type="button" style={{marginBottom: '5px', marginRight: '5px'}} onClick={this.doBackClick}>Back</button>
              </div>
              </div>
          </div>);
  };

  // Updates the UI to show the selected square
  doSquareClick = (path: Path): void => {
    // TODO: remove this code, do something with the path to the selected square
    const sq = get(path, this.state.root);
    if(sq.kind ===  "solid"){
      this.setState({ selected: path, selectedColor: sq.color.toString() });
    } else {
      this.setState({ selected: path, selectedColor: undefined });
    }
  }

  // Splits the selected square into four squares of the same color
  doSplitClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    // TODO: implement
    if (this.state.selected) {
      const sq = get(this.state.selected, this.state.root);
      if (sq.kind === "solid") {
        const newSq = split(sq, sq, sq, sq);
        const newRoot = newSquare(this.state.selected, this.state.root, newSq);
        this.setState({ root: newRoot, selected: undefined });
      }
    }
  };  

  // Merges the selected square with its siblings
  doMergeClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    // TODO: implement
    if (this.state.selected && len(this.state.selected) > 0n) {
      const sq = get(this.state.selected, this.state.root);
      const newPath = prefix(len(this.state.selected) - 1n, this.state.selected);
      const newRoot = newSquare(newPath, this.state.root, sq);
      this.setState({ root: newRoot, selected: undefined});
    }
  };

  // Changes the color of the selected square
  doColorChange = (evt: ChangeEvent<HTMLSelectElement>): void => {
    // TODO: remove this code, implement
    if (this.state.selected) {
      const sq = get(this.state.selected, this.state.root);
      if (sq.kind === "solid") {
        const newSq = solid(toColor(evt.target.value)); // Convert string value to Color type
        const newRoot = newSquare(this.state.selected, this.state.root, newSq);
        this.setState({ root: newRoot, selectedColor: evt.target.value, selected: undefined});
      }
    }
  };

  // Saves the file to the server
  doSaveClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    this.props.onSave(this.state.name, this.state.root);
  };

  // Goes back to the file picker
  doBackClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    this.props.onBack();
  };
}
