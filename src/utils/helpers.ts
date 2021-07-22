export const $: typeof document.querySelector =
  document.querySelector.bind(document);

export function isObj(query: unknown): query is object {
  return typeof query === 'object';
}
