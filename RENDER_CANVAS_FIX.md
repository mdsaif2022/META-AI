# Fix for Canvas Build Error on Render

## Problem

The `canvas` package fails to build on Render because:
- Render defaults to Node.js 25.2.1
- `canvas@2.9.1` doesn't support Node.js 25.x
- Canvas requires native compilation and has compatibility issues with Node 25
- Canvas also needs system dependencies (Cairo, Pango, etc.) that may not be available

## Solution

I've updated `package.json` to pin Node.js to version 20.x, which canvas supports.

### Changes Made:

1. **package.json**: Changed `"node": ">=20.x"` to `"node": "20.x"` to pin Node.js version

### Manual Fix on Render Dashboard (REQUIRED):

**You MUST set the Node.js version manually in Render:**

1. Go to your Render service dashboard: https://dashboard.render.com
2. Click on your service (goat-bot-v2)
3. Click "Settings" tab
4. Scroll down to "Node Version" section
5. Change from "Latest" to: `20`
6. Click "Save Changes"
7. Render will automatically redeploy with Node.js 20

### Alternative: If Canvas Still Fails

If canvas still fails to build even with Node.js 20, you have two options:

**Option 1: Install system dependencies (may not work on free tier)**
Canvas needs system libraries that Render's free tier might not provide. You could:
- Upgrade to a paid plan (better build environment)
- Or skip canvas and make those features optional

**Option 2: Make Canvas Optional (Recommended for Free Tier)**

Since canvas is only used for:
- Weather command (image generation) 
- Rank command (image generation)
- QR code reading (already optional with try-catch)

You could modify the code to handle canvas gracefully when it's not available.

## Why This Works

- Node.js 20.x is an LTS (Long Term Support) version
- Canvas package supports Node.js 20.x
- Node.js 20.x is stable and widely used

## After Fixing

1. Commit and push the changes
2. Render will automatically redeploy
3. The build should succeed

## Alternative Solutions (if pinning to Node 20 doesn't work)

1. **Upgrade canvas** (if newer version supports Node 25):
   ```bash
   npm install canvas@latest
   ```

2. **Make canvas optional** (if you don't need image generation):
   - Canvas is already optional for login (has try-catch)
   - But weather.js and rank.js commands need it for image generation
   - You could modify those commands to work without canvas

3. **Use a different hosting** with better build environment for native modules

## Current Canvas Usage

Canvas is used for:
- QR code reading (optional - has fallback)
- Weather command (image generation)
- Rank command (image generation)

If these features aren't critical, you could make canvas optional and remove it from dependencies.

