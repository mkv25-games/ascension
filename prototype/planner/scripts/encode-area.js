var mapDecode = require('../lib/mapDecode');
var mapEncode = require('../lib/mapEncode');
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

    return mapDecode(layout, areaLayouts.dimensions);
}


var NL = '\n';
var expected = areaLayouts.layouts[layoutId];
var areaTiles = mapDecode(expected, areaLayouts.dimensions);
var actual = mapEncode(areaTiles);

console.log('Layout', layoutId, NL);
console.log('Expected', expected, NL);
console.log('Actual', actual, NL);
console.log((expected === actual) ? 'Matching' : 'Not Matching');
