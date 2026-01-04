// Script to create account.dev.txt file if it doesn't exist
// This is run during build on Render (free tier doesn't have Shell access)

const fs = require('fs-extra');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV || '';
const isProduction = ['production', 'development'].includes(NODE_ENV);
const accountFileName = isProduction ? 'account.dev.txt' : 'account.txt';
const accountFilePath = path.join(__dirname, accountFileName);

// Create empty account.dev.txt file if it doesn't exist
if (!fs.existsSync(accountFilePath)) {
  console.log(`Creating ${accountFileName} file...`);
  fs.writeFileSync(accountFilePath, '', 'utf8');
  console.log(`✅ Created ${accountFileName} file`);
} else {
  console.log(`✅ ${accountFileName} already exists`);
}

