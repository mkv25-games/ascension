function mapDecode(stringData, dimensions) {
    return decodeTiles(stringData, dimensions.width, dimensions.height);
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
        console.error("Did not decode expected number of rows.", "Actual", areaTiles.length, "Expected", height);
    }

    return areaTiles;
}

module.exports = mapDecode;