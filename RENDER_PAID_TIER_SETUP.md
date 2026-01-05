# Render Paid Tier Setup Guide

## Verify Your Render Plan

### Step 1: Check Your Service Plan
1. Go to **Render Dashboard**: https://dashboard.render.com
2. Select your service: `goat-bot-v2`
3. Go to **"Settings"** tab
4. Scroll down to **"Plan"** section
5. **Verify it shows**: 
   - ✅ **"Starter"** ($7/month) or **"Standard"** ($25/month)
   - ❌ NOT "Free" plan

### Step 2: Check Service Status
1. In your service dashboard, check the **"Metrics"** tab
2. Look for:
   - **"Uptime"** - should show 100% or close to it
   - **"Status"** - should be "Live" (not "Sleeping")
   - **"Last Deploy"** - should be recent

### Step 3: Verify Always-On Behavior
- **Free tier**: Service sleeps after 15 minutes of inactivity
- **Paid tier**: Service stays awake 24/7, never sleeps

## If Your Service is Still Sleeping

If you upgraded but it's still sleeping, check:

1. **Did the upgrade complete?**
   - Go to Render Dashboard → Your Service → Settings
   - Check if plan shows "Starter" or "Standard"
   - If it still shows "Free", the upgrade didn't complete

2. **Did you upgrade the correct service?**
   - Make sure you upgraded `goat-bot-v2` (not a different service)

3. **Redeploy after upgrade:**
   - Sometimes you need to manually redeploy after upgrading
   - Go to "Manual Deploy" → "Deploy latest commit"

## Benefits of Paid Tier

✅ **Always-On**: Service never sleeps, runs 24/7
✅ **No UptimeRobot needed**: Don't need to ping it
✅ **Better performance**: More resources
✅ **Faster cold starts**: If it does restart, starts faster

## Configuration for Paid Tier

Your `render.yaml` should work the same, but you can remove UptimeRobot if you want:

```yaml
services:
  - type: web
    name: goat-bot-v2
    runtime: node
    nodeVersion: 20
    buildCommand: npm install && node create-account-file.js
    startCommand: node index.js
    plan: starter  # or standard (paid tier)
    envVars:
      - key: NODE_ENV
        value: production
    healthCheckPath: /
```

## Troubleshooting

### Service Still Sleeping?
1. **Check billing**: Go to Render Dashboard → Billing
2. **Verify payment**: Make sure payment method is valid
3. **Contact Render support**: If upgrade didn't work

### Service Not Starting?
1. **Check logs**: Go to "Logs" tab
2. **Verify environment variables**: Make sure `ACCOUNT_COOKIES` is set
3. **Check build logs**: See if build completed successfully

## Cost Comparison

- **Free Tier**: $0/month (but sleeps, needs UptimeRobot)
- **Starter Plan**: $7/month (always-on, 512MB RAM, 0.5 CPU)
- **Standard Plan**: $25/month (always-on, 2GB RAM, 1 CPU)

For a Facebook bot, **Starter ($7/month)** is usually enough.

