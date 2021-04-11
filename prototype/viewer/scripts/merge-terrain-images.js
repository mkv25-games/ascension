const path = require('path');
const walk = require('./lib/walk');
const tileTypes = require('./lib/tile-types');
const terrainPath = path.resolve(path.join(__dirname, '../images/terrain'));

// Define something to do
const type = tileTypes[0];

const commands = tileTypes.map(prepareSplitCommand);

function prepareSplitCommand(type) {
    return `montage -mode concatenate -tile 16x1 ${terrainPath}/${type.folder}/${type.key}-*.png ${terrainPath}/${type.name}-tiles.png`;
}

function walkAll(commands) {
    return commands.map(command => walk(command));
};

Promise.all(walkAll(commands))
    .catch((ex) => {
        console.error('Unable to process images', ex);
    });