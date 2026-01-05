# Render Deployment Troubleshooting Guide

## 🔍 How to Check if ACCOUNT_COOKIES is Set

### Step 1: Check Render Logs

After deployment, look for these log messages at the START of the logs:

```
========================================
[Goat.js] ACCOUNT FILE CREATION CHECK
========================================
[Goat.js] ACCOUNT_COOKIES env var exists: true/false
[Goat.js] ACCOUNT_COOKIES length: XXX characters
```

### Step 2: What the Logs Mean

#### ✅ If you see:
```
[Goat.js] ACCOUNT_COOKIES env var exists: true
[Goat.js] ACCOUNT_COOKIES length: 200+ characters
[Goat.js] ✅ account.dev.txt created/updated (XXX bytes)
```
**→ ACCOUNT_COOKIES is set correctly!** The bot should work.

#### ❌ If you see:
```
[Goat.js] ACCOUNT_COOKIES env var exists: false
[Goat.js] ⚠️  ACCOUNT_COOKIES environment variable is NOT SET!
```
**→ ACCOUNT_COOKIES is NOT set in Render!** Follow steps below.

## 🔧 How to Fix ACCOUNT_COOKIES

### Step 1: Get Your Facebook Cookies

1. **Log into Facebook** in your browser (the account you want the bot to use)
2. **Open Developer Tools**: Press `F12` or right-click → Inspect
3. **Go to Application tab** (Chrome) or **Storage tab** (Firefox)
4. **Click Cookies** → `https://www.facebook.com`
5. **Copy all cookies** in this format: `key1=value1;key2=value2;key3=value3;...`

**Required cookies:**
- `c_user` (your Facebook user ID)
- `xs` (session token)
- `datr` (device token)
- `fr` (friend request token)
- `sb` (session browser token)

### Step 2: Set ACCOUNT_COOKIES in Render

1. Go to **Render Dashboard** → Your service (`goat-bot-v2`)
2. Click **"Environment"** in the left sidebar
3. **Check if `ACCOUNT_COOKIES` exists:**
   - If it exists → Click **"Edit"** → Update the value
   - If it doesn't exist → Click **"Add Environment Variable"**
4. **Set the variable:**
   - **Key**: `ACCOUNT_COOKIES`
   - **Value**: Paste your cookie string (no quotes, no spaces at start/end)
5. Click **"Save Changes"**
6. Render will **automatically redeploy**

### Step 3: Verify After Redeployment

Check the logs again. You should now see:
```
[Goat.js] ACCOUNT_COOKIES env var exists: true
[Goat.js] ✅ account.dev.txt created/updated
```

## 🚨 Common Issues

### Issue 1: "Account file not found"

**Cause:** ACCOUNT_COOKIES is not set or empty

**Solution:**
1. Check Render → Environment → ACCOUNT_COOKIES
2. Make sure it's set and not empty
3. Redeploy

### Issue 2: "Cookies appear to be invalid or expired"

**Cause:** Cookies are old or invalid

**Solution:**
1. Get **fresh cookies** from your browser
2. Update ACCOUNT_COOKIES in Render
3. Redeploy

### Issue 3: "Login failed" with email/password

**Cause:** Facebook blocks automated logins from servers

**Solution:**
- **Use cookies instead** (recommended)
- Cookies are more reliable for server deployments
- Get fresh cookies and set ACCOUNT_COOKIES

### Issue 4: Bot keeps trying email/password

**Cause:** Account file exists but is empty, or ACCOUNT_COOKIES not set

**Solution:**
1. Set ACCOUNT_COOKIES in Render
2. The bot will automatically create account.dev.txt
3. Check logs to verify file creation

## 📋 Checklist

Before reporting issues, check:

- [ ] ACCOUNT_COOKIES is set in Render → Environment
- [ ] ACCOUNT_COOKIES value is not empty
- [ ] ACCOUNT_COOKIES contains all required cookies (c_user, xs, datr, fr, sb)
- [ ] Cookies are fresh (not expired)
- [ ] Logs show `[Goat.js] ACCOUNT_COOKIES env var exists: true`
- [ ] Logs show `✅ account.dev.txt created/updated`
- [ ] Render service is on **paid plan** (starter or higher) for 24/7 uptime

## 🆘 Still Not Working?

If the bot still doesn't work after following all steps:

1. **Check the full Render logs** from the beginning
2. **Look for** `[Goat.js]` messages at the start
3. **Share the logs** showing:
   - Whether ACCOUNT_COOKIES exists
   - Whether account.dev.txt was created
   - Any error messages

## 📝 Example Cookie String Format

```
ps_l=1;datr=XXX;fr=XXX;xs=XXX;c_user=123456789;presence=XXX;dpr=2;oo=v1;ps_n=1;sb=XXX;wd=320x615
```

**Important:**
- No spaces around `=`
- Separate cookies with `;`
- No quotes needed
- Include ALL cookies from facebook.com
