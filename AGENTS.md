# Wedding Invitation Website — Sonya & Marton

**Project:** Wedding invitation website with RSVP functionality  
**Status:** In Progress  
**Started:** 2026-04-14

## Overview

Multi-language wedding invitation website for Sonya and Marton's celebrations in Hungary (Oct 10, 2026) and Sydney (Nov 20, 2026). Built as a static site with a visual editor for content management.

## Project Structure

```
/
├── assets/           # Static assets (images, fonts)
├── src/              # Source code
│   ├── js/          # JavaScript modules
│   ├── css/         # Stylesheets
│   └── components/  # Reusable components
├── public/          # Public static files
├── scripts/         # Build/deployment scripts
├── index.html       # Main website
├── invite.html      # Standalone invite version
├── editor.html      # Visual content editor
└── dist/            # Build output (generated)
```

## Available Commands

| Command                  | Description                     |
| ------------------------ | ------------------------------- |
| `npm run dev`            | Start development server (Vite) |
| `npm run build`          | Build for production            |
| `npm run preview`        | Preview production build        |
| `npm run deploy`         | Deploy to GitHub Pages          |
| `npm run deploy:netlify` | Deploy to Netlify               |

## Development

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Open http://localhost:3000

## Deployment Options

### GitHub Pages (Free)

- Uses `gh-pages` package
- Run: `npm run deploy`

### Netlify (Free)

- Drag & drop `dist/` folder
- Or run: `npm run deploy:netlify`

### Vercel (Free)

- Connect GitHub repo to Vercel
- Build command: `npm run build`
- Output directory: `dist`

## Features

- **3 Languages:** English, Hungarian, Russian
- **2 Events:** Hungary & Sydney celebrations
- **RSVP Form:** Name, email, event selection, guest count
- **Visual Editor:** Edit content per language
- **Responsive:** Mobile-friendly design

## Form Backend

Current: Formspree (free tier)

- Endpoint: `https://formspree.io/f/xlgorpaw`
- Emails sent with subject: `[WEDDING] [NAME] [YES/NO]`

## Notes

- Built with vanilla HTML/CSS/JS
- Vite for build tooling
- No frameworks required
