const WorldGenerator = (() => {

    const noise = PerlinNoise;
    const areaHeightMap = 'WSGFM'.split('');

    function create(columns, rows, seed) {
        var areas = [];

        // seed the map noise
        noise.seed(seed || 500);

        // set the water height
        var waterHeight = noise.simplex2(seed, seed) * 5;
        var waterHeightMap = [];
        for (var i = 0; i < waterHeight; i++) {
            waterHeightMap.push('W');
        }
        var worldHeightMap = [].concat(waterHeightMap, areaHeightMap);
        console.log('World height map', worldHeightMap);

        // choose edging area
        var edgeArea = {
            baseType: pickArea(0, 0, null, worldHeightMap)
        };

        // first pass
        for (var j = 0; j < rows; j++) {
            areas[j] = areas[j] || [];
            for (var i = 0; i < columns; i++) {
                areas[j][i] = areas[j][i] || {
                    baseType: pickArea(i, j, edgeArea.baseType, worldHeightMap),
                    x: i,
                    y: j
                }
            }
        }

        console.log('Perlin range:', min, max);

        areas.findArea = function (area, xOffset, yOffset) {
            var row = areas[area.y + yOffset] || areas[area.y];
            if (row) {
                return row[area.x + xOffset] || row[area.x] || edgeArea;
            } else {
                return edgeArea;
            }
        };

        uniqueAreas = {};
        interpolateWorld(areas);
        console.log('Unique Areas', Object.keys(uniqueAreas).length, 'total');

        const world = {
            areas
        };

        return map(world);
    }

    function map(world) {
        result = {};
        world.areas.forEach((row, y) => {
            row.forEach((cell, x) => {
                result[`${x},${y}`] = {
                    x,
                    y,
                    tiles: AreaLayouts.layouts[cell.compass],
                    dimensions: {
                        width: 48,
                        height: 48
                    },
                    items: []
                }
            });
        });
        return result;
    }

    function pickRandomArea() {
        return Math.floor(Math.random() * areaHeightMap.length);
    }

    var min = false;
    var max = false;

    function pickArea(x, y, defaultSymbol, heightMap) {
        var scale = (noise.simplex2(x, y));
        var continentalHeight = (noise.simplex2(x / 10, y / 10) + 1) / 2;
        var microHeight = (noise.simplex2(x, y) + 1) / 2;

        var height = continentalHeight + (microHeight / 2);

        var index = Math.floor(height * heightMap.length) % heightMap.length;

        min = (min) ? Math.min(height, min) : height;
        max = (max) ? Math.max(height, max) : height;

        return heightMap[index];
    }

    var uniqueAreas;

    function interpolateWorld(areas) {
        areas.forEach(function (row) {
            row.forEach(function (area) {
                area.compass = interpolateArea(area, areas.findArea);
                uniqueAreas[area.compass] = (uniqueAreas[area.compass] || 0) + 1;
            });
        });
    }

    function interpolateArea(area, f) {
        return collapse([f(area, 0, 0), f(area, 1, 0), f(area, 0, 1), f(area, 1, 1)]);
    }

    function collapse(areas) {
        return areas.map(function (area) {
            return area.baseType;
        }).join('');
    }

    return {
        create
    };
})();