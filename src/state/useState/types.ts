/**
 * The parameters passed in to the setState function returned
 * from the custom useState pseudo-hook. Similar to React's own
 * useState hook, data can be set by passing in simply the data
 * to be set, OR by utilizing a callback function to maintain
 * data integrity.
 */
export type IStateSetterParam<DataType> =
  | IStateSetterCallback<DataType>
  | DataType;

/**
 * A callback function used to update state with a reference in
 * order to ensure data integrity for any delayed effects.
 */
export type IStateSetterFunction<DataType> = (
  param: IStateSetterParam<DataType>,
) => void;

/**
 * A declaration for the callback function used in setState.
 */
type IStateSetterCallback<DataType> = (param: DataType) => DataType;

/**
 * The data structure created inside of the function scope that
 * allow us to persist, alter, and retrieve data as long as we
 * maintain a reference to it in application scope.
 */
export interface IStateStore<DataType extends unknown> {
  current?: DataType;
  prev?: DataType;
  next?: DataType;
}
