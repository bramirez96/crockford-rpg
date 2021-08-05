import { IStateEffectParams } from "./types";

export default function useState__logger<DataType>(label: string) {
  return function useState__logger__inner({
    next,
    prev,
  }: IStateEffectParams<DataType>) {
    console.group('State updated for label: ' + label);
    console.log('PREV', prev);
    console.log('NEXT', next);
    console.groupEnd();
  };
}
