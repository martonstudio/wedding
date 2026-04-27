# Wedding Invite — Session Handoff

## Live URLs
- Site: https://martonstudio.github.io/wedding/
- Editor: https://martonstudio.github.io/wedding/editor.html
- Repo: https://github.com/martonstudio/wedding (account: martonstudio, gh CLI authenticated)
- Google Sheet: https://docs.google.com/spreadsheets/d/15wwFZyLfldqtN6Bk9FzcS29o4h7OM4AJpLXlJsLXRlE

## What the site is

A 7-page full-screen vertical scroll-snap wedding invite (TikTok-style).
Each page snaps into view on swipe/scroll. Dot nav on the right.
Desktop: portrait 9:16 column centred, blurred photo bleeds behind it.

Pages:
1. Album cover — WEDDING (full-width, JS-fit), names, date, location. Photo per language.
2. Our Story — lorem ipsum placeholder, Marton to write
3. Locations — Hungary (10 Oct 2026, Mád) + Sydney (Nov 2026) cards
4. Hungary — longer copy, lorem ipsum placeholder
5. Sydney — lorem ipsum placeholder
6. RSVP — form → Google Apps Script → Sheet + email
7. Thank You — placeholder copy

## What's working (verified)
- Live site deployed via GitHub Actions on every push to main
- Content loaded from public/content.json (fetch on load), all 3 languages (EN/HU/RU)
- Editor: 7 sections matching pages, real-time preview via postMessage into index.html iframe
- Per-page photo upload in editor (page 1 per-language, pages 2-7 shared across langs)
- WEDDING title fills full screen width (JS binary-search fit, reruns on resize + lang change)
- Publish button: PAT modal → GET sha → PUT content.json → polls Actions until live
- RSVP form → Google Apps Script → Google Sheet (WEDDING INVITES tab) + emails both addresses
- RSVP sheet writing: FIXED with SpreadsheetApp.openById (redeployed, verified working)
- Apps Script deployment ID: AKfycbzMALrUGUuJ-CkkrGd81nrNsIgKZbQwEHtgxVoUwnLBqLbMYWvpWs5ZtDr4sKHLBzbu

## What needs work / is unverified
- Editor mobile preview: fix deployed (re-sends postMessage when switching to preview) — needs phone test
- Sonya email (sobutorina@gmail.com): check spam, may not have arrived
- Full Publish round-trip (editor → GitHub API → live site): unverified end-to-end
- All placeholder content (pages 2, 4, 5, 7): Marton to write real copy
- All placeholder photos (pages 2-7): upload real photos via editor
- Page 1 photos per language: upload real couple photos via editor

## Before going live (remove when ready to send to guests)
1. In index.html: remove `<meta name="robots" content="noindex,nofollow" />`
2. In index.html: remove the `<a href="./editor.html" ...>✦ Edit</a>` line from nav
3. Push — site becomes findable, Edit link gone
4. Share URL: https://martonstudio.github.io/wedding/

## Key files
- public/content.json — all content (text + base64 images + formUrl + bgPage2-7)
- index.html — public invite site (7-page snap scroll)
- editor.html — online editor with Publish button
- .github/workflows/deploy.yml — GitHub Actions build + Pages deploy
- scripts/rsvp-sheet.gs — Google Apps Script (if ever need to redeploy to Sheet)

## PAT for publishing
- Fine-grained token, repo: martonstudio/wedding, Contents: read+write
- Stored in sessionStorage (cleared on tab close, re-enter each session)
- Generate: https://github.com/settings/personal-access-tokens/new

## RSVP backend
- Form → Google Apps Script web app (no Formspree)
- Emails: marton.papai@gmail.com + sobutorina@gmail.com
- Sheet tab: WEDDING INVITES (auto-creates headers on first submission)
- Columns: Timestamp · Name · Email · Attending · Events · Guests · Language
