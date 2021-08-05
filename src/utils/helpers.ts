/**
 * A handy jQuery-like selector that makes accessing the DOM
 * easier, but won't include all of the overhead of the actual
 * jQuery library itself.
 */
export const $: typeof document.querySelector =
  document.querySelector.bind(document);

/**
 * A shorthand to check if a value is of the `object` type.
 *
 * @param query the value to check
 * @returns a typeguard that is `truthy` when the passed-in value is
 *    an object
 */
export function isObj(query: unknown): query is object {
  return typeof query === 'object';
}
