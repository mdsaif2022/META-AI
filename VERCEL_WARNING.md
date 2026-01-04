# ⚠️ IMPORTANT: Vercel is NOT Recommended for This Bot

## Why Vercel Won't Work Well

**Vercel is designed for:**
- Static websites
- Serverless functions (short-lived, event-driven)
- API endpoints that respond quickly and exit

**Your bot needs:**
- ✅ Persistent runtime (runs 24/7)
- ✅ Long-running processes
- ✅ WebSocket connections (for Facebook API)
- ✅ Background tasks
- ✅ Stateful connections

## Problems You'll Face on Vercel

1. **Serverless Functions Timeout:**
   - Vercel functions have execution time limits
   - Free tier: 10 seconds (Hobby)
   - Pro tier: 60 seconds
   - Your bot needs to run indefinitely

2. **Cold Starts:**
   - Functions "sleep" when not in use
   - Your bot needs to be always ready to receive messages
   - Cold starts cause delays and missed messages

3. **No Persistent State:**
   - Serverless functions are stateless
   - Your bot maintains chat history, user data, etc.

4. **WebSocket Limitations:**
   - Vercel doesn't support long-lived WebSocket connections well
   - Your bot uses WebSockets to connect to Facebook

## ✅ Recommended Alternatives

### 1. **Render** (BEST FOR FREE TIER) ⭐
- ✅ Free tier available
- ✅ Perfect for Node.js apps
- ✅ Persistent runtime
- ✅ Easy setup
- ⚠️ Free tier sleeps after 15 min (use UptimeRobot to keep alive)

**Deploy:** See `RENDER_DEPLOYMENT.md`

### 2. **Railway** (RECOMMENDED)
- ✅ $5/month credit (free tier)
- ✅ Great developer experience
- ✅ Auto-deploy from Git
- ✅ Persistent runtime
- ✅ No sleep on free tier

### 3. **Fly.io**
- ✅ Generous free tier
- ✅ Global deployment
- ✅ Persistent runtime

### 4. **VPS** (BEST FOR PRODUCTION)
- ✅ Full control
- ✅ No limitations
- ✅ $5-12/month
- Options: DigitalOcean, Vultr, AWS Lightsail, Linode

## If You Still Want to Try Vercel

I've updated `package.json` to use Node.js 20.x+ (compatible with Vercel's requirements). However:

1. **It will likely fail** or work poorly
2. **Your bot may miss messages** due to cold starts
3. **You'll hit timeout limits** quickly
4. **WebSocket connections will be unreliable**

### Vercel Configuration (NOT RECOMMENDED):

**Build Command:**
```
npm install
```

**Output Directory:**
```
(leave empty)
```

**Install Command:**
```
npm install
```

**Runtime:** Node.js 24.x (set in package.json engines)

**Framework Preset:** Other

**Root Directory:** `Goat-Bot-V2` (if in subfolder)

---

## My Strong Recommendation

**👉 Switch to Render instead!**

1. Go to [render.com](https://render.com)
2. Sign up (free)
3. Connect your GitHub repo
4. Create a new Web Service
5. Use the settings from `RENDER_DEPLOYMENT.md`
6. Set up UptimeRobot (see `UPTIMEROBOT_SETUP.md`)

Your bot will work much better on Render! 🚀

