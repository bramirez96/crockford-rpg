import { useState } from '../useState';
import { ICounterMethods, ICounterParams } from './types';

/**
 * A wrapper around the standard `useState` function that exposes a simple
 * counter's `getCount` and `increment` methods.
 *
 * @param params an augmented version of the standard useState params
 * @returns an object exposing the `getCount` and the `increment` methods
 */
export default function useCounter(params?: ICounterParams): ICounterMethods {
  // Initialize our state parameters
  const initialValue = params?.initialValue || 0; // Default to 0 if unset
  const effects = params?.effects || []; // Default to empty array if unset
  // Get our starting count value
  const startingValue = params?.defaultValue || initialValue; // Default to initial if unset

  // Create our state instance
  const [getCount, setCount] = useState(startingValue, effects); // Create a state instance

  // Create the increment function
  const step = params?.step || 1; // Initialize this outsize of the function as it is never recalculated
  function increment() {
    setCount((prev) => prev + step);
  }

  // Create a reset function
  function reset() {
    setCount(initialValue);
  }

  // Instead of exposing `setCount`, we expose `increment`
  return {
    getCount,
    increment,
    reset,
    initialValue,
    effects,
    step,
  };
}
