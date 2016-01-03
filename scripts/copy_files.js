const fs = require('fs');
const path = require('path');

const TEMPLATE_PATH = path.join(process.cwd(), 'browser', 'index.html');
const DIST_TEMPLATE_PATH = path.join(process.cwd(), 'dist', 'browser', 'index.html');

fs.createReadStream(TEMPLATE_PATH).pipe(fs.createWriteStream(DIST_TEMPLATE_PATH));
