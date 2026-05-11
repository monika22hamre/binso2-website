# BINSO — Digital Marketing Agency Website

## 📁 Complete File & Folder Structure

```
binso-agency/
├── index.html          ← Complete one-page website (all sections)
├── css/
│   └── style.css       ← All styles (750+ lines) — variables, layout, animations
├── js/
│   └── main.js         ← All JavaScript (250+ lines) — full interactivity
├── images/             ← Drop your own images here (CDN used by default)
└── README.md           ← This file
```

---

## 🎨 Design System

### Fonts (Google Fonts)
| Role        | Font         | Weights              |
|-------------|--------------|----------------------|
| Headings/UI | Barlow       | 400, 600, 700, 800, 900 |
| Body text   | Open Sans    | 300, 400, 500, 600   |

### Exact Colour Palette
| Variable        | Hex       | Usage                              |
|-----------------|-----------|------------------------------------|
| `--orange`      | `#f5821e` | Primary CTA, accents, icons, badge |
| `--orange-d`    | `#e07010` | Hover state                        |
| `--navy`        | `#1a1f36` | Navbar, hero overlay               |
| `--navy2`       | `#13172b` | Footer, dark bg, form button       |
| `--dark`        | `#222222` | Dark text, headings                |
| `--gray`        | `#666666` | Secondary text                     |
| `--light`       | `#f8f8f8` | Section backgrounds                |
| `--white`       | `#ffffff` | Cards, base                        |

---

## 🧩 All Sections (matching design exactly)

| # | Section | Description |
|---|---------|-------------|
| 1 | **Navbar** | Fixed, transparent → dark on scroll. Logo with X icon. Search + cart icons + CTA button |
| 2 | **Hero** | Full-viewport dark overlay with animated heading, typing effect, floating shapes |
| 3 | **Feature Cards** | 3 cards overlapping hero bottom with orange corner accent and hover tilt |
| 4 | **About / Digital Solution** | Left image (with orange bracket border) + right text + stat counter + founder |
| 5 | **Stats Band** | Full-width orange band with 4 animated counters |
| 6 | **FAQ / Accordion** | Left accordion (4 questions) + right image |
| 7 | **Team** | Dark parallax bg with 3 team cards, share button hover effect |
| 8 | **News & Articles** | 3 blog cards with orange date badge, hover zoom |
| 9 | **Contact** | Split: left info (3 icon items) + right orange form card |
| 10 | **Footer** | 4-col: About+social \| Explore links \| Portfolio grid \| Contact info |

---

## ⚡ JavaScript Features (main.js)

| Feature | Description |
|---------|-------------|
| **Preloader** | Animated brand name pulse, fades on load |
| **Navbar scroll** | Transparent → dark navy + shadow after 50px |
| **Mobile menu** | Full-screen overlay with smooth fade |
| **Scroll progress** | Orange bar across very top of viewport |
| **Back to top** | Floating orange circle, appears at 400px scroll |
| **Active nav** | IntersectionObserver highlights current section |
| **Scroll reveal** | Elements fade + slide in as they enter viewport |
| **Accordion FAQ** | Click to open/close, one open at a time, open first on load |
| **Counters** | Animated number counting when stats enter viewport |
| **Contact form** | Validation, loading state, success animation, toast |
| **Smooth scroll** | All `#` links scroll smoothly with nav offset |
| **Parallax** | Hero background subtle Y-drift on scroll |
| **Typing effect** | Hero subtitle cycles through service types |
| **Card tilt** | 3D perspective tilt on feature/news/team cards |
| **Toast notifications** | Slide-in confirmation messages |

---

## 📱 Responsive Breakpoints

| Width      | Behaviour |
|------------|-----------|
| ≥ 1024px   | Full 2-col layouts, all features visible |
| 768–1024px | About/FAQ collapse to single column |
| ≤ 768px    | Hamburger nav, single column, 2-col stats |
| ≤ 480px    | Full single column, compact padding |

---

## 🚀 How to Use (One Click)

### Option 1 — Open directly
Double-click `index.html` → opens instantly in browser. No setup needed.

### Option 2 — Local dev server
```bash
cd binso-agency
npx serve .
# OR
python3 -m http.server 3000
```
Open `http://localhost:3000`

### Option 3 — Netlify Deploy (30 seconds)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire `binso-agency/` folder
3. Your site is live with a URL instantly

---

## 🖼️ Using Your Own Images

Replace Unsplash URLs in `index.html`:
```html
<!-- Before -->
<img src="https://images.unsplash.com/photo-...">

<!-- After -->
<img src="images/your-photo.jpg">
```

---

## 📦 Dependencies (all via CDN, no install)

| Library      | Version | Purpose              |
|--------------|---------|----------------------|
| Bootstrap    | 5.3.2   | Grid + utilities     |
| Font Awesome | 6.4.2   | All icons            |
| Google Fonts | —       | Barlow + Open Sans   |

**Zero npm. Zero build step. Pure HTML/CSS/JS.**
