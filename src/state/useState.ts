import {
  CommitError,
  IStateEffect,
  IStateSetterFunction,
  IStateSetterParam,
} from './types';

export interface IStateStore<DataType extends unknown> {
  current?: DataType;
  prev?: DataType;
  next?: DataType;
}

export function isObj(query: unknown): query is object {
  return typeof query === 'object';
}

export default function useState<DataType = object>(
  defaultValue: DataType | undefined,
  effects?: IStateEffect<DataType>[],
): [getter: () => DataType, setter: IStateSetterFunction<DataType>] {
  let state: IStateStore<DataType> = {
    current: defaultValue,
    prev: undefined,
    next: undefined,
  };

  function commit() {
    const oldPrevValue = { ...state };
    try {
      if (isObj(state.current)) {
        if (state.current) {
          state.prev = state.prev
            ? Object.assign(state.prev, state.current)
            : { ...state.current };
        }
        state.current = state.current
          ? Object.assign(state.current, state.next)
          : { ...state.next };
      } else {
        state.prev = state.current;
        state.current = state.next;
      }
      state.next = undefined;
    } catch (err) {
      const cErr = new CommitError(err);
      console.error(cErr);
      state = oldPrevValue;
      // throw cErr; // Eventually this might throw an error...
    }
  }

  function getState() {
    return state.current;
  }

  function setState(newState: IStateSetterParam<DataType>) {
    if (newState instanceof Function) {
      const updatedState = newState(state.current);
      if (typeof newState === 'object') {
        state.next = Object.freeze(updatedState);
      } else {
        state.next = updatedState;
      }
    } else {
      if (typeof newState === 'object') {
        state.next = Object.freeze({ ...state, ...newState });
      } else {
        state.next = newState;
      }
    }
    effects?.forEach((ef) => {
      ef({ prev: state.current, next: state.next });
    });

    // Commit the changes
    commit();
  }

  return [getState, setState];
}
