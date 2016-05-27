function mapEncode(tiles) {
    return runLengthEncode(tiles.reduce(function(reduce, row) {
        return reduce.concat(row);
    }, []));
}

function runLengthEncode(string) {
    var i = 0;
    var j = 0;
    var prev = '';
    var output = []
    while (string[i]) {
        if (string[i] !== prev) {
            if (i && j > 1)
                output.push(j);
            output.push(string[i]);
            prev = string[i];
            j = 0;
        }
        j++;
        i++;
    }

    if (j > 1)
        output.push(j);

    return output.join(':');
}

module.exports = mapEncode;