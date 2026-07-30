# Charles Nixon Cayading — Portfolio

Personal portfolio website for **Charles Nixon Cayading** — Web Developer & IT Instructor at Binalatongan Community College (Basista, Pangasinan, Philippines).

🔗 **Live site:** [https://cncc.vercel.app](https://cncc.vercel.app)

A static, dark-themed, glassmorphic single-page portfolio with a hero section, about, projects, skills, contact, and an AI chat assistant ("Lexon").

---

## Tech stack

| Layer | What's used |
|---|---|
| Markup | Plain HTML5 (no templating, no build step) |
| Styling | Custom CSS with design tokens + Bootstrap 5.3.3 (CDN) |
| Scripting | Vanilla JavaScript (inlined in `index.html`) |
| Animations | [AOS](https://michalsnik.github.io/aos/) 2.3.1 scroll animations |
| Icons / Fonts | Font Awesome Kit, Google Fonts (Syne, DM Sans, JetBrains Mono), devicon SVGs |
| Chat backend | `chat-api.php` → Google Gemini API |
| Hosting | Vercel (`main` branch = deploy) |

There is **no package manager, no bundler, and no test suite**. Every third-party library is loaded from a CDN at runtime — there is no `node_modules` and no vendored assets.

---

## Project structure

```
Portfolio/
├── index.html            # ← Current / canonical page (self-contained)
├── sample.html           # Older alternate version (uses css/style.css + js/)
├── chatbot.html          # Standalone chatbot demo (not linked in nav)
├── chat-api.php          # Server-side Gemini proxy for the Lexon chatbot
├── config.example.php    # Template for config.php (safe to commit)
├── config.php            # Real API key — gitignored, create it locally
├── css/
│   ├── design.css        # Styles for index.html (the design system)
│   ├── style.css         # Styles for sample.html
│   ├── chat.css          # Chat widget styles for sample.html
│   └── 404.css           # Styles for page/index.html
├── js/
│   ├── chat.js           # Chat logic — used only by sample.html
│   └── loader.js         # Page loader — used only by sample.html (needs jQuery)
├── images/               # Profile photo and misc assets
└── page/index.html       # Colorlib 404 template (placeholder CV link target)
```

### ⚠️ Three parallel, non-shared page versions

The repo holds **multiple standalone versions of the same portfolio**. They do not share code, so know which one you're editing:

- **`index.html`** — the live page. Styled only by `css/design.css`; *all* of its JavaScript (loader, AOS init, scroll-spy navbar, mobile nav, chat widget) is inlined at the bottom of the file. It does **not** use anything in `js/`.
- **`sample.html`** — older version. Uses `css/style.css` + `css/chat.css` and the external `js/chat.js` / `js/loader.js`.
- **`chatbot.html`** — standalone chatbot demo with fully inlined CSS and JS.

A content change (project list, skills, contact info) must be applied to each page you intend to keep — editing `index.html` alone does not affect the others.

---

## The "Lexon" chat assistant

Two different, incompatible implementations exist:

**`index.html` (current)** posts to `chat-api.php`, a small PHP proxy that forwards the message to the Google Gemini API with a system prompt describing Charles' background, skills, and projects. The API key lives server-side in `config.php` and never reaches the browser.

**`sample.html`** (via `js/chat.js`) uses keyword-matched canned replies with a Hugging Face inference fallback, plus browser Text-to-Speech (`speechSynthesis`). Its bot-identity strings are duplicated from `index.html` — keep them in sync if that matters to you.

### Configuring the chat backend

```bash
cp config.example.php config.php
```

Then edit `config.php`:

```php
define('GEMINI_API_KEY', 'your-real-key-here');
define('GEMINI_MODEL',   'gemini-2.5-flash-lite');
define('ALLOWED_ORIGIN', 'https://cncc.vercel.app'); // '*' for local dev
```

`config.php` is listed in `.gitignore` — **never commit it.**

---

## Running locally

The page itself is static, so the simplest preview is to open `index.html` in a browser. A local server is preferable, since pages fetch CDN assets and the chat makes a cross-origin request:

```bash
python -m http.server 8000
# → http://localhost:8000
```

To exercise the chatbot you need PHP, because `chat-api.php` must actually execute:

```bash
php -S localhost:8000
# → http://localhost:8000
```

With `python -m http.server` the chat request will return the raw PHP source instead of a reply.

---

## Deployment

The site deploys to Vercel from the `main` branch of `origin`. There is no CI pipeline and no `vercel.json` in the repo.

> **Note:** Vercel serves this project as static files, which means `chat-api.php` does not execute there by default — the Lexon chat will not get replies on the live site until the proxy is hosted somewhere that runs PHP (or ported to a Vercel serverless function). Everything else on the page works as static HTML/CSS/JS.

---

## Design system

Design tokens are CSS custom properties in `:root` at the top of `css/design.css`. Reuse these variables instead of hard-coding colors:

| Token | Value | Role |
|---|---|---|
| `--cyan` | `#00f5d4` | Primary accent |
| `--blue` | `#3b82f6` | Secondary accent |
| `--bg` | `#070711` | Page background |
| `--surface` | — | Card / panel background |
| `--border` | — | Hairline borders |
| `--text` | — | Body text |
| `--muted` | — | Secondary text |

**Fonts:** Syne (headings), DM Sans (body), JetBrains Mono (accents and `// tags`).

**Look:** dark glassmorphic developer theme with an SVG noise overlay (`body::before`) and AOS scroll animations via `data-aos` attributes on sections.

---

## Featured projects

| Project | Stack |
|---|---|
| IPT Link Submission | PHP, MySQL, Bootstrap |
| BCC SAS QR Code Generator | PHP, MySQL, JavaScript |
| BCC Student Attendance System | PHP, MySQL, Bootstrap |
| Student Attendance Tracker | PHP, MySQL, JavaScript |
| FormFlow — Forms Management Platform | PHP, MySQL, Bootstrap |
| eGradeBook | PHP, MySQL, Bootstrap |
| SMART — Student Manual Access and Record Tracker | Laravel, MySQL, Bootstrap |

---

## Known placeholders

- The **"Download CV"** button in the hero links to `page/index.html` (a 404 template), not a real CV file.
- The **GitHub** links in the hero and contact sections point to `https://github.com` rather than a profile.

---

## Contact

- **Email:** charlesnixoncayading@gmail.com
- **Facebook:** [charlesnixon.cayading](https://www.facebook.com/charlesnixon.cayading)

---

© 2025 Charles Nixon Cayading. All rights reserved.
