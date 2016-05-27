var mapDecode = require('../lib/mapDecode');
var areaLayouts = require('../data/areaLayouts.json');
var write = require('promise-path').write;
var report = require('../lib/report');
var handleError = require('../lib/handleError');

var layoutId = process.argv.pop();
var validLayoutId = /[GFWSM]{4}/;

if (!validLayoutId.test(layoutId)) {
    console.error('Invalid layout ID:', layoutId);
    process.exit(1);
};

function decodeAreaLayout(combination) {
    var layout = areaLayouts.layouts[combination];
    console.log('Area Layout', combination, layout);

    return mapDecode(layout, areaLayouts.dimensions);
}

var areaTiles = decodeAreaLayout(layoutId);
console.log(layoutId, JSON.stringify(areaTiles));
