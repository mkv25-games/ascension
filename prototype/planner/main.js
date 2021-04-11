var packageInfo = require('./package.json');

console.log('Available commands:')
Object.keys(packageInfo.scripts).forEach((script) => {
    if (script === 'start') return;
    console.log(` - npm run ${script}`);
});