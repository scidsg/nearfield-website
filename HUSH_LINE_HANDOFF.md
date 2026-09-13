# Nearfield → Hush Line handoff

Paste the prompt below into the coding agent on the Hush Line machine.

---

Move the Nearfield marketing project into the Hush Line organization and prepare `nearfield.computer` for the new homepage.

## Source and destination

- Marketing source: `https://github.com/ufo-files/nearfield`, branch `main`.
- Destination: a **new, standalone** `scidsg/nearfield` repository, not a GitHub fork or repository transfer.
- Related native app: `https://github.com/ufo-files/threadbook-mvp`, branch `codex/real-imports-no-demo`. Its `main` is older. Leave the app repository and its private data alone; this handoff publishes only the marketing website. If the native app also needs an organization migration, ask for its destination name and keep it private.
- Domain: `nearfield.computer`, with `www` redirecting to the apex if supported.

## Authority and boundaries

This task authorizes creating the new repository and preparing the homepage deployment. **Before enabling public hosting or changing DNS, show me the selected provider, visibility, exact changes, and ask for approval.** Confirm whether “Pages” means GitHub Pages or Cloudflare Pages; do not guess. Do not deploy to OpenAI Sites, require ChatGPT sign-in, or reuse the previous Sites project.

Inspect authenticated GitHub identity and `scidsg` permissions first. Both source repositories are private: if this machine cannot read `ufo-files`, request access or a source archive; never ask me to paste a token into chat. If the destination already exists, inspect it and stop for direction rather than force-pushing or overwriting it.

## Clean, new repository history

1. Clone the marketing source to a temporary directory. Record its exact HEAD SHA.
2. Export **tracked files at that commit** using `git archive` into a separate new directory. Do not copy `.git`, ignored files, caches, `.env`, dependencies, build artifacts, local databases, or personal exports. Do not use `gh repo fork`, a mirror push, or copy the old Git history.
3. Preserve existing license and third-party notices. Add an honest provenance note recording the source repo and imported SHA. A new Hush Line-owned repository does not retroactively change the code's authorship or licensing. Do not invent a license or claim third-party artwork is Hush Line's work.
4. Remove the legacy `.openai/hosting.json` and its Sites project binding from the **new export only**. Adapt `vite.config.ts` to remove the Sites plugin and unnecessary Cloudflare development bindings for a plain static build. Preserve Vinext, the lockfile, and existing dependencies unless a change is required; update the lockfile consistently if dependencies change. Never call Sites creation, saving, or deployment tools.
5. Initialize a new `main` branch with `git init -b main`, set the verified Hush Line author identity locally, review the staged files, and create one accurate initial import commit. Create `scidsg/nearfield` privately first and push this new history. Confirm GitHub reports `isFork: false` and only the intended history is present. Do not delete or rewrite the source repos.

## Preserve the product and validate

The site is a standalone static React/Vinext marketing page. Node >=22.13 is required. Use `npm ci`, `npm run dev -- --host 127.0.0.1 --port 3000`, `npm run build`, and `npx tsc --noEmit`. Static output is `dist/client`; the artifact must have `index.html` at its root. Confirm the plain static build still works after removing Sites coupling.

Keep the dark marketing styling and dashboard, including the matching dark Signal banner, real Signal icon, Up Next, This Month, Hush Line Tip Inbox, conditional activity sparklines, quotes, renewals, and the remaining cards. Preserve browser-local card ordering and reset controls. This ordering is implemented in the **marketing preview**, not the native app.

Preserve the current headline: “All of your Mac data, in context.”, subhead: “The missing relationship layer for your local data. No cloud required. Offline-ready. App code is open and auditable.”, and promise: “No cloud. No tracking. No fees.” The removed all-caps hero eyebrow must stay removed. Match native UI labels; use fictional names, email addresses under reserved example domains, and synthetic message content only. Actual generic Hush Line subject formats include “New Hush Line Message Received” and “New Hush Line Conversation Activity.” Do not copy the owner's real records into the public site.

Keep the illustration disclaimer. The preview must not imply it connects to Signal or enables native permissions: its Enable Signal link explains the feature. Do not add analytics, sign-up gates, OpenAI authentication, real inbox access, or invented download/App Store availability. Review the existing development/open-source availability copy for accuracy before making anything public.

Perform desktop and mobile browser QA, checking banner dismissal, card drag-and-drop, keyboard move controls, reset, persistence after refresh, responsive layout, labels, links, images, and no console errors. Verify an anonymous browser needs no login. Do not publish private app data or secrets.

## Hosting and domain cutover — after approval

If GitHub Pages is selected, configure a static GitHub Actions build and Pages artifact deployment from `scidsg/nearfield`. Use current official actions, least-privilege `contents: read`, `pages: write`, and `id-token: write`, and a protected `github-pages` environment. Confirm the account's plan supports the repository visibility; do not silently make the repository public.

Verify domain ownership under `scidsg`, then set the Pages custom domain before changing DNS. Obtain the verification TXT value from GitHub; never invent it. At the registrar, preserve unrelated MX/TXT and other service records. For GitHub Pages, the documented apex A values are `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`; `www` CNAME points to `scidsg.github.io` (no repo suffix). Recheck official documentation at execution time. Do not create wildcard records or replace nameservers without separate approval. Enable HTTPS when the certificate is ready.

If Cloudflare Pages is selected instead, connect the new `scidsg/nearfield` repository to the Hush Line Cloudflare account, build with `npm run build`, and publish `dist/client`. Follow that provider's custom-domain process; do **not** use GitHub Pages IPs. Ask before changing nameservers.

If DNS access is missing, give me the exact approved records to enter and wait. Save existing records for rollback. Verify DNS, HTTPS, root/static-asset loading, `www` redirect, successful deployment, and anonymous access before claiming completion. Do not delete the old private Sites publication without explicit permission.

End with the new repository URL, imported source SHA, destination initial SHA, hosting provider, domain status, verification results, and anything still awaiting access or approval.

## Official references

- [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [GitHub Pages custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [Verify a GitHub Pages domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
