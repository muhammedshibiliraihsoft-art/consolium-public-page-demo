# Consoulium Public Page Demo

A standalone, static client demo for the Consoulium 2026 public landing page. This repository contains only this page, its styles, and editable sample content. It is separate from the main Consoulium application and does not connect to Supabase, an API, or tenant data.

## Run locally

Serve this folder with any static HTTP server so the browser can fetch `data/demo-content.json`.

```sh
node server.mjs
```

Then visit `http://localhost:8081/consoulium`.

## Edit the demo

Update `data/demo-content.json` to change the event copy, dates, venue, ribbon labels, journey chapters, highlights, and navigation. The content is illustrative and should be reviewed with the client before publication. Registration is a visible placeholder; connect it to an approved registration destination when one is available.

## Scope

- Static HTML, CSS, and browser JavaScript only.
- All editable page content is centralized in `data/demo-content.json`.
- No admin pages, application bundles, database credentials, Supabase client, or backend/API requests.
- Demo content and layout are not a production data source.
