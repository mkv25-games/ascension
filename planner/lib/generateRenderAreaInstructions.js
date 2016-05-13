var areaLayouts = require('../data/areaLayouts.json');
var tileTypes = require('../data/tileTypes.json');

function generateRenderAreaInstructions(combinations) {

    var tileSymbolMap = {};
    tileTypes.tiles.forEach((tile) => {
        tileSymbolMap[tile.symbol] = tile;
    });

    var layouts = Object.keys(areaLayouts.layouts);
    var n = 0;
    var instructions = combinations.map((combination) => {
        var compass = combination.split('').map((tileSymbol) => {
            return tileSymbolMap[tileSymbol].id;
        });

        var instruction = {
            "asset": `website/areas/area-${combination}.png`,
            "template": "/tiles/viewer.html",
            "renderer": {
                "$ref": "/data/renderers/mini-384x.json"
            },
            "data": {
                "NW": compass[0],
                "NE": compass[1],
                "SW": compass[2],
                "SE": compass[3],
                "zoom": "mini",
                "layout": "beached"
            }
        };

        n++;

        return instruction;
    });

    return instructions;
}

module.exports = generateRenderAreaInstructions;