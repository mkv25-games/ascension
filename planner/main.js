var generateRenderAreaInstructions = require('./lib/generateRenderAreaInstructions');
var createAreaCombinations = require('./lib/createAreaCombinations');
var convertBitmapToJSON = require('./lib/convertBitmapToJSON');
var write = require('promise-path').write;
var handleError = (error) => {
    console.log(error, error.stack);
};

function writeAreaCombinations() {
    var combinations = createAreaCombinations();

    write('data/areaCombinations.json', JSON.stringify(combinations, null, 2), 'utf8').catch(handleError);

    return combinations;
}

function writeRenderInstructions(combinations) {
    var renderAreaInstructions = generateRenderAreaInstructions(combinations);

    var n = 0;
    while (renderAreaInstructions.length > 0) {
        var slice = [];
        for (var i = 0; i < 10; i++) {
            if (renderAreaInstructions.length > 0) {
                slice.push(renderAreaInstructions.pop());
            }
        }
        n++;
        var suffix = ((n < 10) ? '0' : '') + n
        write(`instructions-generated/03-render-areas-slice-${suffix}.json`, JSON.stringify(slice, null, 2), 'utf8').catch(handleError);
    }
}

var areaCombinations = writeAreaCombinations();

writeRenderInstructions(areaCombinations.combinations);

convertBitmapToJSON('./data/sample-map-100x100.png', function(histogram) {
    write('data/sample-map.json', JSON.stringify(histogram, null, 2), 'utf8').catch(handleError);
});
