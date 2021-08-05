import { IStateEffectParams } from './types';

/**
 * Use this to persist a state value in localStorage. This should be
 * added as an effect so that it is ran every time the state updates.
 */
export default function useState__persist<DataType>(key: string) {
  return function useState__persist__inner({
    next,
    prev,
  }: IStateEffectParams<DataType>) {
    localStorage.setItem(key, JSON.stringify(next));
  };
}
