# Deployment Settings Guide for Goat Bot V2

This guide shows the correct build/install settings for deploying your bot on various platforms.

## Platform-Specific Settings

### For Render

In Render Dashboard → Your Service → Settings:

**Build Command:**
```
npm install
```

**Start Command:**
```
node index.js
```

**Note:** Render doesn't have "Output Directory" for web services - that's only for static sites.

---

### For Vercel (if using)

**Build Command:**
```
(leave empty or: npm install)
```

**Output Directory:**
```
(leave empty or: .)
```

**Install Command:**
```
npm install
```

**⚠️ Important:** Vercel is designed for static sites and serverless functions. This bot needs a persistent runtime, so **Vercel is NOT recommended**. Use Render, Railway, or a VPS instead.

---

### For Railway

Railway auto-detects Node.js projects. Settings:

**Build Command:**
```
npm install
```

**Start Command:**
```
node index.js
```

---

### For Fly.io

In `fly.toml` or dashboard:

**Build Command:**
```toml
[build]
  builder = "paketobuildpacks/builder:base"
```

Or use:
```
npm install
```

**Start Command:**
```
node index.js
```

---

## General Settings (All Platforms)

### Install Command
```
npm install
```

This installs all dependencies from `package.json`.

### Build Command
```
npm install
```

OR leave empty if the platform only needs install command.

**Why no build?** This bot runs directly with Node.js - it doesn't compile or bundle code like React/Vue apps.

### Output Directory
```
.
```
OR leave empty.

**Why?** This is a runtime application, not a static website. No build artifacts to output.

---

## Key Points

✅ **DO:**
- Use `npm install` for install/build
- Use `node index.js` for start command
- Leave output directory empty for runtime apps

❌ **DON'T:**
- Use `npm run build` (this bot has no build script)
- Set output directory to `public` or `dist` (not a static site)
- Use `npm run vercel-build` (not for Vercel)

---

## Environment Variables Needed

Make sure to set these in your platform's environment variables section:

- `NODE_ENV=production`
- `GROQ_API_KEY` (if using Groq AI)
- `OPENAI_API_KEY` (if using OpenAI)
- `GEMINI_API_KEY` (if using Gemini AI)
- `MONGODB_URI` (if using MongoDB)

---

## Which Platform Should You Use?

**Recommended:**
- ✅ **Render** - Free tier available, easy setup
- ✅ **Railway** - $5/month credit, great DX
- ✅ **Fly.io** - Generous free tier

**Not Recommended:**
- ❌ **Vercel** - Designed for static sites/serverless, not persistent bots
- ❌ **Netlify** - Same as Vercel

**Best for Production:**
- ✅ **VPS** (DigitalOcean, Vultr, AWS Lightsail) - Full control, $5-12/month

