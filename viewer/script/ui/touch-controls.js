TouchControls = (() => {
    function create() {
        const controls = new Container();

        const circle = createCircle();
        const triangle = createTriangle();

        registerTouchEvents(controls, circle, triangle);

        controls.addChild(circle);
        controls.addChild(triangle);

        return controls;
    }

    function createCircle() {
        const circle = new Graphics();
        circle.lineStyle(8, 0xFFFFFF, 0.4);
        circle.beginFill(0xFFFFFF, 0.1);
        circle.drawCircle(0,0,100);
        circle.endFill();
        return circle;
    }

    function createTriangle() {
        const triangle = new Graphics();
        triangle.endFill(0xFFFFFF, 1.0);
        triangle.drawPolygon([-10, 10, 10, 10, 0, 0]);
        triangle.endFill();
        return triangle;
    }

    function registerTouchEvents(container, circle, triangle) {
        var timeout = 0;
        container.interactive = true;
        container.mousedown = container.touchstart = (event) => {
            console.log('Controls mouse down');
            Tween.animate(circle, 1.0, {alpha: 1.0});

            clearTimeout(timeout);
            container.mouseup = container.mouseupoutside = container.touchend = container.touchendoutside = (event) => {
                console.log('Controls mouse up');
                timeout = setTimeout(() => {
                    Tween.animate(circle, 0.5, {alpha: 0.1});
                }, 5000);
            }
        };
    }

    return {
        create
    };
})();