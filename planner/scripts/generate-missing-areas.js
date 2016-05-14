var write = require('promise-path').write;
var report = require('../lib/report');
var handleError = require('../lib/handleError');
var areaLayoutsFile = __dirname + '/../data/areaLayouts.json';
var areaLayouts = require(areaLayoutsFile);
var areaCombinations = require('../data/areaCombinations.json');

function writeMissingAreaLayouts(combinations) {
    // count
    var defaultLayouts = 0;
    var missingLayouts = 0;

    // computer, enhance
    combinations.forEach(function(combination) {
        areaLayouts.layouts[combination] = areaLayouts.layouts[combination] || areaLayouts.layouts.default;
        if (!areaLayouts.layouts[combination]) {
            areaLayouts.layouts[combination] = areaLayouts.layouts.default;
            missingLayouts++;
        }
        if (areaLayouts.layouts[combination] === areaLayouts.layouts.default) {
            defaultLayouts++;
        }
    });

    var uniqueLayouts = combinations.length - defaultLayouts;
    var uniquePercent = (uniqueLayouts / combinations.length * 100).toFixed(2) + '%';

    write(areaLayoutsFile, JSON.stringify(areaLayouts, null, 2), 'utf8')
        .then(report(`Write Area Layouts with default combinations: Missing ${missingLayouts}, Default: ${defaultLayouts}, Unique: ${uniqueLayouts} (${uniquePercent})`))
        .catch(handleError);
}

writeMissingAreaLayouts(areaCombinations.combinations);