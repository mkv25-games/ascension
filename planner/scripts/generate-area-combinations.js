var createAreaCombinations = require('../lib/createAreaCombinations');
var write = require('promise-path').write;
var report = require('../lib/report');
var handleError = require('../lib/handleError');
var areaCombinationsFile = __dirname + '/../data/areaCombinations.json';

function writeAreaCombinations() {
    var areaCombinations = createAreaCombinations();

    write(areaCombinationsFile, JSON.stringify(areaCombinations, null, 2), 'utf8')
        .then(report(`Write Area Combinations; Total ${areaCombinations.combinations.length}, Variants: ${areaCombinations.variants.join('')}, Length: ${areaCombinations.length}`))
        .catch(handleError);
}

writeAreaCombinations();

