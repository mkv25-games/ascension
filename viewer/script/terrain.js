const Terrain = (() => {

    var tileRecyler;

    const areaSize = {
        width: 48,
        height: 48
    };

    const tileInfo = {
        width: 48,
        height: 48
    };

    const tileMap = {
        'W': 'area-WWWW',
        'F': 'area-FFFF',
        'G': 'area-GGGG',
        'S': 'area-SSSS',
        'M': 'area-MMMM'
    };

    const tileCache = {};

    function update(container, camera, model) {
        tileRecyler.recycleAll();

        const world = model.data.world;
        const areas = world.areas;

        const toX = camera.viewArea.x / tileInfo.width;
        const toY = camera.viewArea.y / tileInfo.height;

        const cols = Math.ceil(camera.viewArea.width / tileInfo.width) + 1;
        const rows = Math.ceil(camera.viewArea.height / tileInfo.height) + 1;

        const tileAtlas = Resources[Settings.images.everything].textures;

        var tile, tileType, imagePath, x, y, arx, ary;
        var areaKey, areaModel, areaTiles;
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
                imagePath = tileMap[tileType];
                tile.texture = tileAtlas[imagePath];
                tile.x = x * tileInfo.width;
                tile.y = y * tileInfo.height;
                tile.anchor.x = 0;
                tile.anchor.y = 0;
                container.addChild(tile);
            }
        }
    }

    function updateTileCache(areaModel, cacheKey) {
        if(areaModel) {
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
        const container = new Container();

        container.update = (camera) => {
            update(container, camera, model);
        };

        tileRecyler = Recycler.create(() => {
            return new Sprite();
        }, (instance) => {
            container.removeChild(instance);
            instance.x = 0;
            instance.y = 0;
            instance.scale.x = instance.scale.y = 1;
            instance.texture = null;
        });

        return container;
    }

    return {
        create
    };
})();