# 🧩 Puzzle Party

A simple, fast, single-page puzzle game you can run anywhere — no install, no backend, no dependencies.

**[▶ Play it live](#)** _(replace with your GitHub Pages URL after deploying)_

![Puzzle Party screenshot](screenshot.png)

---

## ✨ Features

- 📷 **Upload any picture** — JPG, PNG, HEIC, WebP, etc.
- 🧩 **Customizable grid** — from 2×2 (4 pieces) up to 20×20 (400 pieces)
- 🎚️ **5 difficulty levels** — controls how scrambled the start is and the score multiplier
- ⏱️ **Live timer** with pause/resume (board blurs while paused — no peeking!)
- 🏆 **Smart scoring** out of 100, based on time + difficulty + grid size
- 📜 **Game history** with thumbnails, persisted in browser localStorage
- 📤 **Share button** — system share sheet, WeChat-friendly tips, SMS, Email
- 📱 **Works on mouse, trackpad, and touch** — Pointer Events for smooth dragging
- 🌏 **No external dependencies** — works behind firewalls, in China, offline
- 🌍 **Localized fonts** — uses system fonts including PingFang SC and Microsoft YaHei

---

## 🚀 Quick start

### Option A — Just open the file

```bash
git clone https://github.com/YOUR_USERNAME/puzzle-party.git
cd puzzle-party
open index.html       # macOS
start index.html      # Windows
```

That's it — it's a static site with zero build step.

### Option B — Run a local server (optional)

```bash
# Python 3
python3 -m http.server 8000

# or Node.js
npx serve .
```

Then visit `http://localhost:8000`.

---

## 🌐 Deploy to the web (free)

### GitHub Pages (recommended)
1. Push this repo to GitHub
2. Settings → Pages → Source: `Deploy from a branch` → Branch: `main` / `(root)`
3. Wait ~1 min — your game is live at `https://YOUR_USERNAME.github.io/puzzle-party/`

### Cloudflare Pages (faster in China)
1. Sign up free at [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect your GitHub repo, or drag the folder for direct upload
3. Free, global CDN, generally accessible from China

### Tencent Cloud / Aliyun OSS (best for China-only audience)
- 腾讯云静态网站托管 (CloudBase) — fastest in mainland China
- Aliyun OSS static website hosting — also fast in China
- Both require Chinese ID for signup (实名认证)

---

## 📁 Project structure

```
puzzle-party/
├── index.html        # Markup, styles, layout (HTML + CSS)
├── app.js            # All game logic (~400 lines, vanilla JS)
├── README.md         # This file
├── LICENSE           # MIT
└── .gitignore
```

No build tools, no npm dependencies, no frameworks. Just browser-native HTML/CSS/JS.

---

## 🎮 How to play

1. **Upload** a picture by clicking the dashed box (or drag & drop one)
2. Pick **pieces per side** (2–20) and **difficulty** (1–5)
3. Click **▶ Start**
4. **Drag pieces** to swap them. Correct placements lock automatically (green border)
5. When all pieces are correct, you win — your score is saved to history

### Scoring formula

```
expected_time = N² × 3 sec × (0.6 + difficulty × 0.2)
ratio         = expected_time / your_time
score         = 100 × min(1, ratio) × (0.5 + difficulty × 0.1)
```

Maxing out a 20×20 hard puzzle in record time → ~100 points. Easier puzzles cap lower.

---

## 🛣️ Roadmap

Features planned but not yet implemented:

- [ ] **Real multiplayer co-op** — up to 5 players solving the same puzzle in real-time (needs Firebase / Supabase backend)
- [ ] **True jigsaw piece shapes** — interlocking tabs drawn on canvas
- [ ] **Difficulty: piece rotation** — pieces start rotated, must be rotated correctly
- [ ] **Daily puzzle challenge** — same picture for everyone each day
- [ ] **Cloud-saved history** — sync across devices
- [ ] **Image library** — pick from built-in pictures if you don't have one

PRs welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) (TODO).

---

## 🌏 Notes for users in China (中国大陆用户须知)

This app is designed to work **without any external dependencies** — no Google Fonts, no CDN scripts, no third-party APIs. Everything is self-contained.

**Recommended hosting for Chinese audiences:**
- 腾讯云 CloudBase 静态托管 (fastest)
- 阿里云 OSS 静态网站
- Cloudflare Pages (usually accessible)

**Avoid:**
- Netlify, Vercel — sometimes blocked / slow
- GitHub Pages — frequently blocked

**Sharing via WeChat:** click the 📤 Share button → 💬 WeChat Tip for step-by-step instructions.

---

## 📄 License

MIT — free to use, modify, and share. See [LICENSE](LICENSE).

---

## 🙏 Credits

Built with love using only HTML, CSS, and vanilla JavaScript. No frameworks, no build tools, no fuss.
