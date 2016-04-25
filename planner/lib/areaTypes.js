function add(areaTypes) {
    var tiles = areaTypes.tiles.map((tile) => {
        return tile.id;
    });
    
    var positions = areaTypes.positions;

    positions.map((position) => {
        return enhance(position, tiles);
    });

    return areaTypes;
}

function enhance(position, tiles) {
    var spots = [position.id];

    for(var i=0; i<position.typesRequired; i++) {
        spots = combine(spots, tiles);
    }

    position.spots = spots;

    return position;
}

function combine(spots, tiles) {
    var result = [];
    spots.forEach((id) => {
        tiles.forEach((tile) => {
            result.push(id + tile);
        });
    });

    return result;
}

module.exports = {
    add
};
