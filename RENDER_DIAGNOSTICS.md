# Render Deployment Diagnostics Guide

## 🔍 How to Check if Bot is Working on Render

### Step 1: Check Health Endpoint

After deployment, visit your Render service URL with `/health`:

```
https://your-service-name.onrender.com/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "bot": {
    "status": "good",
    "listening": "active",
    "loginStatus": "logged_in",
    "uptime": 1234,
    "uptimeFormatted": "20m 34s"
  },
  "timestamp": "2026-01-05T20:50:00.000Z"
}
```

**What Each Status Means:**
- `status: "ok"` → Service is running
- `bot.status: "good"` → Bot logged in successfully
- `bot.listening: "active"` → Bot is listening for messages
- `bot.loginStatus: "logged_in"` → Bot is logged into Facebook
- `bot.loginStatus: "not_logged_in"` → Bot failed to login

### Step 2: Check Render Logs

1. Go to **Render Dashboard** → Your service
2. Click **"Logs"** tab
3. Look for these key messages:

#### ✅ **Success Indicators:**
```
✅ BOT IS NOW LIVE AND READY!
Bot Status: good
Bot ID: 123456789
========================================
✅ Bot successfully logged in and ready to receive messages!
```

#### ❌ **Failure Indicators:**
```
Account file not found. Using email/password from config to login.
LOGIN_FAILED - Can't login to Facebook
Cookies appear to be invalid, expired, or Facebook is blocking automated access.
```

### Step 3: Verify ACCOUNT_COOKIES

Check logs for:
```
========================================
[Goat.js] ACCOUNT FILE CREATION CHECK
========================================
[Goat.js] ACCOUNT_COOKIES env var exists: true
[Goat.js] ✅ account.dev.txt created/updated (XXX bytes)
```

If you see `ACCOUNT_COOKIES env var exists: false`, the environment variable is not set correctly.

## 🚨 Common Issues and Solutions

### Issue 1: Bot Shows "Live" but Not Responding

**Symptoms:**
- Render shows service as "Live"
- Health endpoint returns `loginStatus: "not_logged_in"`
- Bot doesn't respond to messages

**Causes:**
1. **ACCOUNT_COOKIES not set or invalid**
   - Solution: Set `ACCOUNT_COOKIES` in Render → Environment
   - Get fresh cookies from your browser
   - Update the environment variable

2. **Login failed silently**
   - Check logs for `LOGIN_FAILED` messages
   - Verify cookies are fresh and valid
   - Check if Facebook is blocking automated access

3. **Bot crashed after login**
   - Check logs for error messages
   - Look for `TypeError` or other exceptions
   - Check if database connection failed

### Issue 2: Health Endpoint Shows "not_logged_in"

**Solution:**
1. Check Render logs for login errors
2. Verify `ACCOUNT_COOKIES` is set correctly
3. Get fresh cookies and update `ACCOUNT_COOKIES`
4. Redeploy the service

### Issue 3: Bot Logs In But Doesn't Receive Messages

**Check:**
1. Health endpoint should show `listening: "active"`
2. Check logs for "Message #X received" messages
3. Verify bot is in the chat group
4. Check if `antiInbox` is enabled (blocks 1:1 messages)

### Issue 4: Service Keeps Restarting

**Causes:**
1. Bot is crashing on startup
2. Login is failing repeatedly
3. Database connection issues

**Solution:**
1. Check logs for crash errors
2. Verify all environment variables are set
3. Check database configuration

## 📋 Diagnostic Checklist

Before reporting issues, verify:

- [ ] Service shows as "Live" in Render dashboard
- [ ] Health endpoint (`/health`) is accessible
- [ ] Health endpoint shows `status: "ok"`
- [ ] Health endpoint shows `loginStatus: "logged_in"`
- [ ] Health endpoint shows `listening: "active"`
- [ ] Logs show "✅ BOT IS NOW LIVE AND READY!"
- [ ] Logs show "✅ Bot successfully logged in"
- [ ] Logs show `ACCOUNT_COOKIES env var exists: true`
- [ ] Logs show `✅ account.dev.txt created/updated`
- [ ] No error messages in logs
- [ ] Bot ID is logged correctly

## 🔧 Quick Fixes

### Fix 1: Update ACCOUNT_COOKIES

1. Get fresh cookies from browser
2. Go to Render → Environment
3. Update `ACCOUNT_COOKIES` value
4. Save and wait for redeploy

### Fix 2: Restart Service

1. Go to Render Dashboard → Your service
2. Click **"Manual Deploy"** → **"Clear build cache & deploy"**
3. Wait for deployment to complete
4. Check logs and health endpoint

### Fix 3: Check Logs for Errors

1. Go to Render → Logs
2. Look for red error messages
3. Share error details if needed

## 📊 Monitoring Bot Status

### Using Health Endpoint

You can monitor your bot by checking the health endpoint periodically:

```bash
# Check bot status
curl https://your-service.onrender.com/health

# Or visit in browser
https://your-service.onrender.com/health
```

### What to Monitor:

1. **Uptime**: Should increase over time (indicates bot is running)
2. **Login Status**: Should be `logged_in`
3. **Listening Status**: Should be `active`
4. **Bot Status**: Should be `good`

## 🆘 Still Not Working?

If the bot still doesn't work after following all steps:

1. **Check Full Logs**: Copy the entire log output from Render
2. **Check Health Endpoint**: Share the JSON response
3. **Verify Environment Variables**: Confirm all are set correctly
4. **Check Service Status**: Confirm service is on paid plan (starter or higher)

## 📝 Example Health Check Response

**Working Bot:**
```json
{
  "status": "ok",
  "bot": {
    "status": "good",
    "listening": "active",
    "loginStatus": "logged_in",
    "uptime": 3600,
    "uptimeFormatted": "60m 0s"
  },
  "timestamp": "2026-01-05T21:00:00.000Z"
}
```

**Not Working Bot:**
```json
{
  "status": "ok",
  "bot": {
    "status": "can't login",
    "listening": "inactive",
    "loginStatus": "not_logged_in",
    "uptime": 120,
    "uptimeFormatted": "2m 0s"
  },
  "timestamp": "2026-01-05T21:00:00.000Z"
}
```

