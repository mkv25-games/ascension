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
        container.moveActive = false;
        container.mousedown = container.touchstart = (event) => {
            // Show controls
            Tween.animate(container, 1.0, {alpha: 1.0});

            // Set logical action
            container.moveAvatar = true;

            // Sort out delayed hide
            clearTimeout(timeout);
            container.mouseup = container.mouseupoutside = container.touchend = container.touchendoutside = (event) => {
                timeout = setTimeout(() => {
                    Tween.animate(container, 0.5, {alpha: 0.1});
                }, 5000);

                // Clean up mouse movement
                container.mousemove = container.touchmove = null;
                container.moveAvatar = false;

                // Hide pointer
                Tween.animate(pointer, 0.5, {alpha: 0.0});
                Tween.animate(pointer.scale, 0.5, {x: 0.5, y: 0.5});
            };

            // Handle mouse movement
            var lastRailed;
            container.mousemove = container.touchmove = (event) => {
                const position = event.data.getLocalPosition(container);
                const theta = Math.atan2(position.y, position.x);
                const railed = Math.round(theta / (Math.PI / 4)) * (Math.PI / 4);

                // Position pointer
                pointer.rotation = railed;
                pointer.x = 100 * Math.cos(railed);
                pointer.y = 100 * Math.sin(railed);
                container.tristateX = tristate(pointer.x);
                container.tristateY = tristate(pointer.y);

                // Reset and show pointer
                if(lastRailed !== railed) {
                    showPointer(pointer);
                    lastRailed = railed;
                }
            };
        };
    }

    function showPointer(pointer) {
        pointer.alpha = 0.0;
        pointer.scale.x = 0.5;
        pointer.scale.y = 0.5;
        Tween.animate(pointer, 0.5, {alpha: 1.0});
        Tween.animate(pointer.scale, 0.5,  {x: 1.5, y: 1.5});
    }

    return {
        create
    };
})();