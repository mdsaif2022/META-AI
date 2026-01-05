// Script to create account.dev.txt file if it doesn't exist
// This is run during build on Render (free tier doesn't have Shell access)
// If ACCOUNT_COOKIES environment variable is set, it will be written to the file

const fs = require('fs-extra');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || '';
const isProduction = ['production', 'development'].includes(NODE_ENV);
const accountFileName = isProduction ? 'account.dev.txt' : 'account.txt';
const accountFilePath = path.join(__dirname, accountFileName);

// Check if ACCOUNT_COOKIES environment variable is set (from Render dashboard)
const accountCookies = process.env.ACCOUNT_COOKIES || '';

if (accountCookies) {
  // Write the cookies from environment variable
  console.log(`Creating ${accountFileName} from ACCOUNT_COOKIES environment variable...`);
  fs.writeFileSync(accountFilePath, accountCookies.trim(), 'utf8');
  console.log(`✅ Created ${accountFileName} with cookies from environment variable`);
} else if (!fs.existsSync(accountFilePath)) {
  // Create empty account.dev.txt file if it doesn't exist
  console.log(`Creating empty ${accountFileName} file...`);
  fs.writeFileSync(accountFilePath, '', 'utf8');
  console.log(`✅ Created empty ${accountFileName} file`);
  console.log(`ℹ️  To add Facebook cookies, set ACCOUNT_COOKIES environment variable in Render dashboard`);
} else {
  console.log(`✅ ${accountFileName} already exists`);
}

