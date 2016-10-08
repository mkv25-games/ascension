const path = require('path');
const walk = require('./lib/walk');
const terrainPath = path.resolve(path.join(__dirname, '../images/terrain'));

// Define something to do
const type = {
    name: 'FOREST',
    key: 'F',
    folder: 'forest'
};
const split = `convert ${terrainPath}/${type.name}-tiles.png -crop 32x32 +repage +adjoin ${terrainPath}/${type.folder}/${type.key}-%02d.png`;

// Do something useful
walk(split)
    .catch((ex) => {
    console.error('Unable to process images', ex);
});