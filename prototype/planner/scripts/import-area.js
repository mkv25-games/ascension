var write = require('promise-path').write;
var areaLayouts = require('../data/areaLayouts.json');

var argv = process.argv;
var tileData = argv.pop();
var layoutId = argv.pop();
var validLayoutId = /[GFWSM]{4}/;
var dimensions = {
    width: 48,
    height: 48
};

try {
    var areaTiles = decodeTiles(tileData, dimensions.width, dimensions.height);
    if (validLayoutId.test(layoutId)) {
        areaLayouts.layouts[layoutId] = tileData;
        write(__dirname + '/../data/areaLayouts.json', JSON.stringify(areaLayouts, null, 2), 'utf8')
            .then(function() {
                console.log(`Add ${layoutId} to data/areaLayouts.json`);
            })
            .catch(function(ex) {
                console.error('Unable to write file', ex, ex.stack);
            });
    } else {
        console.error('Invalid layout ID:', layoutId);
    }
} catch (exception) {
    console.error('Unable to decode tile data:', layoutId, tileData);
}

function decodeTiles(tileData, width, height) {
    var areaTiles = [];
    var n = 0;
    var symbol, length
    var row = [];
    var instructions = tileData.split(':');
    instructions.forEach(function(instruction) {
        length = parseInt(instruction) || 0;
        if (length) {
            for (var n = 0; n < length; n++) {
                row.push(symbol);
                if (row.length === width) {
                    areaTiles.push(row);
                    row = [];
                }
            }
            symbol = false;
            length = 0;
        } else if (symbol) {
            row.push(symbol);
            if (row.length === width) {
                areaTiles.push(row);
                row = [];
            }
            symbol = instruction;
        } else {
            symbol = instruction;
        }
    });

    if (areaTiles.length !== height) {
        throw new Error(`Did not decode expected number of rows. Actual: ${areaTiles.length}, Expected: ${height}`);
    }

    return areaTiles;
}