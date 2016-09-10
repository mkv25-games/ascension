const Camera = (() => {

    function create(renderer) {
        var camera = new Container();
        camera.renderer = renderer;

        camera.update = (resized) => {
            update(camera, resized);
        };

        camera.ui = CameraUI.create();
        camera.visualBorder = CameraBorder.create();
        camera.stage = new Container();

        camera.addChild(camera.stage);
        camera.addChild(camera.visualBorder);

        return camera;
    }

    function update(camera, resized) {
        camera.resized = resized;
        camera.userOffset = camera.userOffset || {
            x: 0,
            y: 0
        };
        camera.stageOffset = camera.stageOffset || {
            x: 0,
            y: 0
        };
        camera.viewArea = camera.viewArea || {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };

        camera.stageOffset.x = camera.renderer.width / 2;
        camera.stageOffset.y = camera.renderer.height / 2;

        camera.x = Math.round(camera.stageOffset.x + camera.userOffset.x);
        camera.y = Math.round(camera.stageOffset.y + camera.userOffset.y);
        camera.scale.x = camera.scale.y = camera.renderer.width > camera.renderer.height ? 2 : 1;
        camera.viewArea.x = (-camera.x / camera.scale.x);
        camera.viewArea.y = (-camera.y / camera.scale.y);
        camera.viewArea.width = camera.renderer.width / camera.scale.x;
        camera.viewArea.height = camera.renderer.height / camera.scale.y;

        if (camera.resized) {
            camera.ui.update(camera);
            camera.visualBorder.update(camera);
            camera.resized = false;
        }
    }

    return {
        create
    };
})();