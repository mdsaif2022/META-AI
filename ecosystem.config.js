// PM2 Ecosystem Configuration for META AI Bot
// Usage: pm2 start ecosystem.config.js

module.exports = {
  apps: [{
    name: 'meta-ai-bot',
    script: 'index.js',
    cwd: './',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      GROQ_API_KEY: process.env.GROQ_API_KEY || '',
      GEMINI_API_KEY: process.env.GEMINI_API_KEY || '',
      OPENAI_API_KEY: process.env.OPENAI_API_KEY || ''
    },
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_file: './logs/pm2-combined.log',
    time: true,
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',
    max_memory_restart: '500M',
    watch: false,
    ignore_watch: ['node_modules', 'logs', 'database/data'],
    merge_logs: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};

