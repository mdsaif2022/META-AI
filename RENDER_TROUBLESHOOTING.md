# Render Troubleshooting Guide

## Issue: "No data captured in the last 12 hours" in Metrics

This usually means:
- ❌ Service isn't running
- ❌ Service crashed after starting
- ❌ Service isn't receiving/sending network traffic
- ❌ Deployment didn't complete successfully

## Step-by-Step Troubleshooting

### Step 1: Check Service Status

1. **Go to Render Dashboard** → Your Service
2. **Look at the top of the page** - what does it say?
   - ✅ **"Live"** (green) = Service is running
   - ⚠️ **"Build failed"** = Deployment failed
   - ⚠️ **"Deploy failed"** = Service failed to start
   - ⚠️ **"Stopped"** = Service is stopped

### Step 2: Check Recent Deployments

1. **Go to "Events" tab** (left sidebar)
2. **Look at the most recent deployment**:
   - ✅ **Green checkmark** = Deployment succeeded
   - ❌ **Red X** = Deployment failed
3. **Click on the deployment** to see details

### Step 3: Check Logs

1. **Go to "Logs" tab** (left sidebar)
2. **Look for**:
   - ✅ **"Build successful"** = Build completed
   - ✅ **"Running 'node index.js'"** = Service started
   - ✅ **"LOGIN FACEBOOK"** = Bot is trying to log in
   - ❌ **Error messages** = Something went wrong
3. **Scroll to the bottom** - these are the most recent logs

### Step 4: Common Issues and Fixes

#### Issue: Build Failed
**Symptoms**: Red X in Events, "Build failed" status
**Fix**: 
- Check build logs for errors
- Common causes: Missing dependencies, Node.js version issues
- Make sure `package.json` has correct Node.js version

#### Issue: Service Crashed After Start
**Symptoms**: Service starts then stops, no recent logs
**Fix**:
- Check logs for error messages
- Common causes: Missing config files, login errors, port binding issues
- Make sure `ACCOUNT_COOKIES` environment variable is set

#### Issue: Service Running But No Traffic
**Symptoms**: Service shows "Live" but no network metrics
**Fix**:
- This is normal for a bot that doesn't serve web traffic
- Check if bot is actually working (check logs for login success)
- Network metrics only show HTTP traffic, not bot activity

### Step 5: Verify Bot is Working

Even if network metrics show "No data", the bot might still be working. Check:

1. **Logs tab** - Look for:
   - `LOGIN FACEBOOK: Login in progress`
   - `LOGIN FACEBOOK: Login successful` (or similar)
   - Any error messages

2. **If bot logged in successfully**, it's working even without network metrics

## What Network Metrics Actually Show

**Network Metrics** only show:
- ✅ HTTP requests to your service (dashboard, API calls)
- ✅ Outbound requests your service makes

**Network Metrics DON'T show**:
- ❌ Bot's Facebook API calls (those go through Facebook's servers)
- ❌ Internal bot activity
- ❌ Message processing

**So "No data" is NORMAL if:**
- ✅ Bot is running and logged in
- ✅ Bot is processing messages
- ✅ But not receiving HTTP requests

## How to Verify Bot is Actually Working

### Method 1: Check Logs
1. Go to **"Logs" tab**
2. Look for successful login messages
3. Look for bot activity (message processing, etc.)

### Method 2: Test Dashboard (if enabled)
1. Go to your service URL: `https://your-bot-name.onrender.com`
2. If dashboard loads = Service is running
3. If you see bot stats = Bot is working

### Method 3: Send a Test Message
1. Send a message to your bot on Facebook
2. Check logs to see if bot received it
3. If bot responds = It's working!

## Quick Health Check

Run through this checklist:

- [ ] Service status shows "Live" (green)
- [ ] Most recent deployment shows green checkmark
- [ ] Logs show bot started (`Running 'node index.js'`)
- [ ] Logs show login attempt or success
- [ ] No error messages in recent logs
- [ ] Service URL responds (if dashboard is enabled)

If all checked = **Bot is working!** (Network metrics don't matter)

## Still Having Issues?

If service shows errors:
1. **Copy the error message** from logs
2. **Check common errors**:
   - Missing `ACCOUNT_COOKIES` → Add environment variable
   - Login failed → Check cookies are valid
   - Port binding error → Check dashboard configuration
   - Build errors → Check Node.js version and dependencies

## Need Help?

Share:
1. Service status (Live/Failed/Stopped)
2. Recent deployment status (Success/Failed)
3. Last few lines of logs (especially any errors)

