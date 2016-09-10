const OutsideState = (() => {
    var avatar, terrain;

    function create(renderer, camera, ui, stage) {
        var imagePath = 'area-WWWW';
        var tileAtlas = Resources[Settings.images.everything].textures;
        var texture = tileAtlas[imagePath];
        var tile = new Sprite(texture);

        tile.scale.x = tile.scale.y = 8;
        tile.anchor.x = tile.anchor.y = 0.5;
        tile.x = 0;
        tile.y = 0;
        tile.rotation = Math.PI / 4;

        tile.interactive = true;
        tile.mousedown = tile.touchstart = () => {
            tile.dragged = true;
            tile.interactive = true;
            stage.interactive = true;
            stage.mousemove = stage.touchmove = (event) => {
                const global = event.data.global;
                tile.x = (global.x - camera.x) / camera.scale.x;
                tile.y = (global.y - camera.y) / camera.scale.y;
            };
        };

        tile.mouseup = tile.touchend = tile.mouseupoutside = tile.touchendoutside = () => {
            stage.interactive = false;
            tile.dragged = false;
            delete stage.touchmove;
            delete stage.mousemove;
        };

        var message = new Text(
            "Ascend!", {
                font: "32px sans-serif",
                fill: "white"
            }
        );
        message.position.set(5, 50);
        ui.addChild(message);

        terrain = Terrain.create();
        stage.addChild(terrain);

        avatar = tile;

        stage.addChild(avatar);
        terrain.update(camera);
        renderer.render(ui);

        return () => {
            update(camera);
        };
    }

    function update(camera) {
        var target = (Keyboard.Control.isDown) ? camera.userOffset : avatar;
        var speed = (Keyboard.Shift.isDown) ? 50 : 5;

        if (Keyboard.Left.isDown) {
            target.x -= speed;
        }
        if (Keyboard.Right.isDown) {
            target.x += speed;
        }
        if (Keyboard.Up.isDown) {
            target.y -= speed;
        }
        if (Keyboard.Down.isDown) {
            target.y += speed;
        }

        if (Keyboard.Any.isUp && !avatar.dragged) {
            avatar.x = avatar.x * 0.9;
            avatar.y = avatar.y * 0.9;
            avatar.rotation += 0.01;
        } else {
            avatar.rotation -= 0.02;
        }

        avatar.scale.x = avatar.scale.y = 2; // * Math.sin(avatar.rotation);
        if (Keyboard.Control.isDown) {
            camera.update(true);
        }
        terrain.update(camera);
    }

    return {
        create
    };
})();