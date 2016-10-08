const path = require('path');
const walk = require('./lib/walk');
const terrainPath = path.resolve(path.join(__dirname, '../images/terrain'));

// Define something to do
const type = {
    name: 'FOREST',
    key: 'F',
    folder: 'forest'
};
const merge = `montage -mode concatenate -tile 16x1 ${terrainPath}/${type.folder}/${type.key}-*.png ${terrainPath}/${type.name}-tiles.png`;

// Do something useful
walk(merge)
    .catch((ex) => {
    console.error('Unable to process images', ex);
});