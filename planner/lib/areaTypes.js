function add(areaTypes) {
    var tiles = areaTypes.tiles.map((tile) => {
        return tile.symbol;
    });

    var positions = areaTypes.positions;

    positions.map((position) => {
        return enhance(position, tiles);
    });

    return areaTypes;
}

function enhance(position, tiles) {
    var combinations = [
        []
    ];

    for (var i = 0; i < position.comnbinationLength; i++) {
        combinations = combine(combinations, tiles);
    }

    position.combinations = combinations.map((combination) => {
        return combination.join('');
    });

    position.count = position.combinations.length;

    delete position.spots;

    return position;
}

function combine(combinations, tiles) {
    var result = [];
    combinations.forEach((combination) => {
        tiles.forEach((tile) => {
            result.push(combination.concat(tile));
        });
    });

    return result;
}

module.exports = {
    add
};