# GitHub Actions Workflow Setup Guide

This guide will help you set up the META AI Bot to run on GitHub Actions.

## ⚠️ Important Limitations

1. **Time Limit**: GitHub Actions free tier has a **6-hour limit** per workflow run. The bot will automatically restart every 6 hours.
2. **Secrets Required**: You need to set up GitHub Secrets for your Facebook credentials.
3. **Not Recommended for Production**: GitHub Actions is better for testing. For 24/7 operation, consider:
   - VPS (DigitalOcean, AWS, etc.)
   - Railway.app
   - Render.com
   - Heroku (paid)

## 📋 Setup Instructions

### Step 1: Get Your Facebook AppState

1. Run the bot locally first to generate `appState.json`
2. Or use the `getfbstate` command in the bot
3. Copy the contents of `appState.json` file

### Step 2: Set Up GitHub Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add one of the following secrets:

   **Option A: Using AppState (Recommended)**
   - **Name**: `APPSTATE`
   - **Value**: Paste the entire contents of your `account.txt` file if it contains JSON appState, OR the JSON array directly
   
   Example:
   ```json
   [{"key":"datr","value":"abc123...","domain":".facebook.com",...},...]
   ```

   **Option B: Using account.txt content directly**
   - **Name**: `ACCOUNT_TXT`
   - **Value**: Paste the entire contents of your `account.txt` file (can be appState JSON, cookie string, token, etc.)

   **Note**: The bot supports multiple formats in `account.txt`:
   - JSON appState array
   - Cookie string (e.g., `datr=abc;xs=def;...`)
   - EAAAA token
   - Email/password (2 lines)

### Step 3: Configure Workflow (Optional)

The workflow is set to:
- Run automatically every 6 hours
- Run on push to main/master branch
- Run manually via workflow_dispatch

You can modify `.github/workflows/bot.yml` to change these settings.

### Step 4: Enable GitHub Actions

1. Go to your repository **Settings** → **Actions** → **General**
2. Under "Workflow permissions", select **Read and write permissions**
3. Click **Save**

### Step 5: Run the Workflow

1. Go to **Actions** tab in your repository
2. Select **META AI Bot** workflow
3. Click **Run workflow** → **Run workflow**

## 🔧 Alternative: Using Email/Password

If you prefer to use email/password instead of appState:

1. Add these secrets:
   - `FB_EMAIL`: Your Facebook email
   - `FB_PASSWORD`: Your Facebook password
   - `FB_2FA_SECRET`: Your 2FA secret (if enabled)

2. Modify the workflow to update `config.json`:
   ```yaml
   - name: Setup config.json
     working-directory: ./Goat-Bot-V2
     run: |
       # Update config.json with secrets
       node -e "
       const fs = require('fs');
       const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
       config.facebookAccount.email = '${{ secrets.FB_EMAIL }}';
       config.facebookAccount.password = '${{ secrets.FB_PASSWORD }}';
       config.facebookAccount['2FASecret'] = '${{ secrets.FB_2FA_SECRET }}';
       fs.writeFileSync('config.json', JSON.stringify(config, null, 2));
       "
   ```

## 📝 Notes

- The bot will restart every 6 hours due to GitHub Actions limits
- Check the **Actions** tab to see bot logs
- If the bot crashes, logs will be uploaded as artifacts
- Make sure your `config.json` has `antiInbox: false` if you want 1:1 messages

## 🚀 Better Alternatives for 24/7 Operation

For continuous operation, consider these platforms:

1. **Railway.app** - Free tier available, easy setup
2. **Render.com** - Free tier with limitations
3. **DigitalOcean App Platform** - Paid but reliable
4. **VPS** (Hetzner, Contabo, etc.) - Most control, requires setup

