var combinator = require('./combinator');

function createAreaCombinations() {
    var tileSymbols ='GFWSM'.split('');

    var combinationLength = 4;

    return combinator.combine(tileSymbols, combinationLength);
}

module.exports = createAreaCombinations;