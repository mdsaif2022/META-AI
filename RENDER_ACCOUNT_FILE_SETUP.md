# How to Set Up account.dev.txt on Render (Free Tier)

Since Render's free tier doesn't have Shell access, you can't create files manually. Instead, use **Environment Variables** in the Render dashboard.

## Step-by-Step Instructions

### 1. Get Your Facebook Cookies

1. **Open Facebook in your browser** (Chrome/Firefox/Edge)
2. **Log in to your Facebook account**
3. **Open Developer Tools**:
   - Press `F12` or `Right-click → Inspect`
   - Go to the **Application** tab (Chrome) or **Storage** tab (Firefox)
4. **Find Cookies**:
   - In the left sidebar, expand **Cookies**
   - Click on `https://www.facebook.com`
5. **Copy the cookie string**:
   - Look for cookies like: `c_user`, `xs`, `datr`, `sb`, etc.
   - Copy them in this format: `c_user=123456789;xs=abc123;datr=xyz;sb=def456;...`
   - **OR** copy the entire cookie string from your browser's network tab

### 2. Set Environment Variable in Render Dashboard

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Select your service**: `goat-bot-v2`
3. **Go to "Environment" tab** (in the left sidebar)
4. **Click "Add Environment Variable"**
5. **Set the following**:
   - **Key**: `ACCOUNT_COOKIES`
   - **Value**: Paste your Facebook cookie string here
   - **Example**: `c_user=123456789;xs=abc123def456;datr=xyz789;sb=abc123;...`
6. **Click "Save Changes"**

### 3. Redeploy

After saving the environment variable, Render will automatically redeploy your service. The `create-account-file.js` script will:
- Detect the `ACCOUNT_COOKIES` environment variable
- Create `account.dev.txt` with your cookies
- The bot will use these cookies to log in

## Alternative: Using Account File Locally

If you're running the bot locally (not on Render):

1. **Create `account.dev.txt`** in your project root (same folder as `index.js`)
2. **Paste your Facebook cookies** into the file
3. **Save the file**

The file is already in `.gitignore`, so it won't be committed to GitHub.

## Security Notes

⚠️ **IMPORTANT**:
- Never commit `account.dev.txt` to GitHub (it's in `.gitignore`)
- The `ACCOUNT_COOKIES` environment variable in Render is encrypted and secure
- Don't share your cookies with anyone
- If your cookies expire, update the environment variable in Render

## Troubleshooting

- **Bot still can't login**: 
  - Check if cookies are valid (try logging in to Facebook in your browser)
  - Make sure there are no extra spaces in the cookie string
  - Cookies expire after some time - you may need to update them

- **Environment variable not working**:
  - Make sure you saved it in Render dashboard
  - Make sure the service redeployed after adding the variable
  - Check Render logs to see if the file was created

