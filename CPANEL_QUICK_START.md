# Quick Start Guide: Deploy META AI Bot on cPanel

## Fastest Method (5 Steps)

### Step 1: Upload Files
1. Go to cPanel → **File Manager**
2. Navigate to your subdomain directory
3. Upload all files from `Goat-Bot-V2` folder

### Step 2: Setup Node.js App
1. In cPanel, find **"Node.js Selector"** or **"Setup Node.js App"**
2. Click **"Create Application"**
3. Configure:
   - **Node.js Version**: `22.x` (or latest)
   - **Application Root**: Your subdomain directory path
   - **Application URL**: Your subdomain URL
   - **Application Startup File**: `index.js`
4. Click **"Create"**

### Step 3: Set Environment Variables
In Node.js app settings, add:
```
NODE_ENV=production
GROQ_API_KEY=your_groq_key_here
GEMINI_API_KEY=your_gemini_key_here
```

### Step 4: Install Dependencies
1. In Node.js app, click **"Run NPM Install"**
   OR
2. Use Terminal/SSH:
   ```bash
   cd ~/your-subdomain-directory
   npm install --legacy-peer-deps
   ```

### Step 5: Start Bot
1. In Node.js app, click **"Start App"**
   OR
2. Use SSH with PM2:
   ```bash
   npm install -g pm2
   pm2 start index.js --name meta-ai-bot
   pm2 save
   ```

## Using PM2 (Recommended for 24/7)

### Install PM2
```bash
npm install -g pm2
```

### Start Bot
```bash
cd ~/your-subdomain-directory
pm2 start index.js --name meta-ai-bot
```

### Make it Auto-Start
```bash
pm2 save
pm2 startup
# Follow the instructions shown
```

### Useful PM2 Commands
```bash
pm2 list              # View all processes
pm2 logs meta-ai-bot   # View logs
pm2 restart meta-ai-bot  # Restart
pm2 stop meta-ai-bot     # Stop
pm2 monit              # Monitor resources
```

## Using the Startup Script

1. Make script executable:
   ```bash
   chmod +x start.sh
   ```

2. Run:
   ```bash
   ./start.sh
   ```

## Important Files

- `account.txt` - Your Facebook login credentials (place in bot directory)
- `config.json` - Bot configuration
- `start.sh` - Linux startup script
- `ecosystem.config.js` - PM2 configuration

## Troubleshooting

### Bot won't start
```bash
# Check logs
pm2 logs meta-ai-bot

# Check Node.js version
node -v  # Should be 22.x or higher

# Check if account.txt exists
ls -la account.txt
```

### Canvas build errors
This is normal - bot will still work. Canvas is only needed for some commands.

### Bot keeps crashing
```bash
# Use PM2 with auto-restart
pm2 start index.js --name meta-ai-bot --max-restarts 10
```

## Need Help?

1. Check `CPANEL_DEPLOYMENT.md` for detailed instructions
2. Check bot logs: `pm2 logs meta-ai-bot`
3. Verify Node.js version is 22.x or higher
4. Ensure `account.txt` file is in the bot directory

