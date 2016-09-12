TouchControls = (() => {
    function create() {
        const controls = new Container();

        const circle = createCircle();
        const pointer = createPointer();

        registerTouchEvents(controls, circle, pointer);

        controls.addChild(circle);
        controls.addChild(pointer);

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

    function createPointer() {
        const pointer = new Graphics();
        pointer.beginFill(0xFFFFFF, 0.8);
        pointer.drawPolygon([-5, 0, 0, -10, 15, 0, 0, 10]);
        pointer.endFill();
        pointer.x = 100;
        pointer.scale.x = pointer.scale.y = 1.5;
        return pointer;
    }

    function registerTouchEvents(container, circle, pointer) {
        var timeout = 0;
        container.alpha = 0;
        container.interactive = true;
        container.mousedown = container.touchstart = (event) => {
            console.log('Controls mouse down');
            Tween.animate(container, 1.0, {alpha: 1.0});

            clearTimeout(timeout);
            container.mouseup = container.mouseupoutside = container.touchend = container.touchendoutside = (event) => {
                console.log('Controls mouse up');
                timeout = setTimeout(() => {
                    Tween.animate(container, 0.5, {alpha: 0.1});
                }, 5000);
            }
        };
    }

    return {
        create
    };
})();