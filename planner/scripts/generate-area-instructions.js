var generateInstructionForCombination = require('../lib/generateInstructionForCombination');
var areaCombinations = require('../data/areaCombinations.json');
var write = require('promise-path').write;
var report = require('../lib/report');
var handleError = require('../lib/handleError');

function generateRenderAreaInstructions(combinations) {
    return combinations.map(generateInstructionForCombination);
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
        write(`instructions-generated/${prefix}-render-areas-slice-${suffix}.json`, JSON.stringify(slice, null, 2), 'utf8')
            .then(report(`Write Area Slice ${prefix} for items ${suffix}`))
            .catch(handleError);
    }
}

writeRenderInstructions(areaCombinations.combinations);
