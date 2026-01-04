#!/bin/bash
# META AI Bot Startup Script for cPanel/Linux

# Set environment variables (if not already set)
export NODE_ENV=${NODE_ENV:-production}

# Change to script directory
cd "$(dirname "$0")"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed or not in PATH"
    exit 1
fi

# Check Node.js version (should be 22.x or higher)
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 22 ]; then
    echo "Warning: Node.js version should be 22.x or higher (current: $(node -v))"
    echo "ws3-fca requires Node.js >=22.x"
fi

# Check if account.txt exists
if [ ! -f "account.txt" ]; then
    echo "Warning: account.txt not found. Bot may not be able to login."
fi

# Check if config files exist
if [ ! -f "config.json" ]; then
    echo "Error: config.json not found"
    exit 1
fi

# Create config.dev.json if NODE_ENV is production
if [ "$NODE_ENV" = "production" ] && [ ! -f "config.dev.json" ]; then
    if [ -f "config.json" ]; then
        cp config.json config.dev.json
        echo "Created config.dev.json from config.json"
    fi
fi

if [ "$NODE_ENV" = "production" ] && [ ! -f "configCommands.dev.json" ]; then
    if [ -f "configCommands.json" ]; then
        cp configCommands.json configCommands.dev.json
        echo "Created configCommands.dev.json from configCommands.json"
    fi
fi

# Start the bot
echo "Starting META AI Bot..."
echo "Node.js version: $(node -v)"
echo "NODE_ENV: $NODE_ENV"
echo "Working directory: $(pwd)"
echo ""

# Run the bot
node index.js

