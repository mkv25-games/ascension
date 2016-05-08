function createAreaCombinations() {
    var combinator = require('./lib/combinator');

    var tileTypes = require('./data/tileTypes.json');
    var tileSymbols = tileTypes.tiles.map((tile) => {
        return tile.symbol;
    });

    var combinationLength = 4;

    return combinator.combine(tileSymbols, combinationLength);
}

function writeAreaCombinations() {
    var write = require('promise-path').write;

    var handleError = (error) => {
        console.log(error, error.stack);
    };

    var combinations = createAreaCombinations();

    write('data/areaCombinations.json', JSON.stringify(combinations, null, 2), 'utf8').catch(handleError);

    var tileTypes = require('./data/tileTypes.json');
    var tileSymbolMap = {};
    tileTypes.tiles.forEach((tile) => {
        tileSymbolMap[tile.symbol] = tile;
    });

    var renderAreaInstructions = combinations.combinations.map((combination) => {
        var compass = combination.split('').map((tileSymbol) => {
            return tileSymbolMap[tileSymbol].id;
        });
        return {
            "asset": `website/areas/area-${combination}.png`,
            "template": "/tiles/viewer.html",
            "renderer": {
                "$ref": "/data/renderers/mini-384x.json"
            },
            "data": {
                "areaViewer": {
                    "$ref": "/data/areaLayouts.json"
                },
                "NW": compass[0],
                "NE": compass[1],
                "SW": compass[2],
                "SE": compass[3],
                "zoom": "mini",
                "layout": "default"
            }
        };
    });

    var n = 0;
    while(renderAreaInstructions.length > 0) {
        var slice = [];
        for(var i=0; i<10; i++) {
            if(renderAreaInstructions.length > 0) {
                slice.push(renderAreaInstructions.pop());
            }
        }
        n++;
        write(`instructions-generated/03-render-areas-slice-${n}.json`, JSON.stringify(slice, null, 2), 'utf8').catch(handleError);
    }
}

writeAreaCombinations();
