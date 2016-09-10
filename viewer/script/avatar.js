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

    function update(avatar) {
        const gametime = Time.counter;
        avatar.spriteRecycler.recycleAll();
        avatar.layers.forEach((layerId) => {
            const layer = avatar.spriteRecycler.get();
            const frame = Math.floor((gametime / 10) % avatar.animation.length);
            const textureId = `${layerId}-${avatar.animation[frame]}`;
            layer.texture = Resources[Settings.images.everything].textures[textureId];
            layer.anchor.x = layer.anchor.y = 0.5;
            layer.interactive = true;
            avatar.addChild(layer);
            avatar.lastLayerCount++;
        });
    }

    function create(layers) {
        layers = layers || ['scientist'];
        var avatar = new Container();

        avatar.layers = layers;
        avatar.animation = animMap.walkSouth;
        avatar.interactive = true;

        avatar.spriteRecycler = Recycler.create(() => {
            return new Sprite();
        }, (instance) => {
            avatar.removeChild(instance);
        });

        avatar.update = () => {
            update(avatar);
        };

        avatar.update();

        return avatar;
    }

    return {
        create
    };
})();