const fs = require('fs');
const path = require('path');
const { createWriteStream } = require('fs');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = createWriteStream(path.join(logDirectory, 'access.log'), { flags: 'a' });

const development = {
    name: 'development',
    asset_path: 'assets',
    session_cookie_key: 'placement-cell',
    db: 'placement_development',
    morgan: {
        mode: 'dev',
        options: { stream: accessLogStream },
    },
};

const production = {
    name: 'production',
    asset_path: process.env.ASSET_PATH,
    session_cookie_key: process.env.SESSION_COOKIE_KEY,
    db: process.env.DB,
    morgan: {
        mode: 'combined',
        options: { stream: accessLogStream },
    },
};

module.exports = process.env.PLACEMENT_ENVIRONMENT === 'production' ? production : development;
