# Render Free Tier Setup (No Shell Access)

Since Render's free tier doesn't include Shell access, here's how to set up your bot:

## Solution: Use Email/Password Login

The bot can use email/password from `config.dev.json` instead of cookies. This works on free tier!

### Step 1: Set Up Email/Password in Render Environment Variables

1. Go to Render Dashboard → Your Service → "Environment" tab
2. Add these environment variables:

```
FACEBOOK_EMAIL=your_email@example.com
FACEBOOK_PASSWORD=your_password
FACEBOOK_2FA_SECRET=your_2fa_secret_if_you_have_one
```

**OR** edit `config.dev.json` directly in your repository (less secure, but works):

1. Edit `config.dev.json` in your code
2. Add your email/password to the `facebookAccount` section:
   ```json
   "facebookAccount": {
     "email": "your_email@example.com",
     "password": "your_password",
     "2FASecret": "your_2fa_secret_if_needed"
   }
   ```
3. Commit and push

### Step 2: Account File Will Be Created Automatically

I've created a script (`create-account-file.js`) that automatically creates an empty `account.dev.txt` file during build. This allows the bot to start.

The bot will:
1. Check if `account.dev.txt` exists (it will, created by the script)
2. See it's empty
3. Use email/password from `config.dev.json` to login
4. Save the cookies to `account.dev.txt` automatically

### How It Works:

1. **Build script** creates empty `account.dev.txt` file
2. **Bot starts** and reads the empty file
3. **Bot detects** email/password in config
4. **Bot logs in** using email/password
5. **Bot saves** cookies to `account.dev.txt` automatically

## Configuration Options:

### Option A: Email/Password in config.dev.json (Recommended for Free Tier)

Edit `config.dev.json` and add:
```json
"facebookAccount": {
  "email": "your_email@example.com",
  "password": "your_password",
  "2FASecret": "your_2fa_secret_if_needed"
}
```

### Option B: Environment Variables (More Secure)

Set in Render Dashboard → Environment:
- `FACEBOOK_EMAIL`
- `FACEBOOK_PASSWORD`
- `FACEBOOK_2FA_SECRET` (optional)

Then modify the code to read from environment variables (requires code changes).

## After Setup:

1. Commit and push your changes (including config.dev.json with email/password)
2. Render will automatically deploy
3. The bot will:
   - Create account.dev.txt automatically (empty)
   - Read email/password from config.dev.json
   - Login to Facebook
   - Save cookies to account.dev.txt
   - Start running!

## Security Notes:

⚠️ **Using Email/Password:**
- Store credentials in `config.dev.json` (committed to repo) - **LESS SECURE**
- Or use environment variables - **MORE SECURE** (but requires code changes)
- Consider using a test/throwaway Facebook account
- Enable 2FA for better security

## Troubleshooting:

### Bot fails to login with email/password
- Check that email/password are correct in config.dev.json
- Verify 2FA secret is correct if you have 2FA enabled
- Check Render logs for specific error messages

### Bot says "account.dev.txt not found"
- The build script should create it automatically
- Check that `create-account-file.js` is in your repository
- Verify build command includes: `node create-account-file.js`

### Bot starts but doesn't connect to Facebook
- Check email/password in config.dev.json
- Verify your Facebook account isn't locked/restricted
- Check Render logs for login errors

## Alternative: Upgrade to Paid Plan

If you need Shell access for advanced configuration:
- Render Starter plan ($7/month) includes Shell access
- Allows you to create/edit files directly
- Better build environment for native modules

