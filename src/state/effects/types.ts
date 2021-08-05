export interface IStateEffectParams<DataType> {
  prev: DataType;
  next: DataType;
}
export type IStateEffect<DataType> = (
  param: IStateEffectParams<DataType>,
) => void;
