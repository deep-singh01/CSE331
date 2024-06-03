import React from 'react';
import { createRoot } from 'react-dom/client';
import { nextFib } from './fib';
import { isPrime, isHighlyComposite } from './prime';
import './index.css';

// checks if number (n) is prime
const ifPrime = (n: number): string => {
  if (isPrime(BigInt(n))) {
    return "Your age is also prime!";
  } else {
    return "";
  }
};

// checks if number (n) is Highly Composite
const ifHighlyComposite = (n: number): string => {
  if (isHighlyComposite(BigInt(n))) {
    return "Your age is also highly composite!";
  } else {
    return "";
  }
};

const main: HTMLElement | null = document.getElementById('main');

if (main === null) {
  console.log('Uh oh! no "main" element!');
} else {
  const root = createRoot(main);
  const params: URLSearchParams = new URLSearchParams(window.location.search);

  const firstName: string | null = params.get("firstName");
  const age: string | null = params.get("age");
  const ageVal: number = age === null? -1 : parseInt(age);

  const nextURL: string = "/";

  // both first name and age parameter are missing
  if ((firstName === null || firstName === "") && (age === null || age === "")) {
    root.render(
      <form action="/" className="body">
        <p className="text">Hi there! Please enter the following information:</p>
        <p className="text-2">Your first name: <input type="text" name="firstName" className="input-border"></input></p>
        <p className="text-2">Your age: <input type="number" name="age" min="0" className="input-border"></input></p>
        <input type="submit" value="Submit"></input>
      </form>
    );
  
  // either first name or age parameter is missing
  } else if (firstName === null || firstName === "" || age === null || age === "") { 
    const whichIsMissing: string = !(firstName === null || firstName === "")? 
      "Oops, you're missing your age." : "Oops, you're missing your first name.";
    root.render(
      <div>
        <p className="text-2">{whichIsMissing}</p>
        <p className = "link-box"><a href={nextURL}>Start Over</a></p>
      </div>
    );
  
  // no parameters are missing, but age is a negative value
  } else if (ageVal < 0) {
    root.render(
      <div>
        <p className="text-2">Oops, the age parameter is not a valid age.</p>
        <p className = "link-box"><a href={nextURL}>Start Over</a></p>
      </div>
    );

  } else {
    const fibAgeDiff = Number(nextFib(BigInt(ageVal))) - ageVal;

    // display statements
    // age is 0
    if (ageVal === 0) {
      root.render(
        <div>
          <p className="text-2">Hi {firstName}! Your age <span className="highlight">
             ({ageVal})</span> is a Fibonacci number!</p>
          <p className = "link-box"><a href={nextURL}>Start Over</a></p>
        </div>
      );    

    // age is a fibonacci number
    } else if (fibAgeDiff === 0) {
      root.render(
        <div>
          <p className="text-2">Hi {firstName}! Your age <span className="highlight"> 
          ({ageVal})</span> is a Fibonacci number!</p>
          <p className="text-2">{ifPrime(ageVal)}</p>
          <p className="text-2">{ifHighlyComposite(ageVal)}</p>
          <p className = "link-box"><a href={nextURL}>Start Over</a></p>
        </div>
      );

    // difference between age and next fibonacci number is 1 - use year instead of years
    } else if (fibAgeDiff === 1) {
      root.render(
        <div>
          <p className="text-2">Hi {firstName}! Your age <span className="highlight"> 
          ({ageVal})</span> will be a Fibonacci number in <span className="highlight">
          {fibAgeDiff}</span> year.</p>
          <p className="text-2">{ifPrime(ageVal)}</p>
          <p className="text-2">{ifHighlyComposite(ageVal)}</p>
          <p className = "link-box"><a href={nextURL}>Start Over</a></p>
        </div>
        );
    
    // difference between age and next fibonacci number is >1 - use years
    } else {
      root.render(
        <div>
          <p className="text-2">Hi {firstName}! Your age <span className="highlight"> 
          ({ageVal})</span> will be a Fibonacci number in <span className="highlight">
          {fibAgeDiff}</span> years.</p>
          <p className="text-2">{ifPrime(ageVal)}</p>
          <p className="text-2">{ifHighlyComposite(ageVal)}</p>
          <p className = "link-box"><a href={nextURL}>Start Over</a></p>
        </div>
        );
    }
  }
}

