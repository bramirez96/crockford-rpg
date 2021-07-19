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
export class CommitError extends Error {
  public isUseStateCommitError = true;
  public initialError: unknown;

  /**
   * Optionally pass in the initial error object that caused the commit to fail
   */
  constructor(err?: unknown) {
    super('Error committing state. Rolling back.');
    this.initialError = err;
  }
}

export function isCommitError(err: unknown): err is CommitError {
  return (err as CommitError)?.isUseStateCommitError ?? false;
}
