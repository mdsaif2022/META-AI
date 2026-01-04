# Setting Up account.dev.txt on Render

## Problem

The bot requires `account.dev.txt` file to start, but this file is NOT in the repository (for security - it contains your Facebook credentials).

## Solution: Create account.dev.txt on Render

You need to create this file directly on Render using the Shell/SSH feature.

### Step-by-Step Instructions:

1. **Go to Render Dashboard:**
   - Visit: https://dashboard.render.com
   - Click on your service (goat-bot-v2)

2. **Open Shell:**
   - Click on the "Shell" tab (or look for SSH/Shell option)
   - This opens a terminal connected to your Render service

3. **Create the account.dev.txt file:**
   ```bash
   cd /opt/render/project/src
   nano account.dev.txt
   ```

4. **Paste your Facebook cookies (JSON format):**
   - Get your Facebook cookies (see HOW_TO_GET_COOKIES.md)
   - Paste the JSON cookie array into the file
   - Example format:
     ```json
     [
       {"key": "c_user", "value": "your_user_id", "domain": "facebook.com"},
       {"key": "xs", "value": "your_xs_token", "domain": "facebook.com"},
       ...
     ]
     ```

5. **Save and exit:**
   - Press `Ctrl + X`
   - Press `Y` to confirm
   - Press `Enter` to save

6. **Restart your service:**
   - Go back to Render Dashboard
   - Click "Manual Deploy" → "Clear build cache & deploy" (or just wait for auto-restart)

### Alternative: Using Email/Password Login

If you prefer to use email/password instead of cookies:

1. Edit `config.dev.json` on Render:
   ```bash
   nano config.dev.json
   ```

2. Find the `facebookAccount` section and add:
   ```json
   "facebookAccount": {
     "email": "your_email@example.com",
     "password": "your_password",
     "2FASecret": "your_2fa_secret_if_applicable"
   }
   ```

3. Create an empty `account.dev.txt`:
   ```bash
   touch account.dev.txt
   ```

4. The bot will use email/password to login automatically

## File Locations on Render

- Root directory: `/opt/render/project/src/`
- Config file: `/opt/render/project/src/config.dev.json`
- Account file: `/opt/render/project/src/account.dev.txt`
- Commands config: `/opt/render/project/src/configCommands.dev.json`

## Security Notes

⚠️ **IMPORTANT:**
- `account.dev.txt` contains sensitive Facebook credentials
- **NEVER commit this file to Git** (it's in .gitignore)
- Only create it on Render using the Shell
- If your account gets compromised, change your Facebook password immediately

## Troubleshooting

### Bot still says "account.dev.txt not found"
- Verify the file exists: `ls -la account.dev.txt`
- Check you're in the right directory: `pwd` (should be `/opt/render/project/src`)
- Make sure the file has content: `cat account.dev.txt`

### Bot crashes immediately after creating the file
- Check the file format (should be valid JSON for cookies)
- Check Render logs for specific error messages
- Verify file permissions: `chmod 644 account.dev.txt`

### Can't access Shell on Render
- Free tier might not have Shell access
- Try using Render's "Environment" tab to set variables instead (though account file is needed)
- Consider upgrading to paid plan for Shell access

## Related Files

- `HOW_TO_GET_COOKIES.md` - How to extract Facebook cookies
- `RENDER_DEPLOYMENT.md` - Full deployment guide
- `RENDER_CONFIG_SETUP.md` - Config file setup guide

