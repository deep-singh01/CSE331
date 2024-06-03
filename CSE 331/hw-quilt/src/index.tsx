import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { Color, RED, GREEN, Quilt } from './quilt';
import { PatternA, PatternB, PatternC, PatternD, PatternE } from './patterns';
import { QuiltElem } from './quilt_draw';
import { symmetrize } from './quilt_ops';
import { QuiltForm } from './quilt_form';

// Returns the pattern number, which must be A-E, or undefined if it was not
// provided or is not in the valid range.
const getPattern = (params: URLSearchParams): string|undefined => {
  if (!params.has("pattern"))
    return undefined;

  switch (params.get("pattern")) {
    case "A": return "A";
    case "B": return "B";
    case "C": return "C";
    case "D": return "D";
    case "E": return "E";
    default:  return undefined;
  }
}


// Returns the color requested or undefined if none was specified.
const getColor = (params: URLSearchParams): Color|undefined => {
  const colorStr = params.get("color");
  if (colorStr === null) {
    return undefined;
  } else {
    const color = colorStr.toLowerCase();
    if (color === "red") {
      return RED; 
    } else if (color === "green") {
      return GREEN;
    } else {
      return undefined;
    }
  }
}


// Returns the number of rows, which must be a natural number. Defaults to 4.
const getRows = (params: URLSearchParams): bigint => {
  const rowStr = params.get("rows");
  if (rowStr === null) {
    return 4n;
  } else {
    const rows = parseInt(rowStr);
    return !isNaN(rows) ? BigInt(rows) : 4n;
  }
};


// TODO: update getQuilt with new params as necessary

// Returns the quilt with the given pattern.
// Throws an exception if the pattern is not A-E.
const getQuilt = (pattern: string, c: Color, r: bigint): Quilt => {
  switch (pattern) {
    case "A": return PatternA(r, c);
    case "B": return PatternB(r, c);
    case "C": return PatternC(r, c);
    case "D": return PatternD(r, c);
    case "E": return PatternE(r, c);
    default:  throw new Error('impossible');
  }
};



// Parse the arguments to the page, which can indicate the color and number of
// rows in the quilt.
const params: URLSearchParams = new URLSearchParams(window.location.search);
// Default Color: Green
const c: Color|undefined = getColor(params) ?? GREEN;  // TODO: utilize return value for problem 1c
// Default Rows: 4
const r: bigint = getRows(params);   // TODO: utilize return value for problem 1e

// Create a root in which to show the quilt.
const main: HTMLElement|null = document.getElementById('main');
if (main === null)
  throw new Error('missing main element');
const root: Root = createRoot(main);

// Invoke the function for the pattern given in the query params.
const pattern: string|undefined = getPattern(params);
if (pattern === undefined) {
  root.render(QuiltForm({}));  // redirect with form

} else {
  // Display the quilt in the page.
  try {
    // TODO: symmetrize if specified in the query params for problem 
    const result = params.has("symmetrize") === true? symmetrize(getQuilt(pattern, c, r)) : getQuilt(pattern, c, r);

    // Note: <QuiltElem> is a custom HTML tag we created to render the quilt
    //   images according to the quilt pattern passed in ('result'). We'll
    //   learn more about these later!
    root.render(<React.StrictMode><QuiltElem quilt={result}/></React.StrictMode>);
  } catch (e: unknown) {
    if (e instanceof Error) {
      root.render(<p><b>Error</b>: {e.message}</p>);
    } else {
      throw e;
    }
  }
}
