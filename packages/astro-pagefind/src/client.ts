// Pagefind UI options that cannot be written into HTML, such as `processResult` and `processTerm` functions.
// They are registered from a client-side <script> and merged with the component's JSON `uiOptions` when the
// search UI starts, so nothing is rebuilt from a string with eval (which a CSP without 'unsafe-eval' blocks).
//
// Astro runs bundled scripts as modules, before DOMContentLoaded, so options registered at the top level of a
// page script are in place before the Search component initialises.

export type ClientUiOptions = Record<string, unknown>;

const registry = new Map<string, ClientUiOptions>();

/** Register client-side Pagefind UI options for the <Search> component with this `id`. */
export const setUiOptions = (id: string, options: ClientUiOptions): void => {
  registry.set(id, options);
};

/** Client-side Pagefind UI options registered for this `id`, if any. */
export const getUiOptions = (id: string): ClientUiOptions | undefined => registry.get(id);
