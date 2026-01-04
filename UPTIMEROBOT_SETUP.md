# How to Use UptimeRobot to Keep Your Bot Online

UptimeRobot is a free monitoring service that can ping your Render deployment every 5 minutes to prevent it from going to sleep. This guide will walk you through setting it up.

## Why Use UptimeRobot?

Render's free tier services **sleep after 15 minutes of inactivity**. UptimeRobot will ping your service every 5 minutes, keeping it active 24/7 on the free tier.

**Free Tier:** UptimeRobot free tier includes:
- 50 monitors
- 5-minute monitoring intervals
- Email/SMS alerts (paid plans for more features)

## Step-by-Step Setup

### Step 1: Deploy Your Bot on Render First

1. Make sure your bot is deployed on Render
2. Get your Render service URL (e.g., `https://your-bot-name.onrender.com`)
3. Test that the URL is accessible in your browser

**Note:** Your bot needs to respond to HTTP requests. Since your bot has a dashboard enabled (port 3001), you can:
- Use the dashboard URL if it's publicly accessible
- Or create a simple health check endpoint (see below)

### Step 2: Create UptimeRobot Account

1. Go to [UptimeRobot.com](https://uptimerobot.com)
2. Click **"Sign Up"** (top right)
3. Fill in:
   - Email address
   - Password
   - Confirm password
4. Click **"Create Account"**
5. Verify your email address (check your inbox)

### Step 3: Add a Monitor

1. **Log in** to UptimeRobot dashboard
2. Click the **"+ Add New Monitor"** button (green button, top right)

3. **Configure the monitor:**

   **Monitor Type:**
   - Select **"HTTP(s)"**

   **Friendly Name:**
   - Enter: `Goat Bot V2` (or any name you prefer)

   **URL (or IP):**
   - **Recommended:** `https://your-bot-name.onrender.com/uptime`
     - This uses your bot's built-in uptime endpoint (best for monitoring)
   - **Alternative:** `https://your-bot-name.onrender.com`
     - This uses the root URL (dashboard login page)
   - **Important:** 
     - Use `https://` not `http://`
     - Replace `your-bot-name` with your actual Render service name

   **Monitoring Interval:**
   - Select **5 minutes** (free tier minimum)
   - This means UptimeRobot will ping your service every 5 minutes

4. Click **"Create Monitor"**

### Step 4: Verify It's Working

1. After creating the monitor, you'll see it in your dashboard
2. Wait a few minutes and check the status
3. The status should show:
   - **✓ (green checkmark)** = Online/Up
   - **✗ (red X)** = Down/Offline

4. **Check the logs:**
   - Click on your monitor name
   - View the "Response Times" and "Logs" tabs
   - You should see successful pings every 5 minutes

### Step 5: Optional - Configure Alerts

1. Go to **"My Settings"** → **"Alert Contacts"**
2. Click **"Add Alert Contact"**
3. Choose notification method:
   - **Email** (free)
   - **SMS** (requires paid plan)
   - **Slack/Discord** (paid plan)
4. Add your email address
5. Go back to your monitor → **"Edit"** → Select your alert contact
6. Save changes

Now you'll receive email notifications if your service goes down.

## Important Notes

### Your Bot Has Built-in Endpoints!

Your bot already has a dashboard that responds to HTTP requests. Since your dashboard is enabled, you can use these endpoints:

#### Option 1: Use the `/uptime` Endpoint (Recommended) ✅

Your bot has a built-in `/uptime` endpoint specifically designed for monitoring!

**URL to use:** `https://your-bot-name.onrender.com/uptime`

This endpoint is perfect for UptimeRobot because:
- It's designed for health checks
- It doesn't require authentication
- It returns bot status information

#### Option 2: Use the Root URL

You can also use the root URL: `https://your-bot-name.onrender.com`

This will show your dashboard login page, which still counts as a successful HTTP response for UptimeRobot.

**Note:** Make sure your dashboard is enabled in `config.json`:
```json
"dashBoard": {
  "enable": true,
  "port": 3001
}
```

⚠️ **Important:** The dashboard code uses port 3001 from config, but Render assigns a dynamic PORT. You may need to update the dashboard code to use `process.env.PORT` for Render. However, if your service starts successfully, the root URL should still work.

### Render URL Format

Your Render service URL will be:
- `https://your-service-name.onrender.com`
- Or a custom domain if you've configured one

**To find your URL:**
1. Go to Render Dashboard
2. Click on your service
3. Find the URL in the service details (top of the page)

### Testing Your URL

Before adding to UptimeRobot, test in your browser:
1. Open your Render URL in a browser
2. You should see:
   - Your dashboard (if enabled), OR
   - A response (even if it's an error page)
   - **Not** a "Connection refused" error

If you get "Connection refused", your service might not be listening on the correct port.

## Troubleshooting

### Monitor Shows "Down" Status

1. **Check Render logs:**
   - Go to Render Dashboard → Your Service → Logs
   - Look for errors or startup issues

2. **Verify URL is correct:**
   - Test the URL in your browser
   - Make sure it starts with `https://`

3. **Check if service is running:**
   - Render services might take a minute to wake up
   - Free tier services sleep after 15 minutes, so first ping might be slow

4. **Verify port configuration:**
   - Render sets `PORT` environment variable
   - Your bot should use `process.env.PORT || 3001`

### Service Goes to Sleep Anyway

- UptimeRobot pings every 5 minutes, which should keep it alive
- If it still sleeps, check:
  - Monitor status in UptimeRobot (should show "Up")
  - Render logs for restart messages
  - Response times in UptimeRobot (should be < 5 seconds)

### Too Many Pings / Rate Limits

- UptimeRobot free tier allows 5-minute intervals (minimum)
- This is perfect for keeping Render services alive
- Render free tier can handle this frequency

## Alternative: Use Render's Auto-Uptime Feature

Your bot also has a built-in auto-uptime feature. In `config.json`:

```json
"autoUptime": {
  "enable": true,
  "timeInterval": 180,
  "url": "https://your-bot-name.onrender.com"
}
```

**Note:** This requires your bot to be running first, so it's better to use UptimeRobot which works independently.

## Summary

1. ✅ Deploy bot on Render
2. ✅ Get your Render service URL
3. ✅ Sign up for UptimeRobot (free)
4. ✅ Add HTTP(s) monitor with 5-minute interval
5. ✅ Verify monitor shows "Up" status
6. ✅ Your bot stays online 24/7! 🎉

## Additional Resources

- [UptimeRobot Documentation](https://uptimerobot.com/help/)
- [UptimeRobot Pricing](https://uptimerobot.com/pricing/) (free tier is sufficient)
- [Render Documentation](https://render.com/docs)

