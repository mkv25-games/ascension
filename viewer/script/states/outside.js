const OutsideState = (() => {
    var avatar, terrain;

    const dxMap = {

    };

    function create(renderer, ui, camera, model) {
        const stage = camera.stage;
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

        touchControls = TouchControls.create();
        avatar.addChild(touchControls);

        terrain.update(camera);
        renderer.render(ui);

        return () => {
            update(camera, model);
        };
    }

    function update(camera, model) {
        updateAvatar(model);
        updateCamera(camera, avatar);
        terrain.update(camera);
    }

    function updateAvatar(model) {
        var vx = 0, vy = 0;
        if (!Keyboard.Control.isDown) {
            if (Keyboard.Left.isDown) {
                vx -= 1;
            }
            if (Keyboard.Right.isDown) {
                vx += 1;
            }
            if (Keyboard.Up.isDown) {
                vy -= 1;
            }
            if (Keyboard.Down.isDown) {
                vy += 1;
            }
        }

        avatar.x = model.data.player.position.x;
        avatar.y = model.data.player.position.y;

        avatar.update(vx, vy, Keyboard.Shift.isDown);

        model.data.player.position.x = avatar.x;
        model.data.player.position.y = avatar.y;
    }

    function updateCamera(camera, avatar) {
        const speed = (Keyboard.Shift.isDown) ? 50 : 10;
        if (Keyboard.Control.isDown) {
            if (Keyboard.Left.isDown) {
                camera.userOffset.x += speed;
            }
            if (Keyboard.Right.isDown) {
                camera.userOffset.x -= speed;
            }
            if (Keyboard.Up.isDown) {
                camera.userOffset.y += speed;
            }
            if (Keyboard.Down.isDown) {
                camera.userOffset.y -= speed;
            }
        }
        else {
            // center on player avatar
            camera.userOffset.x = camera.userOffset.x - (camera.userOffset.x + avatar.x * camera.scale.x) * 0.1;
            camera.userOffset.y = camera.userOffset.y - (camera.userOffset.y + avatar.y * camera.scale.y) * 0.1;
        }
        camera.update(true);
    }

    return {
        create
    };
})();