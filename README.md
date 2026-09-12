# Nearfield landing page

Website repository: https://github.com/scidsg/nearfield-website.
The private native app is maintained separately at `scidsg/nearfield`.

Standalone marketing site. It never reads the app database. All displayed names and records are fictional illustrative content.

Requires Node.js 22.13 or later. Run `npm ci`, then `npm run dev` for local development or `npm run build` for a static export in `dist/client`.

The website uses the existing Nearfield icon. It has no signup form, analytics, external fonts, or app download links. The page states that public downloads and App Store availability are not here yet. Its privacy section expresses the project's open-source philosophy; this copy change does not grant a license or publish the native app source. See the provenance notes for licensing status.

This marketing repository is public. GitHub Pages hosting has been approved;
the workflow publishes only `dist/client` at `https://nearfield.computer` with HTTPS.
The build uses the Pages base path for both the default project URL and a future
custom domain. The native app remains private. See `PROVENANCE.md` for source
and licensing details.

The intro crops the dashboard at 75% of the Up Next card, behind a sleeve edge.
Its collapsed artwork is inert; “Explore the full dashboard” restores interactive
cards, keyboard ordering, browser-local persistence, reset, and banner dismissal.
Focused sections reuse the dashboard cards for Up Next, This Month, Tip Inbox,
reconnection suggestions, and weekly activity, followed by the Signal explanation.
The transparent header and intro share one background glow.
