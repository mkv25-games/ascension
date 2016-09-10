const Terrain = (() => {

    var tileRecyler;

    function update(container, camera) {
        tileRecyler.recycleAll();

        var cols = 8;
        var rows = 5;

        var imagePaths = ['area-WWWW.png', 'area-FFFF.png', 'area-GGGG.png', 'area-SSSS.png', 'area-MMMM.png'];
        var tileAtlas = Resources['images/textures/tiles.json'].textures;
        var texture = tileAtlas[imagePath];

        var tile, imagePath;
        for (var j = 0; j < rows; j++) {
            for (var i = 0; i < cols; i++) {
                tile = tileRecyler.get();
                imagePath = imagePaths[(i * j) % imagePaths.length];
                tile.texture = tileAtlas[imagePath];
                tile.x = i * tile.width;
                tile.y = j * tile.width;
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