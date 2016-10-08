const path = require('path');
const run = require('promise-path').run;

const os = (/^win/.test(process.platform)) ? 'windows' : false;
const IMAGE_MAGICK_PATHS = {
    'windows': 'C:/PROGRA~2/IMAGEM~1.7-0/',
    'default': ''
};
const imageMagickPath = IMAGE_MAGICK_PATHS[os || 'default'];

function prepare(command) {
    return `${imageMagickPath}${command}`;
}

function logRun(message) {
    if(message.stderr) {
        console.error(message.stderr);
    }
    if(message.stdout) {
        console.log(message.stdout);
    }
    return Promise.accept(message);
}

function walk(command) {
    console.log('Walking', command);

    const imageMagickCommand = prepare(command);
    console.log('', imageMagickCommand);

    return run(imageMagickCommand).then(logRun);
}

module.exports = walk;