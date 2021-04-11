var createTileCombinations = require('../lib/createTileCombinations');
var write = require('promise-path').write;
var report = require('../lib/report');
var handleError = require('../lib/handleError');
var outFile = __dirname + '/../data/tileCombinations.json';

function writeAreaCombinations() {
    var tileCombinations = createTileCombinations();

    write(outFile, JSON.stringify(tileCombinations, null, 2), 'utf8')
        .then(report(`Write Tile Combinations; Total ${tileCombinations.combinations.length}, Variants: ${tileCombinations.variants.join('')}, Length: ${tileCombinations.length}`))
        .catch(handleError);
}

writeAreaCombinations();

