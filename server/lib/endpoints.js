const worldGenerator = require('./world-generator');

const maxWorldSize = 50;
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

module.exports = {
    generateWorld
};