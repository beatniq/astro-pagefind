# Astro-Pagefind

[![CI](https://github.com/shishkin/astro-pagefind/actions/workflows/ci.yaml/badge.svg)](https://github.com/shishkin/astro-pagefind/actions/workflows/ci.yaml)
[![npm](https://img.shields.io/npm/v/astro-pagefind)](https://www.npmjs.com/package/astro-pagefind)

[Astro](https://astro.build) integration for [Pagefind](https://pagefind.app/) static site search.

## Features

- Build pagefind index upon static build
- Serve previously prebuilt search index in `astro dev` mode
- Search Astro component
- Supports customized base URL path
- Supports multiple instances of the component on a page
- Supports pre-filled search query
- Supports [Astro view transitions](https://docs.astro.build/en/guides/view-transitions)

## Usage

Install:

```bash
npm i astro-pagefind
```

Add integration to the Astro config:

```typescript
//astro.config.ts

import { defineConfig } from "astro/config";
import pagefind from "astro-pagefind";

export default defineConfig({
  build: {
    format: "file",
  },
  integrations: [pagefind()],
});
```

Add search component on a page:

```astro
---
import Search from "astro-pagefind/components/Search";
---

<Search id="search" className="pagefind-ui" uiOptions={{ showImages: false }} />
```

See [Main.layout](./src/layouts/Main.astro) for a usage example.

### Function Options

`uiOptions` are written into the page as JSON, so they can't hold functions such as `processResult` or
`processTerm` (the build fails if they do). Register those from a client-side script instead, using the
component's `id`. Nothing is evaluated from a string, so this works under a Content Security Policy without
`'unsafe-eval'`.

```astro
---
import Search from "@beatniq/astro-pagefind/components/Search";
---

<Search id="search" uiOptions={{ showImages: false }} />

<script>
  import { setUiOptions } from "@beatniq/astro-pagefind/client";

  setUiOptions("search", {
    processTerm: (term) => (term.length < 3 ? "" : term),
  });
</script>
```

Register them at the top level of the script, so they are in place before the search UI starts.

### Pre-filled Search Query

In SSR mode Astro provides access to URL query parameters which can be used to pre-fill search query via a prop:

```astro
---
import Search from "astro-pagefind/components/Search";

export const prerender = false;

const q = Astro.url.searchParams.get("q") ?? undefined;
---

<Search query={q} />
```

See [prefilled.astro](./src/pages/prefilled.astro) for a full example.
