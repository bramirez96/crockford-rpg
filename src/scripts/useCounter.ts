import { IStateEffect, useState } from '../state';

export interface ICounterParams {
  initialValue?: number;
  step?: number;
  effects?: IStateEffect<number>[];
}

export interface ICounter {
  getCount: () => number;
  increment: () => void;
}

/**
 * A wrapper around the standard `useState` function that
 * @param params an augmented version of the standard useState params
 * @returns an object exposing the `getCount` and the `increment` methods
 */
export default function useCounter(params?: ICounterParams): ICounter {
  // Initialize our state parameters
  const initialValue = params?.initialValue || 0; // Default to 0 if unset
  const effects = params?.effects || []; // Default to empty array if unset

  // Create our state instance
  const [getCount, setCount] = useState(initialValue, effects); // Create a state instance

  // Create the increment function
  const step = params?.step || 1; // Initialize this outsize of the function as it is never recalculated
  function increment() {
    setCount((prev) => prev + step);
  }

  // Instead of exposing `setCount`, we expose `increment`
  return {
    getCount,
    increment,
  };
}
