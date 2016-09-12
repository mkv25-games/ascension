const Avatar = (() => {

    const animMap = {
        walkNorth: ['01', '02', '03', '02'],
        walkEast: ['04', '05', '06', '05'],
        walkSouth: ['07', '08', '09', '08'],
        walkWest: ['10', '11', '12', '11'],
        stopNorth: ['02'],
        stopEast: ['05'],
        stopSouth: ['08'],
        stopWest: ['11']
    };

    const directionMap = {
        '-0': 'West',
        '--': 'West',
        '-+': 'West',
        '0+': 'South',
        '+0': 'East',
        '++': 'East',
        '+-': 'East',
        '0-': 'North',
        '00': 'South'
    };

    function update(avatar) {
        const gametime = Time.counter;

        if (Math.abs(avatar.vx) + Math.abs(avatar.vy) < 0.1) {
            avatar.animation = animMap['stop' + avatar.direction];
        } else {
            avatar.x += avatar.vx;
            avatar.y += avatar.vy;
            avatar.vx *= 0.9;
            avatar.vy *= 0.9;
            avatar.tristate = tristate(Math.round(avatar.vx * 10)) + tristate(Math.round(avatar.vy * 10));
            avatar.direction = directionMap[avatar.tristate];
            avatar.animation = animMap['walk' + avatar.direction];
        }
        const frame = Math.floor((gametime / 10) % avatar.animation.length);

        avatar.spriteRecycler.recycleAll();
        avatar.layers.forEach((layerId) => {
            const layer = avatar.spriteRecycler.get();
            const textureId = `${layerId}-${avatar.animation[frame]}`;
            layer.texture = Resources[Settings.images.everything].textures[textureId];
            layer.anchor.x = layer.anchor.y = 0.5;
            layer.interactive = true;
            avatar.addChildAt(layer, 0);
            avatar.lastLayerCount++;
        });

        avatar.textbox.text = `${avatar.vx.toFixed(2)}, ${avatar.vy.toFixed(2)}, ${avatar.tristate}, ${avatar.direction}`;
        avatar.textbox.position.set(-avatar.textbox.width / 2, -40);
    }

    function create(layers) {
        layers = layers || ['scientist'];
        var avatar = new Container();

        avatar.layers = layers;
        avatar.animation = animMap.walkSouth;
        avatar.interactive = true;
        avatar.vx = 0;
        avatar.vy = 0;
        avatar.tristate = tristate(Math.round(avatar.vx * 10)) + tristate(Math.round(avatar.vy * 10));
        avatar.direction = directionMap[avatar.tristate];

        const textbox = new Text(
            'Player Avatar', {
                font: "10px sans-serif",
                fill: "white",
                align: "center"
            }
        );
        textbox.position.set(-textbox.width / 2, -40);
        avatar.textbox = textbox;
        avatar.addChild(textbox);

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