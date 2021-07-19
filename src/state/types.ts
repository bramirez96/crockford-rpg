export interface IStateEffectParams<DataType> {
  prev: DataType;
  next: DataType;
}
export type IStateEffect<DataType> = (
  param: IStateEffectParams<DataType>,
) => void;
type IStateSetterCallback<DataType> = (param: DataType) => DataType;
export type IStateSetterParam<DataType> =
  | IStateSetterCallback<DataType>
  | DataType;
export type IStateSetterFunction<DataType> = (
  param: IStateSetterParam<DataType>,
) => void;
