const worldGenerator = require('./world-generator');
const areaLayouts = require('../data/area-layouts.json');

const maxWorldSize = 100;
const defaultWorldSize = 5;

const bound = (value, min, max) => {
    return Math.min(max, Math.max(min, value));
};

const generateWorld = (req, res) => {
    const seed = req.params.seed || false;
    const width = bound(req.params.width, 0, maxWorldSize);
    const height = bound(req.params.height, 0, maxWorldSize);
    const world = worldGenerator.create(width, height, seed);

    res.jsonp(world);
};

const compass = ['NW', 'NE', 'SW', 'SE'];

const generateArea = (req, res) => {
    const areaCode = req.params.areaCode || 'GGGG';
    const compassMap = areaCode.split('').reduce((map, item, index) => {
        const direction = compass[index];
        map[direction] = item;
        return map;
    }, {});

    var tiles = areaLayouts.layouts[areaCode] || '';
    Object.keys(compassMap).forEach((direction) => {
        tiles = tiles.replace(new RegExp(direction, 'g'), compassMap[direction]);
    });

    const dimensions = areaLayouts.dimensions;
    const area = {
        tiles,
        dimensions,
        items: []
    };

    res.jsonp(area);
};

module.exports = {
    generateWorld,
    generateArea
};