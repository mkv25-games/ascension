const Terrain = (() => {

    var tileRecyler, subTileRecyler, gridRecycler;

    const areaSize = {
        width: 48,
        height: 48
    };

    const tileInfo = {
        width: 64,
        height: 64
    };

    tileInfo.halfWidth = tileInfo.width / 2;
    tileInfo.halfHeight = tileInfo.height / 2;

    const tileCache = {};

    function tileTextureFor(type, index) {
        return Resources[Settings.images.everything].textures[`${type}-${index}`];
    }

    function interpolate(areaTiles, xo, yo, arx, ary) {
        var a = areaTiles[ary] && areaTiles[ary][arx] || 'M';
        var b = areaTiles[ary + yo] && areaTiles[ary + yo][arx] || a;
        var c = areaTiles[ary] && areaTiles[ary][arx + xo] || a;
        var d = areaTiles[ary + yo] && areaTiles[ary + yo][arx + xo] || a;
        if (b === c && c === d) {
            return b;
        }
        return a;
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

        var tile, tileType, imagePath, x, y, arx, ary;
        var grid;
        var nw, ne, sw, se;
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
                nw = subTileRecyler.get();
                ne = subTileRecyler.get();
                sw = subTileRecyler.get();
                se = subTileRecyler.get();

                tile.x = x * tileInfo.width;
                tile.y = y * tileInfo.height;

                if (model.ui.interpolationEnabled) {
                    nw.texture = tileTextureFor(interpolate(areaTiles, -1, -1, arx, ary), '00');
                    ne.texture = tileTextureFor(interpolate(areaTiles, 1, -1, arx, ary), '00');
                    sw.texture = tileTextureFor(interpolate(areaTiles, -1, 1, arx, ary), '00');
                    se.texture = tileTextureFor(interpolate(areaTiles, 1, 1, arx, ary), '00');
                } else {
                    nw.texture = tileTextureFor(tileType, '15');
                    ne.texture = nw.texture;
                    sw.texture = nw.texture;
                    se.texture = nw.texture;
                }
                ne.x = tileInfo.halfWidth;
                ne.y = 0;
                nw.x = 0;
                nw.y = 0;
                sw.x = 0;
                sw.y = tileInfo.halfHeight;
                se.x = tileInfo.halfWidth;
                se.y = tileInfo.halfHeight;

                // Awkward missing texture capture
                try {
                    tile.addChild(nw, ne, sw, se);
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