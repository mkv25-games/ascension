TouchControls = (() => {
    function create() {
        const controls = new Container();

        const circle = new Graphics();
        circle.lineStyle(8, 0xFFFFFF, 0.4);
        circle.beginFill(0xFFFFFF, 0.1);
        circle.drawCircle(0,0,100);
        circle.endFill();
        circle.interactive = true;

        var timeout = 0;
        circle.mousedown = circle.touchstart = (event) => {
            Tween.animate(circle, 1.0, {alpha: 1.0});
            if(timeout > 0) {
                clearTimeout(0);
            }

            timeout = setTimeout(() => {
                Tween.animate(circle, 0.5, {alpha: 0.1});
            }, 5000);
        };

        controls.addChild(circle);

        return controls;
    }

    return {
        create
    };
})();