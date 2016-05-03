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
    var spots = [
        []
    ];

    for (var i = 0; i < position.comnbinationLength; i++) {
        spots = combine(spots, tiles);
    }

    position.spots = spots.map((spot) => {
        return spot.join('');
    });

    position.count = position.spots.length;

    return position;
}

function combine(spots, tiles) {
    var result = [];
    spots.forEach((spot) => {
        tiles.forEach((tile) => {
            result.push(spot.concat(tile));
        });
    });

    return result;
}

module.exports = {
    add
};