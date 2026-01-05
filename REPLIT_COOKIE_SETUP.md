# How to Use Cookies in Replit - Direct account.txt Method

## Quick Setup: Using account.txt File Directly

Instead of using environment variables, you can directly edit the `account.txt` file in Replit with your Facebook cookies.

## Method 1: Cookie String Format (Easiest)

### Step 1: Get Your Facebook Cookies

1. **Open Facebook** in your browser and log in
2. **Press F12** to open Developer Tools
3. **Go to Network tab**
4. **Refresh the page** (F5)
5. **Click on any request** (like `home.php` or `feed.php`)
6. **In Headers tab**, scroll to **Request Headers**
7. **Find "Cookie:"** header
8. **Copy the entire cookie string** (it's all on one line)

Example cookie string:
```
ps_l=1;datr=7T_laMHFt4viusQXYJGM0In7;fr=1GHsjF7Jy9E9p5hEj.AWe_Evrlfd0MxDewyXTTeTJ-_XXCoRmNDMyOlD4r3RKiyHVMejA.BpW7Ad..AAA.0.0.BpW7Ad.AWdXoFG86fM4vuUh25Yorrl2NyM;xs=42%3AXLL5e_tVJjtm9w%3A2%3A1767389685%3A-1%3A-1%3A%3AAcxYyeF2ZNnb7gwUe33jZjdRjglTdbSd-HL8euVykj0;c_user=61578862442722;presence=C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1767616541081%2C%22v%22%3A1%7D;dpr=2;oo=v1;ps_n=1;sb=7T_laC8F-A3SHbawXLVyqshl;wd=320x615
```

### Step 2: Create/Edit account.txt in Replit

1. In Replit, **create a new file** called `account.txt` (or edit existing one)
2. **Paste your cookie string** directly into the file
3. **Save the file**

That's it! The bot will automatically detect and use cookies from `account.txt`.

### Step 3: Restart the Bot

Click **"Run"** or run:
```bash
npm start
```

## Method 2: JSON Array Format

If you have cookies as JSON array, you can also use that format:

1. **Get cookies as JSON** (using browser extension or manual conversion)
2. **Create `account.txt`** in Replit
3. **Paste JSON array**:

```json
[
  {"name": "ps_l", "value": "1", "domain": ".facebook.com"},
  {"name": "datr", "value": "7T_laMHFt4viusQXYJGM0In7", "domain": ".facebook.com"},
  {"name": "fr", "value": "1GHsjF7Jy9E9p5hEj...", "domain": ".facebook.com"},
  {"name": "xs", "value": "42%3AXLL5e_tVJjtm9w...", "domain": ".facebook.com"},
  {"name": "c_user", "value": "61578862442722", "domain": ".facebook.com"}
]
```

4. **Save and restart bot**

## Method 3: Using Environment Variable (Alternative)

You can also use the `ACCOUNT_COOKIES` environment variable:

1. In Replit, click **Secrets** (lock icon)
2. Add:
   - **Key**: `ACCOUNT_COOKIES`
   - **Value**: Your cookie string (same format as Method 1)
3. **Save**
4. The bot will automatically create `account.txt` from this variable

## Which Method to Use?

- **Method 1 (account.txt with cookie string)**: ✅ **Recommended** - Simplest, works immediately
- **Method 2 (account.txt with JSON)**: Works if you have JSON format
- **Method 3 (Environment variable)**: Good if you want to keep cookies in Secrets

## File Location

The `account.txt` file should be in the **root directory** of your Repl:
```
/home/runner/workspace/account.txt
```

Or if you set Root Directory to `Goat-Bot-V2`:
```
/home/runner/workspace/Goat-Bot-V2/account.txt
```

## Verify It's Working

After setting up cookies, check the logs:

```
✅ account.txt already exists and matches ACCOUNT_COOKIES
✅ Parsed 11 cookies: ps_l, datr, fr, xs, c_user, ...
✅ Cookie validation passed (or will try anyway)
✅ Bot successfully logged in
```

## Important Notes

- **Cookies Expire**: Facebook cookies typically expire after 1-3 months
- **Get Fresh Cookies**: When cookies expire, get new ones and update `account.txt`
- **Security**: Never share your cookies publicly - they give full access to your account
- **Required Cookies**: Make sure you include `c_user`, `xs`, `datr`, `fr`, `sb` at minimum

## Troubleshooting

**Problem**: Bot says "Account file not found"
- **Solution**: Make sure `account.txt` is in the correct directory (check with `ls -la account.txt`)

**Problem**: Bot says "Invalid JSON" or "Cookie is invalid"
- **Solution**: 
  - Check cookie format (should be `key=value;key2=value2;...`)
  - Make sure cookies are fresh (not expired)
  - Verify all required cookies are included

**Problem**: Bot still tries email/password
- **Solution**: 
  - Make sure `account.txt` has content (not empty)
  - Check file is saved correctly
  - Restart the bot after updating file

## Quick Copy-Paste Template

For `account.txt` file, paste this format (replace with your actual cookies):

```
ps_l=1;datr=YOUR_DATR;fr=YOUR_FR;xs=YOUR_XS;c_user=YOUR_C_USER;presence=YOUR_PRESENCE;dpr=2;oo=v1;ps_n=1;sb=YOUR_SB;wd=320x615
```

Replace `YOUR_*` with actual cookie values from your browser.

---

**Made with ❤️ by [saif vaiya](https://github.com/mdsaif2022)**

