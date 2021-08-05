/**
 * An error that is thrown when the state fails to update in
 * the `useState` pseudo-hook.
 *
 * Use the {@link isCommitError `isCommitError`} function to
 * verify the error type in catch statements.
 */
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

/**
 * A typeguard function for the {@link CommitError `CommitError`} class.
 *
 * @param err an object
 * @returns a `truthy` typeguard if the object is an instance of of
 *    the `CommitError` class and `false` if not
 */
export function isCommitError(err: unknown): err is CommitError {
  return (err as CommitError)?.isUseStateCommitError ?? false;
}
