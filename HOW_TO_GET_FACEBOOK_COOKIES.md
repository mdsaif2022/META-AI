# How to Get Facebook Cookies for Render Environment Variable

## Method 1: Using Browser Developer Tools (Easiest)

### Chrome/Edge:
1. **Open Facebook** in your browser and log in
2. **Press F12** (or Right-click → Inspect)
3. **Go to "Application" tab** (at the top)
4. **In the left sidebar**, expand **"Cookies"**
5. **Click on `https://www.facebook.com`**
6. **Look for these important cookies:**
   - `c_user` (your user ID)
   - `xs` (session token)
   - `datr` (device token)
   - `sb` (session browser)
   - `fr` (Facebook referrer)
   - `ps_l`, `ps_n`, `oo`, etc.

7. **Copy the cookie string:**
   - You can either:
     - **Option A**: Copy each cookie manually and format as: `name=value;name2=value2;...`
     - **Option B**: Use the "Network" tab method below (easier)

### Firefox:
1. **Open Facebook** in your browser and log in
2. **Press F12** (or Right-click → Inspect)
3. **Go to "Storage" tab** (at the top)
4. **In the left sidebar**, expand **"Cookies"**
5. **Click on `https://www.facebook.com`**
6. **Copy cookies** same as Chrome method

## Method 2: Using Network Tab (Recommended - Easiest)

### Chrome/Edge:
1. **Open Facebook** in your browser and log in
2. **Press F12** to open Developer Tools
3. **Go to "Network" tab**
4. **Refresh the page** (F5)
5. **Click on any request** (like `home.php` or `feed.php`)
6. **In the request details**, go to **"Headers"** tab
7. **Scroll down to "Request Headers"**
8. **Find "Cookie:"** header
9. **Copy the entire cookie string** (it's all on one line)
   - Example: `c_user=123456789;xs=abc123;datr=xyz;sb=def456;...`

### Firefox:
1. **Open Facebook** in your browser and log in
2. **Press F12** to open Developer Tools
3. **Go to "Network" tab**
4. **Refresh the page** (F5)
5. **Click on any request**
6. **In the request details**, go to **"Headers"** tab
7. **Find "Cookie:"** in Request Headers
8. **Copy the entire cookie string**

## Method 3: Using Browser Extension

You can also use a browser extension like:
- **EditThisCookie** (Chrome/Edge)
- **Cookie-Editor** (Chrome/Edge/Firefox)

These extensions let you export cookies in the format you need.

## Format for Render Environment Variable

Once you have the cookies, they should be in this format (all on one line):

```
c_user=61578862442722;xs=42%3AXLL5e_tVJjtm9w%3A2%3A1767389685%3A-1%3A-1%3A%3AAcy7UoApre8tw_mWVYytefiaUWNNrpm5-x_BFcAUVzQ;datr=7T_laMHFt4viusQXYJGM0In7;sb=7T_laC8F-A3SHbawXLVyqshl;fr=1Di5kFrBXXA27xKWO.AWdxPKRj1C9dy2NdXrGyHiPP1v1oLyP_RfJwAaAeiiFE_YwLu6o.BpW5Lp..AAA.0.0.BpW5OI.AWdDKUOqEAkVlNKRlwqjouIYYBI;ps_l=1;ps_n=1;oo=v1;...
```

**Important cookies to include:**
- `c_user` - Your Facebook user ID (required)
- `xs` - Session token (required)
- `datr` - Device token (required)
- `sb` - Session browser (required)
- `fr` - Facebook referrer (optional but recommended)
- Other cookies are optional but help with stability

## Setting in Render

1. Go to **Render Dashboard** → Your Service → **Environment** tab
2. Add environment variable:
   - **Key**: `ACCOUNT_COOKIES`
   - **Value**: Paste your cookie string (the entire line)
3. **Save** and Render will redeploy automatically

## Troubleshooting

- **Cookies expired?** Get fresh cookies from your browser
- **Still not working?** Check Render logs to see if the file was created
- **File is empty?** Make sure the environment variable is set correctly in Render

