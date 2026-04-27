# Wedding Invite — Session Handoff

## Live URLs
- Site: https://martonstudio.github.io/wedding/
- Editor: https://martonstudio.github.io/wedding/editor.html
- Repo: https://github.com/martonstudio/wedding (account: martonstudio, gh CLI authenticated)
- Google Sheet: https://docs.google.com/spreadsheets/d/15wwFZyLfldqtN6Bk9FzcS29o4h7OM4AJpLXlJsLXRlE

## What the site is

7-page full-screen vertical scroll-snap wedding invite (TikTok-style).
Desktop: 9:16 portrait column centred, blurred hero photo bleeds behind.
Content from public/content.json, fetched on load. EN/HU/RU.

Pages: Album Cover → Our Story → Locations → Hungary → Sydney → RSVP → Thank You

## What's working (verified)
- Live site deployed via GitHub Actions on every push to main
- Content loaded from public/content.json, all 3 languages
- Publish button in editor: commits content.json via GitHub API — CONFIRMED WORKING
  (user successfully published HU name change "Sonya" → "Szonja")
- PAT stored in localStorage (persists across sessions per device, enter once ever)
- Editor: 7 sections matching pages, real-time preview via postMessage into index.html iframe
- Per-page photo upload (page 1 per-language, pages 2-7 shared)
- WEDDING title fills full screen width (JS binary-search fit, waits for fonts.ready)
- RSVP → Google Apps Script → Google Sheet + emails both addresses (VERIFIED WORKING)
- Apps Script deployment ID: AKfycbzMALrUGUuJ-CkkrGd81nrNsIgKZbQwEHtgxVoUwnLBqLbMYWvpWs5ZtDr4sKHLBzbu

## Needs work / investigation
- **Editor preview fonts "all over the shop"** on desktop — fonts.ready fix deployed but
  not confirmed fixed. Need screenshot to diagnose properly. User will share from computer.
- Album names (SONYA/MARTON) overflow fix deployed — not confirmed on desktop yet
- Editor mobile preview: re-sends postMessage on show — not confirmed fixed on phone
- All placeholder content (pages 2, 4, 5, 7): Marton to write real copy
- All placeholder photos (pages 2-7): upload real photos via editor
- Page 1 photos per language: upload couple photos via editor

## Before going live
1. In index.html: remove `<meta name="robots" content="noindex,nofollow" />`
2. In index.html: remove the `<a href="./editor.html" ...>✦ Edit</a>` line from nav
3. Push

## Key files
- public/content.json — all content + formUrl + bgPage2-7
- index.html — public invite site (7-page snap scroll)
- editor.html — online editor with Publish button
- .github/workflows/deploy.yml — GitHub Actions build + Pages deploy
- scripts/rsvp-sheet.gs — Google Apps Script source

## PAT for publishing
- Fine-grained token, repo: martonstudio/wedding, Contents: read+write
- Stored in localStorage (persists), enter once per device
- Generate: https://github.com/settings/personal-access-tokens/new
- 4 tokens recommended, one per device, named by device

## RSVP backend
- Google Apps Script web app (not Formspree)
- Emails: marton.papai@gmail.com + sobutorina@gmail.com
- Sheet tab: WEDDING INVITES, columns: Timestamp · Name · Email · Attending · Events · Guests · Language

## Next session start prompt
"Pick up the wedding invite. Check NEXT.md. The main thing to investigate is the
editor preview fonts looking wrong on desktop — share a screenshot and diagnose."
