# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static personal portfolio website for Charles Nixon Cayading (Web Developer / IT Instructor). Plain HTML/CSS/JS with no build step, no package manager, no tests, and no framework tooling. Third-party libraries (Bootstrap 5.3.3, AOS 2.3.1, Font Awesome, Google Fonts) are pulled from CDNs at runtime — there are no local `node_modules` or vendored assets.

## Running / deploying

- **Local preview:** open the target `.html` directly in a browser, or serve the folder with any static server (e.g. `python -m http.server`). A server is preferable because pages fetch CDN assets and (for the chat) cross-origin APIs.
- **Deploy:** the site is hosted on Vercel at `https://cncc.vercel.app` (referenced in `js/chat.js` and `js/loader.js`). Pushing to the `main` branch of the `origin` remote is the deploy path; there is no CI or config file in-repo.

## Architecture — three parallel, non-shared page versions

The repo contains **multiple standalone versions of the same portfolio** that do not share code. Know which one you are editing before making changes:

- **`index.html` — the current/canonical page.** Self-contained: styled only by `css/design.css`, and *all* of its JavaScript (loader, AOS init, scroll-spy navbar, mobile nav, chat widget) is inlined in a `<script>` at the bottom. It does **not** use anything in `js/`.
- **`sample.html` — an older/alternate version.** Styled by `css/style.css` + `css/chat.css`; behavior comes from the external `js/chat.js` and `js/loader.js`. This is the only page that uses those JS files (and `loader.js` depends on jQuery/`$`).
- **`chatbot.html` — a standalone chatbot demo** with fully inlined CSS and JS; not linked from the main site navigation.
- **`page/index.html` — a Colorlib 404 template** styled by `css/404.css`. Note: `index.html`'s "Download CV" button currently links here (`href="page/index.html"`) — treat that as a known placeholder, not a real CV.

Because the versions are independent, a change to the design or content (e.g. project list, skills, contact info) must be applied to each page you intend to keep — editing `index.html` alone will not affect `sample.html` or `chatbot.html`.

## Chat widget — two different, incompatible implementations

The "Lexon" assistant is implemented differently per page:

- **`index.html`** calls the Anthropic Messages API directly from the browser (`https://api.anthropic.com/v1/messages`, model `claude-sonnet-4-20250514`). This request has **no auth header / API key** and will fail against the real API (auth + CORS); it works only if pointed at a proxy or backend that injects credentials. If you need a working chat here, add a server-side proxy rather than putting a key in client JS.
- **`sample.html`** (via `js/chat.js`) uses keyword-matched canned replies + a Hugging Face inference endpoint fallback, plus browser Text-to-Speech (`speechSynthesis`, "Jarvis"-style voice). Bot identity/context strings are duplicated here and in `index.html` — keep them in sync if that matters.

## Design system (for `index.html` / `css/design.css`)

Design tokens live as CSS custom properties in `:root` at the top of `css/design.css`:
accent `--cyan: #00f5d4`, `--blue: #3b82f6`, dark background `--bg: #070711`, plus `--surface`, `--border`, `--text`, `--muted`. Reuse these variables instead of hard-coding colors. Fonts are Syne (headings), DM Sans (body), and JetBrains Mono (accents/`// tags`), loaded via Google Fonts. The look is a dark, glassmorphic developer theme with an SVG noise overlay (`body::before`) and AOS scroll animations (`data-aos` attributes on sections).
