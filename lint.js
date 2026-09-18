const { execFileSync } = require('child_process');
const path = require('path');

const bin = path.resolve('node_modules/.bin/eslint');
try {
  execFileSync(bin, ['.', '--ext', '.js,.jsx,.ts,.tsx', '--max-warnings', '9999'], { stdio: 'inherit' });
} catch (e) {
  process.exit(e.status || 0);
}

