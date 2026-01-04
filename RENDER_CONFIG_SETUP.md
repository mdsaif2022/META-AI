# Render Configuration Setup Guide

## ✅ Files Created

I've created the required configuration files for Render deployment:

1. **`config.dev.json`** - Production configuration template
2. **`configCommands.dev.json`** - Production commands configuration template

## 📝 Next Steps

### 1. Commit and Push These Files

Since these files are needed for Render deployment, you need to commit them:

```bash
git add config.dev.json configCommands.dev.json
git commit -m "Add config.dev.json and configCommands.dev.json for Render deployment"
git push
```

**Note:** These files contain template/empty values. You'll configure actual values after deployment.

### 2. Configure Your Bot Settings

After deploying to Render, you have two options:

#### Option A: Edit Files Directly on Render (Recommended for sensitive data)

1. Go to Render Dashboard → Your Service
2. Click "Shell" tab (or use SSH if available)
3. Edit the files using nano/vim:
   ```bash
   nano config.dev.json
   nano configCommands.dev.json
   ```
4. Configure your settings (Facebook credentials, API keys, etc.)
5. Restart the service

#### Option B: Use Environment Variables (For some settings)

Some settings can be passed via environment variables. Edit files directly for complex configurations.

### 3. Configure Your Facebook Account

You'll need to add your Facebook credentials to `config.dev.json`:

- **Email/Password:** Add your Facebook account credentials
- **Or use `account.dev.txt`:** For cookie-based login (more secure)

### 4. Important Settings to Configure

In `config.dev.json`:

- **Facebook Account:** Email, password, or cookies
- **Database:** 
  - SQLite (works out of the box)
  - MongoDB (recommended for production - set `uriMongodb`)
- **Dashboard:** Port will use `process.env.PORT` from Render
- **API Keys:** Add your API keys for AI features, etc.

### 5. Account File Setup

You also need `account.dev.txt` for Facebook login. Options:

**Option 1: Create on Render (Recommended)**
1. Go to Render Dashboard → Your Service → Shell
2. Create the file:
   ```bash
   nano account.dev.txt
   ```
3. Paste your Facebook cookies (JSON format)
4. Save and exit

**Option 2: Create Locally and Push (Not Recommended)**
- ⚠️ **Warning:** `account.dev.txt` is in `.gitignore` for security
- Only do this if you're using a test/throwaway account
- Use: `git add -f account.dev.txt` to force add

## 🔒 Security Notes

- ✅ **Safe to commit:** `config.dev.json`, `configCommands.dev.json` (template values)
- ❌ **Never commit:** `account.dev.txt`, `account.dev.json` (contains sensitive data)
- ❌ **Never commit:** Original `config.json`, `account.txt` (may contain secrets)

## 🚀 After Configuration

Once you've configured everything:

1. **Restart your Render service**
2. **Check the logs** for any errors
3. **Test your bot** in Facebook Messenger
4. **Set up UptimeRobot** (see `UPTIMEROBOT_SETUP.md`) to keep it online 24/7

## 📚 Related Files

- `RENDER_DEPLOYMENT.md` - Full deployment guide
- `UPTIMEROBOT_SETUP.md` - Keep bot online 24/7
- `config.json` - Development config (reference)
- `configCommands.json` - Development commands config (reference)

## 🆘 Troubleshooting

### Error: "Invalid JSON file"
- Check that `config.dev.json` and `configCommands.dev.json` are valid JSON
- Verify they exist in your repository
- Check Render logs for specific JSON errors

### Bot won't login
- Verify `account.dev.txt` exists on Render
- Check Facebook credentials in `config.dev.json`
- Ensure cookies are in correct format (JSON)

### Dashboard not accessible
- Check that `dashBoard.enable` is `true` in `config.dev.json`
- Verify port configuration (Render sets `PORT` automatically)
- Check Render logs for port binding errors

