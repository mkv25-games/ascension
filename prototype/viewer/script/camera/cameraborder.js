const CameraBorder = (() => {

    function create() {
        var border = new Graphics();
        border.lineStyle(4, 0xFF3300, 1);
        border.drawRect(-32, -32, 64, 64);

        border.update = (camera) => {
            updateBorder(border, camera);
        };

        return border;
    }

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

    return {
        create
    };
})();