import { IStateEffect } from '../effects';

/**
 * {@link useCounter `useCounter`} function parameter definition
 */
export interface ICounterParams {
  initialValue?: number;
  defaultValue?: number;
  step?: number;
  effects?: IStateEffect<number>[];
}

/**
 * {@link useCounter `useCounter`} function return type
 */
export interface ICounterMethods extends ICounterParams {
  getCount: () => number;
  increment: () => void;
  reset: () => void;
}
