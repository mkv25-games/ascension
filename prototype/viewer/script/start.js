const Viewer = (function() {

    var renderer, ui, camera;
    var state;
    var model;

    function start() {
        return prepareStage()
            .then(registerResize)
            .then(registerLoader)
            .then(loadTextures)
            .then(removeSplash)
            .then(createWorldModel)
            .then(loadInitialState)
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

    function loadTextures() {
        return new Promise((accept, reject) => {
            Loader
                .add(Settings.images.everything)
                .load(accept);
        });
    }

    function createWorldModel() {
        model = WorldModel.create();
    }

    function loadInitialState() {
        state = OutsideState.create(renderer, ui, camera, model);
    }

    function startGameLoop() {
        gameloop();
    }

    function gameloop() {
        try {
            Time.update();
            state();
            requestAnimationFrame(gameloop);
        }
        catch(ex) {
            // but go no further
            throw ex;
        }

        renderer.render(ui);
    }

    function prepareStage() {
        try {
            renderer = ADR(Settings.size.width, Settings.size.height, Settings.renderer);
            renderer.backgroundColor = Settings.theme.backgroundColor;

            document.body.appendChild(renderer.view);

            ui = new Container();
            camera = Camera.create(renderer);
            ui.addChild(camera);
            ui.addChild(camera.ui)

        } catch (ex) {
            return Promise.reject(ex);
        }

        return Promise.resolve();
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
        camera.update(true);
        renderer.render(ui);
    }

    function removeSplash() {
        const splash = document.getElementById('splash');
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