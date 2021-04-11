var combinator = require('./combinator');

function createTileCombinations() {
    var tileSymbols ='01'.split('');

    var combinationLength = 8;

    return combinator.combine(tileSymbols, combinationLength);
}

module.exports = createTileCombinations;