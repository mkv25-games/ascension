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
}

writeAreaCombinations();