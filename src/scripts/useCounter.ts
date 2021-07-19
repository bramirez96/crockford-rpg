import { IStateEffect, useState, useState__logger } from '../state';

export interface ICounterParams {
  initialValue?: number;
  step?: number;
  effects?: IStateEffect<number>[];
}

export interface ICounter {
  getCount: () => number;
  increment: () => void;
}

export default function useCounter(params?: ICounterParams): ICounter {
  // Initialize state
  const initialValue = params?.initialValue || 0; // Default to 0 if unset
  const effects = params?.effects || []; // Default to empty array if unset
  effects.push(useState__logger('Counter'));
  const [getCount, setCount] = useState(initialValue, effects); // Create a state instance

  // Create the increment function
  const step = params?.step || 1; // Initialize this outsize of the function as it is never recalculated
  function increment() {
    setCount((prev) => prev + step);
    // const count = getCount(); // Get the current count value
    // const next = count + step;

    // // This will run all of the effects for us!
    // setCount(next);
  }

  return {
    getCount,
    increment,
  };
}
