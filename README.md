
# 🎮 Sonic-Inspired Platformer (Kaplay + Vite)

This is a 2D platformer game built using [Kaplay](https://github.com/replit/kaplay) (a wrapper around Kaboom.js) and bundled using [Vite](https://vitejs.dev/). It features animated characters, sound effects, and scene transitions.

---

## 🚀 Features

- 🎮 Sonic-style character with running and jumping animations  
- 🧠 Scene management: Main Menu, Game, Game Over  
- 🔊 Sound effects and background music  
- 🖼️ Custom sprites, fonts, and backgrounds  
- ⚡ Fast build and development workflow with Vite  

---

## 🛠️ Project Structure

```
project/
├── public/               # Static assets (graphics, fonts, sounds)
│   ├── graphics/
│   ├── fonts/
│   └── sounds/
├── src/                  # Source code
│   ├── entities/
│   ├── scenes/
│   ├── main.js
│   └── kaplayCtx.js
├── index.html
├── vite.config.js
├── netlify.toml
├── package.json
└── README.md
```

---

## 🔧 Local Development

### 1. Clone and Install

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
npm install
```

### 2. Run Dev Server

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🏗️ Build for Production

```bash
npm run build
```

### Preview the Build

```bash
npx serve dist
```

---

## 🌐 Deploying to Netlify

### Netlify Build Settings

| Field             | Value             |
|------------------|-------------------|
| Build command     | `npm run build`   |
| Publish directory | `dist`            |

### `netlify.toml`

Add this file to the root of your project:

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

---

## ✅ Important Notes

### In `vite.config.js`, set:

```js
export default {
  base: './',
}
```

### In `index.html`, make sure your script path is relative:

```html
<script type="module" src="./src/main.js"></script>
```

---

## 🧩 Credits

- [Kaplay](https://github.com/replit/kaplay)
- [Kaboom.js](https://kaboomjs.com/)
- Sound and sprite assets inspired by the Sonic series (used for educational/demo purposes)

---

## 📄 License

This project is licensed for educational and demo use only. Do not distribute copyrighted game assets.
