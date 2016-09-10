const Avatar = (() => {

    const animMap = {
        walkNorth: ['01', '02', '03', '02'],
        walkEast: ['04', '05', '06', '05'],
        walkSouth: ['07', '08', '09', '08'],
        walkWest: ['10', '11', '12', '11'],
        stopNorth: ['02'],
        stopEast: ['04'],
        stopSouth: ['07'],
        stopWest: ['10']
    };

    function update(avatar, gametime) {
        avatar.spriteRecycler.recycleAll();

        avatar.layers.forEach((layerId) => {
            const layer = avatar.spriteRecycler.get();
            const frame = (gametime / 20) % avatar.animation.length;
            const textureId = `${layerId}-${avatar.animation[frame]}`;
            layer.texture = Resources[Settings.images.everything].textures[textureId];
            avatar.addChild(layer);
        });
    }

    function create(layers) {
        layers = layers || ['scientist'];
        var avatar = new Container();

        var tileAtlas = Resources[Settings.images.everything].textures;
        var texture = tileAtlas[imagePath];

        avatar.spriteRecycler = Recycler.create(() => {
            return new Sprite();
        }, (instance) => {
            container.removeChild(instance);
            instance.texture = null;
        });

        avatar.update = (gametime) => {
            update(avatar, gametime);
        };

        return avatar;
    }

    return {
        create
    };
})();