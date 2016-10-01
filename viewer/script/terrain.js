const Terrain = (() => {

    var tileRecyler, subTileRecyler, gridRecycler;

    const areaSize = {
        width: 48,
        height: 48
    };

    const tileInfo = {
        width: 32,
        height: 32
    };

    tileInfo.halfWidth = tileInfo.width / 2;
    tileInfo.halfHeight = tileInfo.height / 2;

    const tileCache = {};

    function tileTextureFor(type, index) {
        return Resources[Settings.images.everything].textures[`${type}-${index}`];
    }

    function tileTypeFor(areaTiles, arx, ary) {
         return areaTiles[ary] && areaTiles[ary][arx] || 'M'
    }

    function tileIndexFor(areaTiles, arx, ary) {
        // b3 b2
        // b1 b0
        var b0 = tileTypeFor(areaTiles, arx, ary);
        var b1 = tileTypeFor(areaTiles, arx - 1, ary) === b0;
        var b2 = tileTypeFor(areaTiles, arx, ary - 1) === b0;
        var b3 = tileTypeFor(areaTiles, arx - 1, ary - 1) === b0;
        b0 = !!b0;

        var bi = (b0 << 3 | b1 << 2 | b2 << 1 | b3);

        return (bi < 10) ? '0' + bi : '' + bi;
    }

    function update(terrainContainer, camera, model) {
        tileRecyler.recycleAll();
        subTileRecyler.recycleAll();
        gridRecycler.recycleAll();

        const world = model.data.world;
        const areas = world.areas;

        const toX = camera.viewArea.x / tileInfo.width;
        const toY = camera.viewArea.y / tileInfo.height;

        const cols = Math.ceil(camera.viewArea.width / tileInfo.width) + 1;
        const rows = Math.ceil(camera.viewArea.height / tileInfo.height) + 1;

        var tile, imagePath, x, y, arx, ary;
        var baseTile, surfaceTile;
        var grid;
        var areaKey, areaModel, areaTiles;
        var error = [];
        for (var j = 0; j < rows; j++) {
            // Calculate a world y coordinate
            y = Math.floor(toY + j);
            for (var i = 0; i < cols; i++) {
                // Calculate a world x coordinate
                x = Math.floor(toX + i);

                // Select correct area for this tile
                areaKey = Math.floor(x / areaSize.width) + ',' + Math.floor(y / areaSize.height);
                areaModel = areas[areaKey];
                areaTiles = tileCache[world.id + areaKey] || updateTileCache(areaModel, world.id + areaKey);

                // Calculate relative position within area
                arx = (x + areaSize.width) % areaSize.width;
                ary = (y + areaSize.height) % areaSize.height;

                // Lookup the tile type from the area
                tileType = (areaTiles[ary] && areaTiles[ary][arx]) || 'M';

                // Grab a recycled tile and render it
                tile = tileRecyler.get();
                baseTile = subTileRecyler.get();
                surfaceTile = subTileRecyler.get();
                if(model.ui.interpolationEnabled) {
                    baseTile.texture = tileTextureFor(tileTypeFor(areaTiles, arx, ary), '00');
                    surfaceTile.texture = tileTextureFor(tileTypeFor(areaTiles, arx, ary), tileIndexFor(areaTiles, arx, ary));
                }
                else {
                    baseTile.texture = tileTextureFor(tileTypeFor(areaTiles, arx, ary), '00');
                    surfaceTile.texture = baseTile.texture;
                }
                tile.x = x * tileInfo.width;
                tile.y = y * tileInfo.height;

                // Awkward missing texture capture
                try {
                    tile.addChild(baseTile, surfaceTile);
                    if(model.ui.gridVisible) {
                        grid = gridRecycler.get();
                        tile.addChild(grid);
                    }
                    terrainContainer.addChild(tile);
                } catch (ex) {
                    console.log('Unable to find texture', imagePath, tileAtlas);
                    throw 'Unable to find texture, tile: ' + imagePath;
                }
            }
        }
        if (error.length > 0) {
            throw error;
        }
    }

    function zp(num) {
        if (num < 10) {
            return '0' + num;
        }
        return num;
    }

    function updateTileCache(areaModel, cacheKey) {
        if (areaModel) {
            const tiles = decodeTiles(areaModel.tiles, areaModel.dimensions.width, areaModel.dimensions.height);
            tileCache[cacheKey] = tiles;
            console.log('Cached area', cacheKey);
            return tiles;
        }
        return false;
    }

    function decodeTiles(tileData, width, height) {
        var areaTiles = [];
        var n = 0;
        var symbol, length;
        var row = [];
        var instructions = tileData.split(':');
        instructions.forEach(function (instruction) {
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

    function create(model) {
        const terrainContainer = new Container();

        terrainContainer.update = (camera) => {
            update(terrainContainer, camera, model);
        };

        tileRecyler = Recycler.create(() => {
            return new Container();
        }, (instance) => {
            terrainContainer.removeChild(instance);
            /* Commented out for optimization
            instance.x = 0;
            instance.y = 0;
            instance.scale.x = instance.scale.y = 1;
            instance.texture = null;
            */
        });

        subTileRecyler = Recycler.create(() => {
            return new Sprite();
        }, (instance) => {
            terrainContainer.removeChild(instance);
            /* Commented out for optimization
            instance.x = 0;
            instance.y = 0;
            instance.scale.x = instance.scale.y = 1;
            instance.texture = null;
            */
        });

        gridRecycler = Recycler.create(() => {
            var g = new Graphics();
            g.lineStyle(1, 0x777777, 0.7);
            g.drawRect(0, 0, tileInfo.width, tileInfo.height);
            return g;
        }, (g) => {
            if(g.parent) g.parent.removeChild(g);
            /* Commented out for optimization
            g.x = 0;
            g.y = 0;
            g.scale.x = g.scale.y = 1;
            */
        });

        return terrainContainer;
    }

    return {
        create
    };
})();