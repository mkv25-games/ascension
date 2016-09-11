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

        touchControls = TouchControls.create();
        avatar.addChild(touchControls);

        terrain.update(camera);
        renderer.render(ui);

        return () => {
            update(camera);
            avatar.update();
        };
    }

    function update(camera) {
        updateAvatar();
        updateCamera(camera, avatar);
        terrain.update(camera);
    }

    function updateAvatar() {
        if (!Keyboard.Control.isDown) {
            const velocity = (Keyboard.Shift.isDown) ? 0.8 : 0.5;
            avatar.moving = false;

            if (Keyboard.Left.isDown) {
                avatar.vx = -velocity;
                avatar.moving = true;
            }
            if (Keyboard.Right.isDown) {
                avatar.vx = velocity;
                avatar.moving = true;
            }
            if (Keyboard.Up.isDown) {
                avatar.vy = -velocity;
                avatar.moving = true;
            }
            if (Keyboard.Down.isDown) {
                avatar.vy = velocity;
                avatar.moving = true;
            }
        }

        avatar.update();
    }

    function updateCamera(camera, avatar) {
        if (Keyboard.Control.isDown) {
            const speed = (Keyboard.Shift.isDown) ? 50 : 5;
            if (Keyboard.Left.isDown) {
                camera.userOffset.x += speed;
                avatar.moving = true;
            }
            if (Keyboard.Right.isDown) {
                camera.userOffset.x -= speed;
                avatar.moving = true;
            }
            if (Keyboard.Up.isDown) {
                camera.userOffset.y += speed;
                avatar.moving = true;
            }
            if (Keyboard.Down.isDown) {
                camera.userOffset.y -= speed;
                avatar.moving = true;
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