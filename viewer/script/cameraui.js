const CameraUI = (() => {

    function updateBorder(border, camera) {
        border.clear();

        const lineWidth = 4 / camera.scale.x;
        const pad = 40 / camera.scale.x;
        const pad2 = pad * 2;

        border.lineStyle(lineWidth, 0xFF3300, 1);
        border.drawRect(camera.viewArea.x, camera.viewArea.y, camera.viewArea.width, camera.viewArea.height);

        border.lineStyle(lineWidth, 0xFFFFFF, 0.1);
        border.drawRect(camera.viewArea.x + pad, camera.viewArea.y + pad, camera.viewArea.width - pad2, camera.viewArea.height - pad2);
    }

    function updateText(textbox, camera) {
        textbox.text = `Camera Position: ${camera.x},${camera.y}, Scale: ${camera.scale.x}` + '\n' +
            `View Area: ${camera.viewArea.x},${camera.viewArea.y} Width: ${camera.viewArea.width}, Height: ${camera.viewArea.height}`;
    }

    function createUi() {
        var container = new Container();

        var textbox = new Text(
            'Camera Position', {
                font: "16px sans-serif",
                fill: "white"
            }
        );
        textbox.position.set(5, 100);

        container.addChild(textbox);

        container.update = (camera) => {
            updateText(textbox, camera);
        };

        return container;
    }

    function createBorder() {
        var border = new Graphics();
        border.lineStyle(4, 0xFF3300, 1);
        border.drawRect(-32, -32, 64, 64);

        border.update = (camera) => {
            updateBorder(border, camera);
        };

        return border;
    }

    return {
        createUi,
        createBorder
    };
})();