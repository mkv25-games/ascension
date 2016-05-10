var mapData = decode({{json mapData}});

function decode(rawMapData) {
    var j = 0;
    var map = rawMapData.map(function(row) {
        var row = row.split(':');
        var i = 0;
        row = row.map(function(symbol) {
            var cell = {
                symbol: symbol,
                x: i,
                y: j
            };
            i++;
            return cell;
        });
        j++;
        return row;
    });

    map.findTile = function(tile, xOffset, yOffset) {
        var row = map[tile.y + yOffset];
        if (row) {
            return row[tile.x + xOffset] || row[tile.x] || tile;
        } else {
            return map[tile.y][tile.x + xOffset] || tile;
        }
    };

    return map;
}