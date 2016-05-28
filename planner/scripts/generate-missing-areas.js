var write = require('promise-path').write;
var report = require('../lib/report');
var handleError = require('../lib/handleError');
var areaLayoutsFile = __dirname + '/../data/areaLayouts.json';
var areaLayouts = require(areaLayoutsFile);
var areaCombinations = require('../data/areaCombinations.json');
var mapRotate = require('../lib/mapRotate');

function square(combination) {
    var cells = combination.split('');

    return [
        [cells[0], cells[1]],
        [cells[2], cells[3]]
    ];
}

function writeMissingAreaLayouts(combinations) {
    // track
    var defaultLayouts = {};
    var missingLayouts = {};
    var uniqueLayouts = {};

    // categorise
    combinations.forEach(function(combination) {
        areaLayouts.layouts[combination] = areaLayouts.layouts[combination] || areaLayouts.layouts.default;
        // missing layouts, set to default
        if (!areaLayouts.layouts[combination]) {
            areaLayouts.layouts[combination] = missingLayouts[combination] = areaLayouts.layouts.default;
        }
        // default layouts
        if (areaLayouts.layouts[combination] === areaLayouts.layouts.default) {
            defaultLayouts[combination] = areaLayouts.layouts[combination];
        }
        // unique layouts
        else {
            uniqueLayouts[combination] = areaLayouts.layouts[combination];
        }
    });

    // computer, enhance
    var n = 0;
    Object.keys(uniqueLayouts).forEach(function(combination) {
        var index = uniqueLayouts;
        var minimap = square(combination);
        // create list of siblings for each tile
        var siblings = mapRotate.list().map(function(transformer) {
            var sibling = transformer(minimap);
            return sibling.join(',').split(',').join('');
        });

        // apply siblings where defaults exist
        var report = siblings.map(function(sibling) {
            return (defaultLayouts[sibling]) ? 'X' : '-';
        });

        function pad(number, padding) {
            var result = number + '';
            while(result.length < padding) {
                result = ' ' + result;
            }
            return result;
        }

        console.log(pad(n, 3), combination, 'siblings:', report.join(', '));
        n++;
    });

    // summarise
    var uniquePercent = (Object.keys(uniqueLayouts).length / combinations.length * 100).toFixed(2) + '%';

    write(areaLayoutsFile, JSON.stringify(areaLayouts, null, 2), 'utf8')
        .then(report(`Write Area Layouts with default combinations: Missing ${Object.keys(missingLayouts).length}, Default: ${Object.keys(defaultLayouts).length}, Unique: ${Object.keys(uniqueLayouts).length} (${uniquePercent})`))
        .catch(handleError);
}

writeMissingAreaLayouts(areaCombinations.combinations);