const OutsideState = (() => {
    var avatar, terrain, playerControls;

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

        terrain = Terrain.create(model);
        stage.addChild(terrain);

        avatar = Avatar.create();
        stage.addChild(avatar);

        playerControls = PlayerControls.create(model);
        avatar.addChild(playerControls);

        terrain.update(camera);
        renderer.render(ui);

        return () => {
            update(camera, model);
        };
    }

    function update(camera, model) {
        playerControls.update(model);
        avatar.update(model);
        updateCamera(camera, avatar);
        terrain.update(camera);
    }

    function updateCamera(camera, avatar) {
        const speed = (Keyboard.Shift.isDown) ? 200 : 50;
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