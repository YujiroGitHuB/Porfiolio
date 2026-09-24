# Charles Nixon Cayading — Portfolio

Personal portfolio website for **Charles Nixon Cayading** — Web Developer & IT Instructor at Binalatongan Community College (Basista, Pangasinan, Philippines).

🔗 **Live site:** [https://cncc.vercel.app](https://cncc.vercel.app)

A static, dark-themed, glassmorphic single-page portfolio with a hero section, about, projects, skills, and contact.

---

## Tech stack

| Layer | What's used |
|---|---|
| Markup | Plain HTML5 (no templating, no build step) |
| Styling | Custom CSS with design tokens + Bootstrap 5.3.3 (CDN) |
| Scripting | Vanilla JavaScript (inlined in `index.html`) |
| Animations | [AOS](https://michalsnik.github.io/aos/) 2.3.1 scroll animations |
| Icons / Fonts | Font Awesome Kit, Google Fonts (Syne, DM Sans, JetBrains Mono), devicon SVGs |
| Hosting | Vercel (`main` branch = deploy) |

There is **no package manager, no bundler, and no test suite**. Every third-party library is loaded from a CDN at runtime — there is no `node_modules` and no vendored assets.

---

## Project structure

```
Portfolio/
├── index.html            # ← Current / canonical page (self-contained)
├── sample.html           # Older alternate version (uses css/style.css + js/)
├── css/
│   ├── design.css        # Styles for index.html (the design system)
│   ├── style.css         # Styles for sample.html
│   └── 404.css           # Styles for page/index.html
├── js/
│   └── loader.js         # Page loader — used only by sample.html (needs jQuery)
├── images/               # Profile photo and misc assets
└── page/index.html       # Colorlib 404 template (placeholder CV link target)
```

### ⚠️ Two parallel, non-shared page versions

The repo holds **two standalone versions of the same portfolio**. They do not share code, so know which one you're editing:

- **`index.html`** — the live page. Styled only by `css/design.css`; *all* of its JavaScript (loader, welcome voice, AOS init, scroll-spy navbar, mobile nav) is inlined at the bottom of the file. It does **not** use anything in `js/`.
- **`sample.html`** — older version. Uses `css/style.css` and the external `js/loader.js`.

A content change (project list, skills, contact info) must be applied to each page you intend to keep — editing `index.html` alone does not affect `sample.html`.

---

## Running locally

The site is fully static, so the simplest preview is to open `index.html` in a browser. A local server is preferable, since pages fetch CDN assets:

```bash
python -m http.server 8000
# → http://localhost:8000
```

---

## Deployment

The site deploys to Vercel from the `main` branch of `origin`. There is no CI pipeline and no `vercel.json` in the repo.

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
| BCC Alumni Tracker System | Laravel, MySQL, Bootstrap |

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
