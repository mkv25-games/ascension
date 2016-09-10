const OutsideState = (() => {
    var avatar, terrain;

    function create(renderer, camera, ui, stage) {
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

        avatar = Avatar.create();
        stage.addChild(avatar);

        terrain.update(camera);
        renderer.render(ui);

        return () => {
            update(camera);
            avatar.update();
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

        if (Keyboard.Control.isDown) {
            camera.update(true);
        }
        terrain.update(camera);
    }

    return {
        create
    };
})();