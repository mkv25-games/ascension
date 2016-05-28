var write = require('promise-path').write;
var report = require('../lib/report');
var handleError = require('../lib/handleError');
var areaLayoutsFile = __dirname + '/../data/areaLayouts.json';
var areaLayouts = require(areaLayoutsFile);
var areaCombinations = require('../data/areaCombinations.json');
var mapRotate = require('../lib/mapRotate');
var mapDecode = require('../lib/mapDecode');
var mapEncode = require('../lib/mapEncode');

function square(combination) {
    var cells = combination.split('');

    return [
        [cells[0], cells[1]],
        [cells[2], cells[3]]
    ];
}

function pad(number, padding) {
    var result = number + '';
    while (result.length < padding) {
        result = ' ' + result;
    }
    return result;
}

function writeMissingAreaLayouts(combinations) {
    // track
    var defaultLayouts = {};
    var missingLayouts = {};
    var uniqueLayouts = {};
    var generatedLayouts = {};

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
        var layout = uniqueLayouts[combination];

        // flatten directional colouring
        layout = layout.replace(/NW/g, combination[0]);
        layout = layout.replace(/NE/g, combination[1]);
        layout = layout.replace(/SW/g, combination[2]);
        layout = layout.replace(/SE/g, combination[3]);

        var map = mapDecode(layout, areaLayouts.dimensions);
        // create list of siblings for each tile
        var siblings = mapRotate.list().map(function(transformer) {
            var sibling = transformer(minimap).join(',').split(',').join('');
            if (defaultLayouts[sibling]) {
                areaLayouts.layouts[sibling] = generatedLayouts[sibling] = mapEncode(transformer(map));
                delete defaultLayouts[sibling];
            }
        });

        // apply siblings where defaults exist
        var c = 0;
        var report = siblings.map(function(sibling) {
            if (defaultLayouts[sibling]) {
                return 'X';
            } else {
                c++;
                return 'o';
            }
        });

        console.log(pad(n, 3), combination, 'siblings:', report.join(', '), `${c}/${siblings.length}`);
        n++;
    });

    // summarise
    var defaultPercent = (Object.keys(defaultLayouts).length / combinations.length * 100).toFixed(2) + '%';
    var uniquePercent = (Object.keys(uniqueLayouts).length / combinations.length * 100).toFixed(2) + '%';
    var generatedPercent = (Object.keys(generatedLayouts).length / combinations.length * 100).toFixed(2) + '%';

    write(areaLayoutsFile, JSON.stringify(areaLayouts, null, 2), 'utf8')
        .then(report([
            `Write Area Layouts with default combinations`,
            `Missing ${Object.keys(missingLayouts).length}`,
            `Default: ${Object.keys(defaultLayouts).length} (${defaultPercent})`,
            `Unique: ${Object.keys(uniqueLayouts).length} (${uniquePercent})`,
            `Generated: ${Object.keys(generatedLayouts).length} (${generatedPercent})`
        ].join(', ')))
        .catch(handleError);
}

writeMissingAreaLayouts(areaCombinations.combinations);