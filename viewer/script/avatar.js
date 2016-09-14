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

    const validDirections = ['North', 'East', 'South', 'West'].reduce((result, direction) => {
        return direction;
    }, {});

    function loadFrom(avatar, model) {
        // force properties into existence
        model.position = model.position || {};
        model.clothing = model.clothing || [];

        // basic interface to outside world
        avatar.x = model.position.x || 0;
        avatar.y = model.position.y || 0;
        avatar.vx = model.position.vx || 0;
        avatar.vy = model.position.vy || 0;
        avatar.running = model.position.running || false;
        avatar.direction = model.position.direction;

        // awkard copy protection
        while(avatar.layers.length > 0) {
            avatar.layers.pop();
        }
        model.clothing.forEach((item) => {
            avatar.layers.push(item);
        });
    }

    function saveTo(avatar, model) {
        // responsible for keeping these values set
        // maybe use some kind of binder
        model.position.x = avatar.x;
        model.position.y = avatar.y;
        model.position.vx = avatar.vx;
        model.position.vy = avatar.vy;
        model.position.running = avatar.running;
        model.position.direction = avatar.direction;
    }

    function move(avatar, model) {
        avatar.tristate = tristate(avatar.vx) + tristate(avatar.vy);
        const moving = (avatar.vx || avatar.vy);
        if(moving) {
            avatar.speed = (avatar.running) ? 4 : 2.2;

            // limit speed to both directions
            avatar.theta = Math.atan2(avatar.vy, avatar.vx);
            avatar.vx = avatar.speed * Math.cos(avatar.theta);
            avatar.vy = avatar.speed * Math.sin(avatar.theta);
            avatar.x = avatar.x + avatar.vx;
            avatar.y = avatar.y + avatar.vy;
        }
        else {
            avatar.speed = 0;
        }
    }

    function selectAnimationFrame(avatar) {
        if (avatar.speed > 0) {
            avatar.direction = directionMap[avatar.tristate];
            avatar.animation = animMap['walk' + avatar.direction];
        } else {
            avatar.animation = animMap['stop' + avatar.direction];
        }
        avatar.animationFrame = Math.floor((Time.counter / 10) % avatar.animation.length);
    }

    function update(avatar, model) {

        loadFrom(avatar, model.data.player);
        move(avatar, model);
        selectAnimationFrame(avatar);

        avatar.spriteRecycler.recycleAll();
        avatar.layers.forEach((layerId) => {
            const layer = avatar.spriteRecycler.get();
            const textureId = `${layerId}-${avatar.animation[avatar.animationFrame]}`;
            layer.texture = Resources[Settings.images.everything].textures[textureId];
            layer.anchor.x = layer.anchor.y = 0.5;
            layer.interactive = true;
            avatar.addChildAt(layer, 0);
            avatar.lastLayerCount++;
        });

        avatar.textbox.text = `${avatar.vx.toFixed(2)}, ${avatar.vy.toFixed(2)}, ${avatar.tristate}, ${avatar.speed}, ${avatar.direction}`;
        avatar.textbox.position.set(-avatar.textbox.width / 2, -40);

        saveTo(avatar, model.data.player);
    }

    function create(layers) {
        layers = layers || ['scientist'];
        var avatar = new Container();

        avatar.layers = layers;
        avatar.animation = animMap.walkSouth;
        avatar.interactive = true;
        avatar.vx = 0;
        avatar.vy = 0;
        avatar.tristate = '00';
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

        avatar.update = (...args) => {
            return update.apply(avatar, [avatar].concat(args));
        };

        return avatar;
    }

    return {
        create
    };
})();