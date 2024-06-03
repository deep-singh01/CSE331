import React from 'react';
import { cipher_encode, cipher_decode, crazy_caps_encode, crazy_caps_decode, frog_latin_encode, frog_latin_decode } from './latin_ops';
import { compact, explode } from './char_list';


/** Returns UI that displays a form asking for encode/decode input. */
export const ShowForm = (_: {}): JSX.Element => {
    // TODO: Replace this with something fully functional.
    return (
      <form action="/" method="get">
        <label htmlFor="word">Word:</label>
        <input type="text" id="word" name="word"></input>

        <label htmlFor="algo">   Algorithm:</label>
        <select id="algo" name="algo">
          {/* Add algo options to select here: either cipher, crazy_caps, or frog_latin*/}
          <option value="cipher">Cipher</option>
          <option value="crazy-caps">Crazy Caps</option>
          <option value="frog-latin">Frog Latin</option>
        </select>

        {/* Hint: for these radio buttons to be associated with each other
            (when one is checked the other isn't) they need the same name */}
        <label htmlFor="encode"> Encode</label>
        <input type="radio" id="op_encode" name="op" value="encode"></input>
        <label htmlFor="decode"> Decode</label>
        <input type="radio" id="op_decode" name="op" value="decode"></input>

        <input type="submit" value="Submit"></input>
      </form>
    );
};


/** Properties expected for the ShowResult UI below. */
export type ShowResultProps = {
    readonly word: string;
    readonly algo: "cipher" | "crazy-caps" | "frog-latin";
    readonly op: "encode" | "decode";
};

/**
 * Returns UI that shows the result of applying the specified operation to the
 * given word.
 */
export const ShowResult = (props: ShowResultProps): JSX.Element => {
  // TODO: remove this (just making the compiler happy)

  if (props.algo === "cipher") {
      // TODO: add a conditional here to call encode/decode appropriately
      //       based on the 'op' prameter in the input prop 
      if (props.op === "encode") {
          return <p><code>{compact(cipher_encode(explode(props.word)))}</code></p>;
      } else {
          return <p><code>{compact(cipher_decode(explode(props.word)))}</code></p>;
      }

    } 

    // TODO: Repeat for the other algorithms here
    if (props.algo === "crazy-caps") {
        if (props.op === "encode") {
            return <p><code>{compact(crazy_caps_encode(explode(props.word)))}</code></p>;
        } else {
            return <p><code>{compact(crazy_caps_decode(explode(props.word)))}</code></p>;
        }
    }

    if (props.algo === "frog-latin") {
        if (props.op === "encode") {
            return <p><code>{compact(frog_latin_encode(explode(props.word)))}</code></p>;
        } else {
            return <p><code>{compact(frog_latin_decode(explode(props.word)))}</code></p>;
        }
    }

    // Example of what your return value in each branch should look like:
    return <p><code>Error: Not an Acceptable Algorithm</code></p>;  
};
