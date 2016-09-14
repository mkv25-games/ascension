const layouts = require('../data/area-layouts.json');
const noise = require('./perlin-noise');
const areasTypes = 'GFWSM'.split('');

function create(columns, rows, seed) {
    var areas = [];

    // seed the map noise
    noise.seed(seed || 500);

    // choose edging area
    var edgeArea = {
        baseType: pickArea(0, 0)
    };

    console.log('Edge area', edgeArea);

    // first pass
    for (var j = 0; j < rows; j++) {
        areas[j] = areas[j] || [];
        for (var i = 0; i < columns; i++) {
            areas[j][i] = areas[j][i] || {
                baseType: pickArea(i, j, edgeArea.baseType),
                x: i,
                y: j
            }
        }
    }

    console.log('Perlin range:', min, max);

    areas.findArea = function(area, xOffset, yOffset) {
        var row = areas[area.y + yOffset];
        if (row) {
            return row[area.x + xOffset] || edgeArea;
        } else {
            return edgeArea;
        }
    }

    interpolateWorld(areas);

    const world = {
        areas
    };

    return world;
}

function pickRandomArea() {
    return Math.floor(Math.random() * areasTypes.length);
}

var min = false;
var max = false;
function pickArea(x, y, defaultSymbol) {
    if (defaultSymbol && (x === 0 || y === 0)) {
        return defaultSymbol;
    }
    var height = (noise.simplex2(x, y) + 1) / 2;
    var index = Math.floor(height * areasTypes.length) % areasTypes.length;

    min = (min) ? Math.min(height, min) : height;
    max = (max) ? Math.max(height, max) : height;

    return areasTypes[index];
}

function interpolateWorld(areas) {
    areas.forEach(function(row) {
        row.forEach(function(area) {
            area.compass = interpolateArea(area, areas.findArea);
        });
    });
}

function interpolateArea(area, f) {
    return collapse([f(area, 0, 0), f(area, 1, 0), f(area, 0, 1), f(area, 1, 1)]);
}

function collapse(areas) {
    return areas.map(function(area) {
        return area.baseType;
    }).join('');
}

module.exports = {
    create
};