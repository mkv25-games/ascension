const Terrain = (() => {

    var tileRecyler, subTileRecyler, gridRecycler, highlightRecycler;

    const areaSize = {
        width: 96,
        height: 96
    };

    const tileInfo = {
        width: 32,
        height: 32
    };

    tileInfo.halfWidth = tileInfo.width / 2;
    tileInfo.halfHeight = tileInfo.height / 2;

    const localAreaCache = {};

    function lookupLocalAreaModel(world, wax, way) {
        var areaKey = wax + ',' + way;
        var worldAreaModel = world.areas[areaKey] || lookupWorldArea(world, wax, way, areaKey);
        var localAreaModel = localAreaCache[world.id + areaKey] || createLocalAreaModel(worldAreaModel, world.id + areaKey, localAreaCache);
        // var areaTiles = localAreaModel.interpolatedTiles;

        return localAreaModel;
    }

    function tileTextureFor(type, index) {
        var texture = Resources[Settings.images.everything].textures[`${type}-${index}`];
        if (!texture) {
            throw 'Texture not found for ' + type + ', ' + index;
        }
        return texture;
    }

    function edgeDetectTileType(world, x, y) {
        var type = interpolate(world, x, y);
        // b3 b2
        // b1 b0
        var b0 = true;
        var b1 = interpolate(world, x - 1, y, type) === type;
        var b2 = interpolate(world, x, y - 1, type) === type;
        var b3 = interpolate(world, x - 1, y - 1, type) === type;

        // choose direction
        var bi = 15 - (b0 << 3 | b1 << 2 | b2 << 1 | b3);
        var xo = (b1 && !b2) ? 0 : -1;
        var yo = (b2 && !b1) || (b3 && !b1 && !b2) ? 0 : -1;

        return interpolate(world, x + xo, y + yo, type);
    }

    function edgeDetectTileIndex(world, x, y) {
        var type = interpolate(world, x, y);
        // b3 b2
        // b1 b0
        var b0 = true;
        var b1 = interpolate(world, x - 1, y, type) === type;
        var b2 = interpolate(world, x, y - 1, type) === type;
        var b3 = interpolate(world, x - 1, y - 1, type) === type;

        var bi = 15 - (b0 << 3 | b1 << 2 | b2 << 1 | b3);

        return (bi < 10) ? '0' + bi : '' + bi;
    }

    function interpolate(world, x, y, defaultType) {
        var garx = Math.floor(x / 2);
        var gary = Math.floor(y / 2);
        var xo = (x % 2) ? 1 : -1;
        var yo = (y % 2) ? 1 : -1;
        // nw ne
        // sw se
        var a = groundTileLookup(world, garx, gary);
        var b = groundTileLookup(world, garx, gary + yo);
        var c = groundTileLookup(world, garx + xo, gary);
        var d = groundTileLookup(world, garx + xo, gary + yo);

        if (b === c && c === d) {
            return b;
        }
        return a;
    }

    function groundTileLookup(world, x, y, defaultValue) {
        // Select correct area for this tile
        var wax = Math.floor(x * 2 / areaSize.width);
        var way = Math.floor(y * 2 / areaSize.height);

        // Calculate relative ground position within area
        var garx = Math.floor(((areaSize.width + (x * 2 % areaSize.width)) % areaSize.width) / 2);
        var gary = Math.floor(((areaSize.height + (y * 2 % areaSize.height)) % areaSize.height) / 2);

        var localAreaModel = lookupLocalAreaModel(world, wax, way);
        return tileLookup(localAreaModel.groundTiles, garx, gary);
    }

    function tileLookup(grid, x, y, defaultValue) {
        return grid[y] && grid[y][x] || defaultValue || 'S';
    }

    function updateBaseTextureFor(world, x, y) {
        // Select correct area for this tile
        var wax = Math.floor(x / areaSize.width);
        var way = Math.floor(y / areaSize.height);

        // Calculate relative position within area
        var arx = (areaSize.width + (x % areaSize.width)) % areaSize.width;
        var ary = (areaSize.height + (y % areaSize.height)) % areaSize.height;
        var ark = ary * areaSize.width + arx;

        var localAreaModel = lookupLocalAreaModel(world, wax, way);
        var type = interpolate(world, x, y);
        var index = '00';

        var texture = tileTextureFor(type, index);
        localAreaModel.baseTileTextureCache[ark] = texture;
        return texture;
    }

    function updateSurfaceTextureFor(world, x, y) {
        // Select correct area for this tile
        var wax = Math.floor(x / areaSize.width);
        var way = Math.floor(y / areaSize.height);

        // Calculate relative position within area
        var arx = (areaSize.width + (x % areaSize.width)) % areaSize.width;
        var ary = (areaSize.height + (y % areaSize.height)) % areaSize.height;
        var ark = ary * areaSize.width + arx;

        var localAreaModel = lookupLocalAreaModel(world, wax, way);
        var type = edgeDetectTileType(world, x, y);
        var index = edgeDetectTileIndex(world, x, y);

        var texture = tileTextureFor(type, index);
        localAreaModel.surfaceTileTextureCache[ark] = texture;

        return texture;
    }

    function updateGroundTextureFor(world, x, y) {
        // Select correct area for this tile
        var wax = Math.floor(x / areaSize.width);
        var way = Math.floor(y / areaSize.height);

        // Calculate relative position within area
        var arx = (areaSize.width + (x % areaSize.width)) % areaSize.width;
        var ary = (areaSize.height + (y % areaSize.height)) % areaSize.height;
        var ark = ary * areaSize.width + arx;

        var localAreaModel = lookupLocalAreaModel(world, wax, way);

        // Ground area tiles are twice the size of normal area tiles
        var garx = Math.floor(arx / 2);
        var gary = Math.floor(ary / 2);

        var type = tileLookup(localAreaModel.groundTiles, garx, gary);
        var index = '00';

        var texture = tileTextureFor(type, index);
        localAreaModel.groundTileTextureCache[ark] = texture;
        return texture;
    }

    function update(terrainContainer, camera, model) {
        tileRecyler.recycleAll();
        subTileRecyler.recycleAll();
        gridRecycler.recycleAll();
        highlightRecycler.recycleAll();

        const world = model.data.world;

        const toX = Math.floor(camera.viewArea.x / tileInfo.width);
        const toY = Math.floor(camera.viewArea.y / tileInfo.height);

        const cols = Math.ceil(camera.viewArea.width / tileInfo.width) + 1;
        const rows = Math.ceil(camera.viewArea.height / tileInfo.height) + 1;

        var x, y, arx, ary, ark, wax, way;
        var tile, baseTile, surfaceTile;
        var grid;
        var areaKey, worldAreaModel, localAreaModel, areaTiles;
        var error = [];
        for (var j = 0; j < rows; j++) {
            // Calculate a world y coordinate
            y = toY + j;
            for (var i = 0; i < cols; i++) {
                // Calculate a world x coordinate
                x = toX + i;

                // Select correct area for this tile
                wax = Math.floor(x / areaSize.width);
                way = Math.floor(y / areaSize.height);

                // Calculate relative position within area
                arx = (areaSize.width + (x % areaSize.width)) % areaSize.width;
                ary = (areaSize.height + (y % areaSize.height)) % areaSize.height;
                ark = ary * areaSize.width + arx;

                // Find local area model
                localAreaModel = lookupLocalAreaModel(world, wax, way);

                // Decide what to render
                if (model.ui.interpolationMode === WorldModel.InterpolationModes.ON) {
                    baseTile = subTileRecyler.get();
                    surfaceTile = subTileRecyler.get();
                    baseTile.texture = localAreaModel.baseTileTextureCache[ark] || updateBaseTextureFor(world, x, y);
                    surfaceTile.texture = localAreaModel.surfaceTileTextureCache[ark] || updateSurfaceTextureFor(world, x, y);
                } else if (model.ui.interpolationMode === WorldModel.InterpolationModes.BASE_ONLY) {
                    baseTile = subTileRecyler.get();
                    baseTile.texture = localAreaModel.baseTileTextureCache[ark] || updateBaseTextureFor(world, x, y);
                } else if (model.ui.interpolationMode === WorldModel.InterpolationModes.SURFACE_ONLY) {
                    surfaceTile = subTileRecyler.get();
                    surfaceTile.texture = localAreaModel.surfaceTileTextureCache[ark] || updateSurfaceTextureFor(world, x, y);
                } else {
                    baseTile = subTileRecyler.get();
                    baseTile.texture = localAreaModel.groundTileTextureCache[ark] || updateGroundTextureFor(world, x, y);
                }

                // Grab a recycled tile
                tile = tileRecyler.get();
                tile.x = x * tileInfo.width;
                tile.y = y * tileInfo.height;

                // Awkward missing texture capture
                try {
                    if (baseTile && baseTile.texture) tile.addChild(baseTile);
                    if (surfaceTile && surfaceTile.texture) tile.addChild(surfaceTile);
                    if (model.ui.gridVisible) {
                        grid = gridRecycler.get();
                        tile.addChild(grid);
                    }
                    terrainContainer.addChild(tile);
                } catch (ex) {
                    var dataDump = {
                        worldId: world.id,
                        areaKey,
                        arx,
                        ary,
                        tile,
                        tileAtlas
                    };
                    console.log('Unable to find texture', dataDump);
                    throw 'Unable to find texture for tile - ' + [world.id, areaKey, arx, ary].join(' : ');
                }
            }
        }

        if (model.data.player.focus) {
            var highlight = highlightRecycler.get();
            var focus = model.data.player.focus;
            var fx = Math.round(focus.x / tileInfo.width);
            var fy = Math.round(focus.y / tileInfo.height);

            // Select correct area for this tile
            wax = Math.floor(fx / areaSize.width);
            way = Math.floor(fy / areaSize.height);

            // Calculate relative position within area
            arx = (areaSize.width + (fx % areaSize.width)) % areaSize.width;
            ary = (areaSize.height + (fy % areaSize.height)) % areaSize.height;
            ark = ary * areaSize.width + arx;

            localAreaModel = lookupLocalAreaModel(world, wax, way);
            camera.highlightedTile = {
                fx,
                fy,
                arx,
                ary,
                wax,
                way,
                symbol: localAreaModel.groundTileTextureCache[ark]
            };

            highlight.x = Math.floor(fx / 2) * 2 * tileInfo.width;
            highlight.y = Math.floor(fy / 2) * 2 * tileInfo.height;

            terrainContainer.addChild(highlight);
        }

        if (error.length > 0) {
            throw error;
        }
    }

    function lookupWorldArea(world, areaX, areaY, areaKey) {
        world.areas[areaKey] = WorldGenerator.select(areaX, areaY, world.seed);

        return world.areas[areaKey];
    }

    function zp(num) {
        if (num < 10) {
            return '0' + num;
        }
        return num;
    }

    function createLocalAreaModel(areaModel, cacheKey, cache) {
        var model = {
            groundTileTextureCache: [],
            baseTileTextureCache: [],
            surfaceTileTextureCache: []
        };

        if (areaModel) {
            model.groundTiles = decodeTiles(areaModel.tiles, areaModel.dimensions.width, areaModel.dimensions.height);
            // console.log('Cached decoded area', cacheKey, model.groundTiles);
        } else {
            model.groundTiles = [];
            console.log('Cached empty area', cacheKey);
        }

        cache[cacheKey] = model;
        return model;
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
        const recycleContainer = new Container();

        terrainContainer.update = (camera) => {
            update(terrainContainer, camera, model);
        };

        tileRecyler = Recycler.create(() => {
            return new Container();
        }, (instance) => {
            recycleContainer.addChild(instance);
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
            recycleContainer.addChild(instance);
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
            if (g.parent) g.parent.removeChild(g);
            /* Commented out for optimization
            g.x = 0;
            g.y = 0;
            g.scale.x = g.scale.y = 1;
            */
        });

        highlightRecycler = Recycler.create(() => {
            var g = new Graphics();
            g.lineStyle(3, 0xFFFFFF, 0.4);
            g.drawRect(0, 0, tileInfo.width * 2, tileInfo.height * 2);
            return g;
        }, (g) => {
            if (g.parent) g.parent.removeChild(g);
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