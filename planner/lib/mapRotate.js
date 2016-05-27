function rotate0(map) {
    return JSON.parse(JSON.stringify(map));
}

function rotate90(map) {
    var result = [];

    var tx, ty;
    map.forEach(function(row, rowIndex) {
        row.forEach(function(cell, cellIndex) {
            tx = map.length - rowIndex - 1;
            ty = cellIndex;
            result[ty] = result[ty] || [];
            result[ty][tx] = cell;
        });
    });

    return result;
}

function rotate180(map) {
    map = rotate90(map);
    map = rotate90(map);
    return map;
}

function rotate270(map) {
    map = rotate180(map);
    map = rotate90(map);
    return map;
}

function mirror0(map) {
    var result = [];

    map.forEach(function(row, rowIndex) {
        result[rowIndex] = [].concat(row).reverse();
    });

    return result;
}

function mirror90(map) {
    map = mirror0(map);
    map = rotate90(map);
    return map;
}

function mirror180(map) {
    map = mirror0(map);
    map = rotate180(map);
    return map;
}

function mirror270(map) {
    map = mirror0(map);
    map = rotate270(map);
    return map;
}

function list() {
    return [
        rotate0,
        rotate90,
        rotate180,
        rotate270,
        mirror0,
        mirror90,
        mirror180,
        mirror270
    ];
}


module.exports = {
    rotate0,
    rotate90,
    rotate180,
    rotate270,
    mirror0,
    mirror90,
    mirror180,
    mirror270,
    list
};