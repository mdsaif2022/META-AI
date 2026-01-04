# Deploying Goat Bot V2 on Render

This guide will help you deploy your META AI Bot (Goat Bot V2) on Render.

## ⚠️ Important Limitations

**Free Tier Limitation**: Render's free tier web services will **sleep after 15 minutes of inactivity**. This means your bot will not stay online 24/7 on the free tier. For 24/7 uptime, you'll need to:
- Upgrade to a paid plan ($7/month for starter)
- Use alternative free hosting like Railway, Fly.io, or Replit
- Use a paid VPS like DigitalOcean, Vultr, or AWS

## Prerequisites

1. A [Render account](https://render.com) (free tier available)
2. Your bot code in a Git repository (GitHub, GitLab, or Bitbucket)
3. Your Facebook account credentials (email/password or cookies in `account.txt`)
4. Configuration files (`config.json` and `configCommands.json`)

## Step 1: Prepare Your Repository

1. **Push your code to GitHub/GitLab/Bitbucket**
   - Make sure your `Goat-Bot-V2` folder is in the repository
   - Commit all necessary files

2. **Prepare configuration files for production:**
   - The bot uses `config.dev.json` and `configCommands.dev.json` when `NODE_ENV=production`
   - Copy your `config.json` to `config.dev.json`:
     ```bash
     cp config.json config.dev.json
     cp configCommands.json configCommands.dev.json
     ```
   - Copy your `account.txt` to `account.dev.txt`:
     ```bash
     cp account.txt account.dev.txt
     ```

3. **Configure your bot settings** in `config.dev.json`:
   - Set up your Facebook account credentials
   - Configure database (SQLite works, but MongoDB is recommended for production)
   - Set dashboard port (Render will assign a port via `PORT` env var)

## Step 2: Deploy on Render

### Option A: Using render.yaml (Recommended)

1. **Connect your repository to Render:**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Blueprint"
   - Connect your Git repository
   - Render will detect `render.yaml` automatically

2. **Configure environment variables:**
   - Go to your service settings
   - Navigate to "Environment" tab
   - Add any API keys you need:
     - `GROQ_API_KEY` (if using Groq AI)
     - `OPENAI_API_KEY` (if using OpenAI)
     - `GEMINI_API_KEY` (if using Gemini AI)
     - `MONGODB_URI` (if using MongoDB instead of SQLite)
     - Any other environment variables your bot needs

3. **Deploy:**
   - Render will automatically deploy when you connect the repository
   - Watch the build logs for any errors

### Option B: Manual Setup

1. **Create a new Web Service:**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your Git repository

2. **Configure the service:**
   - **Name:** `goat-bot-v2` (or your preferred name)
   - **Region:** Choose closest to you
   - **Branch:** `main` (or your default branch)
   - **Root Directory:** `Goat-Bot-V2` (if your bot is in a subfolder)
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
   - **Plan:** Free (or Starter for 24/7 uptime)

3. **Set Environment Variables:**
   - Click "Environment" tab
   - Add:
     ```
     NODE_ENV=production
     ```
   - Add any API keys as needed (see Option A above)

4. **Advanced Settings (Optional):**
   - **Health Check Path:** `/` (if your dashboard is enabled)
   - **Auto-Deploy:** `Yes` (to deploy on git push)

5. **Create and Deploy:**
   - Click "Create Web Service"
   - Render will start building and deploying

## Step 3: Configure Your Bot

1. **Upload configuration files:**
   - Since Render uses ephemeral file systems, you need to ensure your config files are in the repository
   - **⚠️ IMPORTANT:** Never commit sensitive data like passwords or API keys directly to Git
   - Use environment variables for sensitive data when possible
   - For `account.txt`, you may need to set it up after deployment using Render's shell or by modifying the code to read from environment variables

2. **Update config.json for Render:**
   - If using MongoDB, set the connection string via `MONGODB_URI` environment variable
   - Dashboard port: Render will set `PORT` environment variable, but your bot uses port 3001 by default
   - You may need to modify the dashboard code to use `process.env.PORT || 3001`

## Step 4: Keep Your Bot Online (Free Tier Workaround)

Since Render's free tier sleeps after inactivity, you can:

1. **Enable Auto-Uptime (if available):**
   - In `config.json`, set:
     ```json
     "autoUptime": {
       "enable": true,
       "timeInterval": 180,
       "url": "https://your-app-name.onrender.com"
     }
     ```
   - This will ping your service every 3 minutes to keep it awake

2. **Use an external uptime monitor:**
   - Services like [UptimeRobot](https://uptimerobot.com) (free tier available)
   - Set it to ping your Render URL every 5-10 minutes

## Step 5: Monitor Your Deployment

1. **Check Logs:**
   - Go to your service on Render Dashboard
   - Click "Logs" tab to see real-time logs
   - Watch for startup errors or connection issues

2. **Verify Bot is Running:**
   - Check logs for successful login messages
   - Test bot commands in your Facebook Messenger

## Troubleshooting

### Bot won't start
- Check logs for errors
- Verify all configuration files exist (`config.dev.json`, `configCommands.dev.json`, `account.dev.txt`)
- Ensure Node.js version is compatible (package.json specifies 16.x, but check Render's available versions)

### Bot goes to sleep (Free Tier)
- This is expected behavior on free tier
- Use an uptime monitor or upgrade to paid plan

### Database errors
- If using SQLite: Ensure the database file path is writable (use absolute paths or `__dirname`)
- If using MongoDB: Verify `MONGODB_URI` environment variable is set correctly

### Port conflicts
- Render sets `PORT` environment variable automatically
- Update dashboard code to use `process.env.PORT || 3001` if needed

### Build failures
- Check that all dependencies in `package.json` are valid
- Verify Node.js version compatibility
- Check build logs for specific errors

## Additional Notes

- **File System:** Render uses ephemeral file systems - files written at runtime may be lost on restart
- **SQLite Database:** For production, consider using MongoDB instead as SQLite files may not persist reliably
- **Secrets:** Never commit API keys or passwords to Git - use Render's environment variables
- **Updates:** Render auto-deploys on git push if enabled - make sure your commits don't break the deployment

## Alternative Hosting Options

If Render's free tier limitations are an issue, consider:
- **Railway** - Free tier with $5 monthly credit
- **Fly.io** - Generous free tier
- **Replit** - Free tier available
- **Heroku** - Paid only now, but has free alternatives
- **DigitalOcean App Platform** - Paid, but reliable
- **VPS** (DigitalOcean, Vultr, AWS Lightsail) - Full control, paid

## Support

For issues specific to:
- **Render deployment:** Check [Render Docs](https://render.com/docs)
- **Bot functionality:** Check the main README.md and DOCS.md files
- **Configuration:** Review config.json comments and STEP_INSTALL.md

