TouchControls = (() => {

    function update(controls, model) {
        controls.vx = 0;
        controls.vy = 0;

        if (!Keyboard.Control.isDown) {
            if (Keyboard.Left.isDown) {
                controls.vx -= 1;
            }
            if (Keyboard.Right.isDown) {
                controls.vx += 1;
            }
            if (Keyboard.Up.isDown) {
                controls.vy -= 1;
            }
            if (Keyboard.Down.isDown) {
                controls.vy += 1;
            }
        }

        controls.vx += controls.touchVx || 0;
        controls.vy += controls.touchVy || 0;

        model.data.player.position.vx = controls.vx;
        model.data.player.position.vy = controls.vy;
        model.data.player.position.running = (Keyboard.Shift.isDown || controls.running);
    }

    function create(model) {
        const controls = new Container();

        const circle = createCircle();
        const pointer = createPointer();

        registerTouchEvents(controls, circle, pointer, model);

        controls.addChild(circle);
        controls.addChild(pointer);

        controls.update = () => {
            return update(controls, model);
        };

        Keyboard.GridToggle.press = () => {
            model.ui.gridVisible = !model.ui.gridVisible;
        };

        Keyboard.InterpolateToggle.press = () => {
            model.ui.interpolationMode = (model.ui.interpolationMode + 1) % Object.keys(WorldModel.InterpolationModes).length;
        };

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

    function registerTouchEvents(controls, circle, pointer, model) {
        var timeout = 0;
        controls.alpha = 0;
        controls.interactive = true;
        controls.moveActive = false;
        controls.mousedown = controls.touchstart = (event) => {
            // Show controls
            Tween.animate(controls, 1.0, {alpha: 1.0});

            // Sort out delayed hide
            clearTimeout(timeout);
            controls.mouseup = controls.mouseupoutside = controls.touchend = controls.touchendoutside = (event) => {
                timeout = setTimeout(() => {
                    Tween.animate(controls, 0.5, {alpha: 0.1});
                }, 5000);

                // Clean up mouse movement
                controls.mousemove = controls.touchmove = null;
                controls.touchVx = 0;
                controls.touchVy = 0;
                controls.running = false;

                // Hide pointer
                Tween.animate(pointer, 0.5, {alpha: 0.0});
                Tween.animate(pointer.scale, 0.5, {x: 0.5, y: 0.5});
            };

            // Handle mouse movement
            var lastRailed;
            controls.mousemove = controls.touchmove = (event) => {
                const position = event.data.getLocalPosition(controls);
                const distance = Math.hypot(position.x, position.y);
                const theta = Math.atan2(position.y, position.x);
                const railed = Math.round(theta / (Math.PI / 4)) * (Math.PI / 4);

                // Lock running slightly to prevent border-line flicker
                if(controls.running) {
                    controls.running = distance > 80;
                    pointer.distance = 100;
                }
                else {
                    controls.running = distance > 100;
                    pointer.distance = 50;
                }

                // Position pointer
                pointer.rotation = railed;
                pointer.dx = Math.cos(railed);
                pointer.dy = Math.sin(railed);
                pointer.x = pointer.distance * pointer.dx;
                pointer.y = pointer.distance * pointer.dy;

                // Interface to outside world
                controls.touchVx = tristateValue(Math.round(pointer.dx));
                controls.touchVy = tristateValue(Math.round(pointer.dy));

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