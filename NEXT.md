# Wedding Invite — Next Session

## Live URLs
- Site: https://martonstudio.github.io/wedding/
- Editor: https://martonstudio.github.io/wedding/editor.html
- Repo: https://github.com/martonstudio/wedding
- Google Sheet: https://docs.google.com/spreadsheets/d/15wwFZyLfldqtN6Bk9FzcS29o4h7OM4AJpLXlJsLXRlE

## What's done
- Phase 1: content.json (single source of truth), GitHub Actions deploy, invite.html deleted
- Phase 2: Publish button in editor — PAT modal, commits content.json via GitHub API, polls Actions until live
- Editor mobile layout: full-width single-pane, Edit/Preview toggle works
- Photo upload: canvas crop to 16:9 @ 1200×675, JPEG 0.75, stored as base64 data URL
- RSVP → Google Apps Script → Google Sheet (WEDDING INVITES tab) + email to both addresses
- Apps Script file: scripts/rsvp-sheet.gs
- Temp "✦ Edit" link in nav (top left of invite site) — remove before launch

## Needs verification
- RSVP sheet: was broken (getActiveSpreadsheet returned null), fixed with openById,
  redeployed — needs a test submission to confirm rows appear
- Sonya email (sobutorina@gmail.com): wasn't arriving — may be spam. Check after sheet fix.
- Full publish round-trip: editor → Publish button → GitHub API → live site — unverified end-to-end
- Site visual review on mobile and desktop (content, language switching, hero image)

## Before going live (when ready to send to guests)
1. index.html: remove `<meta name="robots" content="noindex,nofollow" />`
2. index.html: remove the `<a href="./editor.html" ...>✦ Edit</a>` line from nav
3. Push — site becomes publicly findable and Edit link disappears
4. Share URL with guests

## PAT for publishing
- Fine-grained token, repo: martonstudio/wedding, Contents: read+write
- Stored in sessionStorage (cleared on tab close)
- Generate at: https://github.com/settings/personal-access-tokens/new

## Key files
- public/content.json — all editable content + formUrl
- .github/workflows/deploy.yml — GitHub Actions build+deploy
- scripts/rsvp-sheet.gs — Google Apps Script (paste into sheet's Apps Script editor)
- editor.html — online editor with Publish flow
- index.html — public invite site
