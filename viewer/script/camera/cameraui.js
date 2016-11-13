const CameraUI = (() => {

    function create() {
        var container = new Container();

        var textbox = new Text(
            'Camera Position', {
                font: "18px sans-serif",
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
        var ht = camera.highlightedTile || {};
        textbox.text = `Camera Position: ${camera.x},${camera.y}, Scale: ${camera.scale.x}` + NL +
            `View Area: ${Math.round(camera.viewArea.x)},${Math.round(camera.viewArea.y)} Width: ${camera.viewArea.width}, Height: ${camera.viewArea.height}` + NL +
            `Build Time:  ${BuildTime}, Package Version: ${PackageVersion}` + NL +
            `Highlighted Tile: ${ht.symbol} : AR ${ht.arx}, ${ht.ary} WA ${ht.wax}, ${ht.way}, FX ${ht.fx}, ${ht.fy}`;
    }

    return {
        create
    };
})();