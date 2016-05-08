var tileTypes = require('../data/tileTypes.json');
var combinator = require('./combinator');

function createAreaCombinations() {
    var tileSymbols = tileTypes.tiles.map((tile) => {
        return tile.symbol;
    });

    var combinationLength = 4;

    return combinator.combine(tileSymbols, combinationLength);
}

module.exports = createAreaCombinations;