const path = require('path');
const walk = require('./lib/walk');
const tileTypes = require('./lib/tile-types');
const terrainPath = path.resolve(path.join(__dirname, '../images/terrain'));

// Define something to do
const type = tileTypes[0];

const commands = tileTypes.map(prepareMergeCommand);

function prepareMergeCommand(type) {
    return `convert ${terrainPath}/${type.name}-tiles.png -crop 32x32 +repage +adjoin ${terrainPath}/${type.folder}/${type.key}-%02d.png`;
}

function walkAll(commands) {
    return commands.map(command => walk(command));
};

Promise.all(walkAll(commands))
    .catch((ex) => {
        console.error('Unable to process images', ex);
    });