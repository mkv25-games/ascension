var generateInstructionForCombination = require('../lib/generateInstructionForCombination');
var areaCombinations = require('../data/areaCombinations.json');
var write = require('promise-path').write;
var run = require('promise-path').run;
var report = require('../lib/report');
var handleError = require('../lib/handleError');

var layoutId = process.argv.pop();
var validLayoutId = /[GFWSM]{4}/;

if (!validLayoutId.test(layoutId)) {
    console.error('Invalid layout ID:', layoutId);
    process.exit(1);
};

function writeRenderInstruction(combination) {
    var instruction = generateInstructionForCombination(combination);

    var instructions = [{
        "asset": "website/lib/layouts.js",
        "template": "/website/lib/layouts.js",
        "renderer": {
            "type": "text"
        },
        "data": {
            "$ref": "/data/areaLayouts.json"
        }
    }, instruction];

    return write(__dirname + `/../instructions-generated/render-area-${combination}.json`, JSON.stringify(instructions, null, 2), 'utf8')
        .then(report(`Write Area Instruction ${combination}`));
}

var combination = layoutId;
var isWin = /^win/.test(process.platform);
writeRenderInstruction(combination)
    .then(() => {
        if(isWin) {
            return run(`${process.env.comspec} /c hag generate *.json -i instructions-generated > generate.log`);
        }
        else {
            return run(`hag generate -i instructions-generated`);
        }
    })
    .then(report(`Rendered area ${combination}`))
    .catch(handleError);
