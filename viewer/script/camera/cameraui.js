const CameraUI = (() => {

    function create() {
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
            update(textbox, camera);
        };

        return container;
    }

    function update(textbox, camera) {
        const NL = '\n';
        textbox.text = `Camera Position: ${camera.x},${camera.y}, Scale: ${camera.scale.x}` + NL +
            `View Area: ${camera.viewArea.x},${camera.viewArea.y} Width: ${camera.viewArea.width}, Height: ${camera.viewArea.height}` + NL +
            `Build Time:  ${BuildTime}, Package Version: ${PackageVersion}`;
    }

    return {
        create
    };
})();