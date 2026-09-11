# Hosting preparation and validation

## Current status

The maintainer made the marketing repository public and approved public GitHub
Pages hosting, including enabling public Pages creation in the organization.
Pages is configured for Actions; the github-pages environment permits only main.
The active workflow is `.github/workflows/pages.yml`. DNS approval and domain
verification are still pending. The initial public URL is
https://scidsg.github.io/nearfield/.

The build now takes the absolute Pages URL as PAGES_BASE_URL and its path as
NEXT_PUBLIC_BASE_PATH. This retains a root index.html and correct script, CSS,
image, and favicon URLs for project hosting and a future apex domain. No
dependencies, product copy, or dashboard interactions were changed.

## Initial preparation record (before approval)

Selected provider: GitHub Pages. Repository: private `scidsg/nearfield`.
The organization reports GitHub Team, which supports Pages from private
repositories. The proposed website is public and anonymously accessible;
repository privacy does not make the website private.

The initial inactive workflow proposed a static build using Node 24,
`npm ci`, TypeScript validation, and `npm run build`. Only `dist/client` is
uploaded. Current official action releases were checked against GitHub on
2026-09-11 and pinned to commits. Before activation, create a `github-pages`
environment restricted to `main` deployments, and set Pages to GitHub Actions.
No hosting configuration has been enabled by this import.

## Proposed domain changes (not applied)

1. Obtain the actual verification TXT name/value in scidsg organization
   Settings > Pages for nearfield.computer. The value is not yet available.
2. Save the registrar's full zone for rollback, add the approved verification
   TXT record, and verify ownership under scidsg.
3. Set the Pages custom domain to nearfield.computer before routing DNS to it.
4. Set apex A records to 185.199.108.153, 185.199.109.153, 185.199.110.153,
   and 185.199.111.153. Set www CNAME to scidsg.github.io.
5. Preserve unrelated records and nameservers. Do not add wildcard records.
6. Once the certificate is ready, enforce HTTPS and verify apex, assets, www
   redirect, successful deployment, and anonymous access.

Public DNS observation on 2026-09-11: nameservers are 1-you.njalla.no,
2-can.njalla.in, and 3-get.njalla.fo. Queries returned no apex A, AAAA, MX,
or TXT answers and no www CNAME answer. This is not a complete registrar-zone
backup; registrar access/export is still required before any DNS writes.

## Local validation

- Node 26.0.0 meets the source minimum of 22.13.0.
- `npm ci`: passed; original package.json and lockfile retained unchanged.
- `npm run dev -- --host 127.0.0.1 --port 3000`: served HTTP 200 locally.
- `npm run build`: passed after allowing the prerenderer's loopback listener.
- `npx tsc --noEmit`: passed.
- Static artifact has index.html at dist/client root.
- Fresh Chromium desktop (1440px), Chromium mobile (390px), and WebKit mobile
  (390px) sessions passed checks against a plain HTTP static file server.
- Verified desktop native mouse drag, keyboard move buttons, reset, ordering
  persistence after refresh, reset persistence, banner dismissal, nine cards,
  conditional sparklines, hero/disclaimer copy, internal links, loaded images,
  and no horizontal page overflow. Mobile ordering uses the move buttons.
- No browser console errors, failed HTTP responses, external requests, forms,
  or login requirement were observed. Screenshots were captured locally.
- Native app and its data were not accessed. Native feature claims were
  preserved from the supplied handoff, not independently audited.
- Availability copy accurately describes private development, planned open
  source, and no public downloads/App Store availability. No license was added.
- `npm run lint`: fails on existing source rules in app/dashboard.tsx,
  app/page.tsx, reusable components/ui files, and hooks/use-mobile.ts.
  Application files are byte-for-byte preserved; this import does not refactor
  the original UI to resolve those findings. Lint is not represented as passing.
- No Lighthouse score is asserted by this validation.

## Dependency audit limitations and follow-up

`npm audit` reports 11 findings (8 high, 2 moderate, 1 low).
`npm audit --omit=dev` reports 6 (5 high, 1 low); npm classifications include
build/server packages and do not identify what is actually deployed to Pages.
No Dependabot PRs were open; source alert access reports alerts disabled.

Findings affect image-size/Vinext, react-server-dom-webpack, Vite, and the
Cloudflare/Miniflare/Wrangler toolchain including esbuild, sharp, undici, and ws.
The Pages artifact executes no Node server, server functions, image parser,
proxy, or WebSocket server. The React server-function advisory requires server
endpoints; Vite/esbuild Windows development-server findings do not describe this
macOS local preview or the static Pages artifact. Only trusted tracked PNGs are
used during the build. Cloudflare bindings/plugins are no longer activated.

Dependency upgrades are deferred to preserve the requested source lockfile;
these findings remain unresolved in the installed development toolchain. Keep
development servers local, review dependency updates separately, and rerun
audits/build/browser QA before enabling any Node runtime, untrusted image input,
or server deployment. Do not deploy dist/server or run the legacy npm start
Wrangler command as the homepage. This is a scoped exposure assessment, not a
clean audit result or formal risk acceptance.

## References

- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages
- https://github.com/advisories/GHSA-wx67-qw84-cm4g
- https://github.com/advisories/GHSA-w3rx-r6r6-pgpr
- https://github.com/advisories/GHSA-fx2h-pf6j-xcff
