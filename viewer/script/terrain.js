const Terrain = (() => {

    var tileRecyler;

    const tileInfo = {
        width: 48,
        height: 48
    };

    function update(container, camera) {
        tileRecyler.recycleAll();

        var toX = camera.viewArea.x / tileInfo.width;
        var toY = camera.viewArea.y / tileInfo.height;

        var cols = Math.ceil(camera.viewArea.width / tileInfo.width) + 1;
        var rows = Math.ceil(camera.viewArea.height / tileInfo.height) + 1;

        var imagePaths = ['area-WWWW', 'area-FFFF', 'area-GGGG', 'area-SSSS', 'area-MMMM'];
        var tileAtlas = Resources[Settings.images.everything].textures;
        var texture = tileAtlas[imagePath];

        var tile, imagePath, x, y;
        for (var j = 0; j < rows; j++) {
            y = Math.floor(toY + j);
            for (var i = 0; i < cols; i++) {
                x = Math.floor(toX + i);
                tile = tileRecyler.get();
                imagePath = imagePaths[Math.abs(x + y - x * y) % imagePaths.length];
                tile.texture = tileAtlas[imagePath];
                tile.x = x * tileInfo.width;
                tile.y = y * tileInfo.height;
                tile.anchor.x = 0;
                tile.anchor.y = 0;
                container.addChild(tile);
            }
        }
    }

    function create() {
        const container = new Container();

        container.update = (camera) => {
            update(container, camera);
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