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

    var page = 0;
    var itemsPerPage = 10;
    var totalItems = renderAreaInstructions.length;
    while (renderAreaInstructions.length > 0) {
        var slice = [];
        for (var i = 0; i < itemsPerPage; i++) {
            if (renderAreaInstructions.length > 0) {
                slice.push(renderAreaInstructions.pop());
            }
        }

        var rangeStart = page * itemsPerPage;
        var rangeEnd = Math.min(rangeStart + itemsPerPage - 1, totalItems);
        page++;

        var prefix = ((page < itemsPerPage) ? '0' : '') + page;
        var suffix = `${rangeStart}-${rangeEnd}`;
        write(`instructions-generated/${prefix}-render-areas-slice-${suffix}.json`, JSON.stringify(slice, null, 2), 'utf8').catch(handleError);
    }
}

var areaCombinations = writeAreaCombinations();

writeRenderInstructions(areaCombinations.combinations);

convertBitmapToJSON('./data/sample-map-100x100.png', function(histogram) {
    write('data/sample-map.json', JSON.stringify(histogram, null, 2), 'utf8').catch(handleError);
});
