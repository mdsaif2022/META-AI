// Script to create account.dev.txt file if it doesn't exist
// This is run during build and before start on Render (free tier doesn't have Shell access)
// If ACCOUNT_COOKIES environment variable is set, it will be written to the file

const fs = require('fs-extra');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || '';
const isProduction = ['production', 'development'].includes(NODE_ENV);
const accountFileName = isProduction ? 'account.dev.txt' : 'account.txt';
const accountFilePath = path.join(__dirname, accountFileName);

// Check if ACCOUNT_COOKIES environment variable is set (from Render dashboard)
const accountCookies = process.env.ACCOUNT_COOKIES || '';

console.log(`[create-account-file] NODE_ENV: ${NODE_ENV}`);
console.log(`[create-account-file] Account file: ${accountFileName}`);
console.log(`[create-account-file] ACCOUNT_COOKIES set: ${accountCookies ? 'YES (' + accountCookies.length + ' chars)' : 'NO'}`);

if (accountCookies && accountCookies.trim()) {
  // Write the cookies from environment variable (overwrite if exists)
  console.log(`[create-account-file] Creating ${accountFileName} from ACCOUNT_COOKIES environment variable...`);
  fs.writeFileSync(accountFilePath, accountCookies.trim(), 'utf8');
  const fileSize = fs.statSync(accountFilePath).size;
  console.log(`✅ Created ${accountFileName} with cookies from environment variable (${fileSize} bytes)`);
} else if (!fs.existsSync(accountFilePath)) {
  // Create empty account.dev.txt file if it doesn't exist
  console.log(`[create-account-file] Creating empty ${accountFileName} file...`);
  fs.writeFileSync(accountFilePath, '', 'utf8');
  console.log(`✅ Created empty ${accountFileName} file`);
  console.log(`ℹ️  To add Facebook cookies, set ACCOUNT_COOKIES environment variable in Render dashboard`);
} else {
  const fileSize = fs.statSync(accountFilePath).size;
  if (fileSize === 0) {
    console.log(`⚠️  ${accountFileName} exists but is empty. Set ACCOUNT_COOKIES environment variable in Render dashboard to add cookies.`);
  } else {
    console.log(`✅ ${accountFileName} already exists (${fileSize} bytes)`);
  }
}

