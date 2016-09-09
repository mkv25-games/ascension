const Viewer = (function() {

    var renderer, ui, camera, stage, splash;
    var cameraInfoText;
    const options = {
        size: {
            width: 512,
            height: 512,
        },
        theme: {
            backgroundColor: 0x061639
        },
        renderer: {
            antialias: false,
            transparent: false,
            resolution: 1
        },
        images: {
            startingTiles: [
                'images/textures/tiles.json'
            ]
        }
    };

    function start() {
        return prepareStage()
            .then(registerResize)
            .then(registerLoader)
            .then(loadStartingTiles)
            .then(removeSplash)
            .then(displayStartingTile)
            .then(startGameLoop)
    }

    function registerLoader() {
        Loader.on('progress', (loader, resource) => {
            const progress = loader.progress + '%';
            console.log('Loading', resource.url, progress);
            document.getElementById('loading-progress').textContent = progress;
        });

        return Promise.resolve();
    }

    function loadStartingTiles() {
        return new Promise((accept, reject) => {
            Loader
                .add(options.images.startingTiles)
                .load(accept);
        });
    }

    var startingTile;

    function displayStartingTile() {
        var imagePath = 'area-WWWW.png';
        var tileAtlas = Resources['images/textures/tiles.json'].textures;
        var texture = tileAtlas[imagePath];
        var tile = new Sprite(texture);

        tile.scale.x = tile.scale.y = 8;
        tile.anchor.x = tile.anchor.y = 0.5;
        tile.x = 0;
        tile.y = 0;
        tile.rotation = Math.PI / 4;

        var shape = new Graphics();
        shape.lineStyle(4, 0xFF3300, 1);
        shape.beginFill(0x66CCFF);
        shape.drawRoundedRect(-32, -32, 64, 64, 10);
        shape.endFill();
        shape.beginFill(0xCCFF66);
        shape.drawCircle(0, 0, 24);

        shape.lineStyle(4, 0xFFFFFF, 1);
        shape.moveTo(-25, -25);
        shape.lineTo(25, 25);

        shape.lineStyle(2, 0x000000, 1);
        shape.drawPolygon([10, 10, -10, 10, 10, -10, 10, 10]);

        shape.interactive = true;
        shape.mousedown = shape.touchstart = () => {
            shape.dragged = true;
            stage.interactive = true;
            stage.mousemove = stage.touchmove = (event) => {
                const global = event.data.global;
                shape.x = (global.x - camera.x) / camera.scale.x;
                shape.y = (global.y - camera.y) / camera.scale.y;
            };
        };

        shape.mouseup = shape.touchend = shape.mouseupoutside = shape.touchendoutside = () => {
            stage.interactive = false;
            shape.dragged = false;
            delete shape.mousemove;
        };

        var message = new Text(
            "Ascend!", {
                font: "32px sans-serif",
                fill: "white"
            }
        );
        message.position.set(5, 50);
        ui.addChild(message);

        startingTile = shape;

        stage.addChild(startingTile);
        renderer.render(ui);
    }

    function startGameLoop() {
        gameloop();
    }

    function gameloop() {
        requestAnimationFrame(gameloop);

        var state = tileState;

        state();

        renderer.render(ui);
    }

    function tileState() {
        var tile = startingTile;
        var target = (Keyboard.Control.isDown) ? camera.userOffset : tile;

        if (Keyboard.Left.isDown) {
            target.x -= 5;
        }
        if (Keyboard.Right.isDown) {
            target.x += 5;
        }
        if (Keyboard.Up.isDown) {
            target.y -= 5;
        }
        if (Keyboard.Down.isDown) {
            target.y += 5;
        }

        if (Keyboard.Any.isUp && !tile.dragged) {
            tile.x = tile.x * 0.9;
            tile.y = tile.y * 0.9;
            tile.rotation += 0.01;
        } else {
            tile.rotation -= 0.02;
        }

        tile.scale.x = tile.scale.y = 6 + 2 * Math.sin(tile.rotation);
        if (Keyboard.Control.isDown) {
            updateCamera(true);
        }
    }

    function prepareStage() {
        try {
            renderer = ADR(options.size.width, options.size.height, options.renderer);
            renderer.backgroundColor = options.theme.backgroundColor;

            document.body.appendChild(renderer.view);

            ui = new Container();
            camera = new Container();
            stage = new Container();

            ui.addChild(camera);
            camera.addChild(stage);
            updateCamera();

            cameraInfoText = new Text(
                'Camera Position', {
                    font: "16px sans-serif",
                    fill: "white"
                }
            );
            cameraInfoText.position.set(5, 100);

            ui.addChild(cameraInfoText);


        } catch (ex) {
            return Promise.reject(ex);
        }

        return Promise.resolve();
    }

    function updateCamera(dirty) {
        camera.dirty = dirty;
        camera.userOffset = camera.userOffset || {
            x: 0,
            y: 0
        };
        camera.stageOffset = {
            x: renderer.width / 2,
            y: renderer.height / 2
        };

        camera.x = Math.round(camera.stageOffset.x + camera.userOffset.x);
        camera.y = Math.round(camera.stageOffset.y + camera.userOffset.y);
        camera.scale.x = camera.scale.y = renderer.width > renderer.height ? 1 : 0.5;

        if (camera.dirty) {
            cameraInfoText.text = `Camera Position ${camera.x},${camera.y}, Scale: ${camera.scale.x}`;
            camera.dirty = false;
        }
    }

    function registerResize() {
        if (typeof window !== null) {
            window.onresize = resize;
        }
        resize();
    }

    function resize() {
        renderer.view.style.position = 'absolute';
        renderer.view.style.display = 'block';
        renderer.autoResize = true;
        renderer.resize(window.innerWidth, window.innerHeight);
        updateCamera(true);
        renderer.render(ui);
    }

    function removeSplash() {
        splash = document.getElementById('splash');
        splash.className = 'hidden';
        setTimeout(() => {
            splash.parentNode.removeChild(splash);
        }, 2000)
    }

    return {
        start
    };
})();

//* ? *//