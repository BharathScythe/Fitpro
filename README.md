# Shape Up — Online Fitness Program

A single-page coaching website for **Mohan Raj**. The enquiry form opens WhatsApp pre-filled with the visitor's details and sends to **+91 63836 21668**.

## Files
- `index.html` — page structure and content
- `styles.css` — dark blue theme
- `script.js` — form → WhatsApp handoff and small UX bits
- `mohan.jpeg` — coach photo (About section)

---

## How the form works

There is **no backend and no signup needed**. When a visitor submits the form, `script.js` builds a formatted message and opens `https://wa.me/916383621668?text=...` in a new tab. The visitor taps **Send** in WhatsApp and the enquiry lands in Mohan's chat.

This works on GitHub Pages, Netlify, Vercel, or even by double-clicking `index.html` locally.

**To change the receiving WhatsApp number**, edit one line in `script.js`:
```js
const COACH_WHATSAPP = '916383621668'; // country code + number, no '+' or spaces
```

---

## Hosting on GitHub Pages

### Option A — GitHub web UI (easiest)
1. Sign in at https://github.com → **New repository**
2. Name it `shape-up` (or anything). Set **Public**. Don't add a README. Click **Create repository**.
3. On the new repo page click **uploading an existing file**.
4. Drag in all 4 files: `index.html`, `styles.css`, `script.js`, `mohan.jpeg`. Click **Commit changes**.
5. Go to **Settings → Pages** (left sidebar).
6. Under **Source**, pick branch **main** and folder **/ (root)**. Click **Save**.
7. Wait ~1 minute. The page shows: *"Your site is live at https://&lt;your-username&gt;.github.io/shape-up/"*. Open it.

### Option B — git command line
```powershell
cd "C:\Users\bhara\Downloads\Mohan project"
git init
git add .
git commit -m "Initial Shape Up site"
git branch -M main
git remote add origin https://github.com/<your-username>/shape-up.git
git push -u origin main
```
Then enable Pages via **Settings → Pages** (steps 5–6 above).

### Custom domain (optional)
**Settings → Pages → Custom domain** → enter your domain (e.g. `shapeup.in`). At your domain registrar, create a `CNAME` record pointing to `<your-username>.github.io`.

---

## Things to customise

| Where | What to change |
|---|---|
| `index.html` Programs section | Add real prices to each plan card |
| `index.html` Contact block | Email shown publicly (currently `mohanraj.fitness@gmail.com`) |
| `script.js` `COACH_WHATSAPP` | The WhatsApp receiving number |
| `mohan.jpeg` | Replace with a different photo (keep the same filename, or update the `<img src>` in `index.html`) |

## Testing locally
Just double-click `index.html`. Fill the form and click **Send Enquiry on WhatsApp** — WhatsApp Web will open with the message ready to send.
