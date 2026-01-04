# Render Dashboard Settings

## Required Settings for Goat-Bot-V2

When configuring your service in the Render dashboard, use these settings:

### Build Command
```
npm install && node create-account-file.js
```

**Why?** This creates the `account.dev.txt` file automatically during build (required for free tier without Shell access).

### Start Command
```
node index.js
```

**Why?** This starts your bot application.

### Root Directory
Leave empty (unless your project is in a subdirectory).

### Environment Variables

Make sure you have:
- `NODE_ENV` = `production` (or `development`)

**Note:** If you're using `render.yaml`, these settings should be configured there, but the Render dashboard settings take precedence if you configure them manually.

## Why This Matters

Since Render's free tier doesn't include Shell access, the `create-account-file.js` script must run during the build process to create the required `account.dev.txt` file. This allows the bot to:

1. Create the account file automatically
2. Detect if email/password are in config
3. Use email/password to login if the file is empty
4. Save cookies to the file after successful login

