# Deploying META AI Bot on cPanel

This guide will help you deploy and run the META AI Bot on your cPanel subdomain.

## Prerequisites

- cPanel hosting with Node.js support (Node.js Selector)
- SSH access (recommended) or Terminal access in cPanel
- Your Facebook `account.txt` file ready

## Method 1: Using cPanel Node.js Selector (Easiest)

### Step 1: Upload Files

1. **Access cPanel File Manager**
   - Log into your cPanel
   - Navigate to **File Manager**
   - Go to your subdomain directory (usually `public_html/subdomain` or `subdomain.yourdomain.com`)

2. **Upload Bot Files**
   - Upload all files from the `Goat-Bot-V2` folder to your subdomain directory
   - Make sure `package.json`, `index.js`, and all other files are uploaded

### Step 2: Setup Node.js Application

1. **Open Node.js Selector**
   - In cPanel, find **"Node.js Selector"** or **"Setup Node.js App"**
   - Click **"Create Application"**

2. **Configure Application**
   - **Node.js Version**: Select `22.x` (required by ws3-fca) or latest available
   - **Application Mode**: `Production`
   - **Application Root**: `/home/username/subdomain` (your subdomain path)
   - **Application URL**: Your subdomain URL
   - **Application Startup File**: `index.js`
   - **Application Entry Point**: `index.js`

3. **Set Environment Variables**
   - Click on your application
   - Add environment variables:
     ```
     NODE_ENV=production
     GROQ_API_KEY=your_groq_api_key_here
     GEMINI_API_KEY=your_gemini_api_key_here
     OPENAI_API_KEY=your_openai_api_key_here (optional)
     ```

4. **Install Dependencies**
   - In the Node.js app interface, click **"Run NPM Install"**
   - Or use Terminal/SSH: `npm install --legacy-peer-deps`

5. **Start Application**
   - Click **"Start App"** or **"Restart App"**

## Method 2: Using SSH/Terminal (More Control)

### Step 1: Access Terminal

1. **SSH Access**
   - Use an SSH client (PuTTY, Terminal, etc.)
   - Connect to your server: `ssh username@yourdomain.com`

2. **Or cPanel Terminal**
   - In cPanel, find **"Terminal"** or **"SSH Access"**
   - Open terminal

### Step 2: Navigate to Your Subdomain Directory

```bash
cd ~/public_html/subdomain
# Or wherever your subdomain files are located
cd ~/subdomain.yourdomain.com
```

### Step 3: Upload Files (if not done)

If you haven't uploaded files yet:
- Use `scp` or `rsync` to upload files
- Or use cPanel File Manager to upload, then navigate to the directory

### Step 4: Install Node.js (if not available)

```bash
# Check Node.js version
node -v

# If Node.js is not installed, install via cPanel Node.js Selector first
```

### Step 5: Install Dependencies

```bash
# Install npm dependencies
npm install --legacy-peer-deps

# Note: Canvas may fail to build, but bot will still work
```

### Step 6: Setup Environment Variables

Create a `.env` file (optional, or use cPanel environment variables):

```bash
nano .env
```

Add:
```
NODE_ENV=production
GROQ_API_KEY=your_groq_api_key
GEMINI_API_KEY=your_gemini_api_key
```

### Step 7: Run Bot with PM2 (Recommended for 24/7 operation)

**Install PM2:**
```bash
npm install -g pm2
```

**Start Bot:**
```bash
pm2 start index.js --name "meta-ai-bot"
```

**Save PM2 Configuration:**
```bash
pm2 save
pm2 startup  # Follow instructions to enable auto-start on server reboot
```

**PM2 Useful Commands:**
```bash
pm2 list              # View running processes
pm2 logs meta-ai-bot  # View logs
pm2 restart meta-ai-bot  # Restart bot
pm2 stop meta-ai-bot     # Stop bot
pm2 delete meta-ai-bot   # Remove from PM2
```

### Step 8: Run Bot with nohup (Alternative to PM2)

```bash
# Start bot in background
nohup node index.js > bot.log 2>&1 &

# View logs
tail -f bot.log

# Stop bot (find process ID first)
ps aux | grep node
kill <process_id>
```

## Method 3: Using Forever (Another Process Manager)

```bash
# Install forever
npm install -g forever

# Start bot
forever start index.js

# View logs
forever logs

# Stop bot
forever stop index.js
```

## Important Files to Configure

### 1. account.txt
- Place your Facebook `account.txt` file in the bot directory
- Make sure it's readable: `chmod 644 account.txt`

### 2. config.json
- The bot will use `config.json` or `config.dev.json` (if NODE_ENV=production)
- Make sure it's properly configured

### 3. Environment Variables
Set these in cPanel Node.js Selector or via `.env` file:
- `NODE_ENV=production`
- `GROQ_API_KEY` (your Groq API key)
- `GEMINI_API_KEY` (your Gemini API key)
- `OPENAI_API_KEY` (optional, if using OpenAI)

## Troubleshooting

### Bot Not Starting

1. **Check Logs:**
   ```bash
   pm2 logs meta-ai-bot
   # Or
   tail -f bot.log
   ```

2. **Check Node.js Version:**
   ```bash
   node -v  # Should be 22.x or higher
   ```

3. **Check Dependencies:**
   ```bash
   npm list --depth=0
   ```

4. **Check File Permissions:**
   ```bash
   chmod 755 index.js
   chmod 644 account.txt
   chmod 644 config.json
   ```

### Bot Keeps Crashing

1. **Use PM2 with Auto-Restart:**
   ```bash
   pm2 start index.js --name "meta-ai-bot" --max-restarts 10
   ```

2. **Check Memory Usage:**
   ```bash
   pm2 monit
   ```

3. **Increase Node.js Memory (if needed):**
   ```bash
   pm2 start index.js --name "meta-ai-bot" --max-memory-restart 500M
   ```

### Canvas Build Errors

Canvas may fail to build on some servers. This is OK - the bot will still work, but commands requiring canvas (like `rank`, `weather`) won't function.

To skip canvas installation:
```bash
npm install --legacy-peer-deps --ignore-scripts
```

## Keeping Bot Running 24/7

### Option 1: PM2 (Recommended)
```bash
pm2 save
pm2 startup
# Follow the instructions to enable auto-start
```

### Option 2: Cron Job
Add to crontab (`crontab -e`):
```bash
@reboot cd /home/username/subdomain && node index.js > bot.log 2>&1 &
```

### Option 3: cPanel Cron Jobs
1. Go to **Cron Jobs** in cPanel
2. Add a new cron job:
   - **Minute**: `*/5` (check every 5 minutes)
   - **Command**: 
     ```bash
     cd /home/username/subdomain && pm2 restart meta-ai-bot || pm2 start index.js --name meta-ai-bot
     ```

## Security Notes

1. **Don't expose account.txt publicly**
   - Make sure it's not in a web-accessible directory
   - Use proper file permissions: `chmod 600 account.txt`

2. **Use Environment Variables for API Keys**
   - Don't hardcode API keys in files
   - Use cPanel environment variables or `.env` file

3. **Firewall**
   - The bot doesn't need incoming ports (it connects to Facebook)
   - Only outbound HTTPS connections are needed

## Monitoring

### View Real-time Logs
```bash
pm2 logs meta-ai-bot --lines 100
```

### Check Bot Status
```bash
pm2 status
```

### View Resource Usage
```bash
pm2 monit
```

## Updating the Bot

1. **Stop Bot:**
   ```bash
   pm2 stop meta-ai-bot
   ```

2. **Backup:**
   ```bash
   cp -r . ../backup-$(date +%Y%m%d)
   ```

3. **Update Files:**
   - Upload new files via cPanel File Manager or git pull

4. **Update Dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

5. **Restart:**
   ```bash
   pm2 restart meta-ai-bot
   ```

## Support

If you encounter issues:
1. Check the logs first
2. Verify Node.js version (22.x required)
3. Ensure all dependencies are installed
4. Check file permissions
5. Verify environment variables are set correctly

