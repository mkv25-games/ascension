const Viewer = (function() {

    const TextureCache = PIXI.utils.TextureCache;
    const Loader = PIXI.loader;
    const Resources = Loader.resources;
    const Sprite = PIXI.Sprite;
    const Container = PIXI.Container;
    const ADR = PIXI.autoDetectRenderer;

    var renderer, stage, splash;
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
                'images/areas/area-FFFF.png',
                'images/areas/area-GGGG.png',
                'images/areas/area-MMMM.png',
                'images/areas/area-SSSS.png',
                'images/areas/area-WWWW.png'
            ]
        }
    };

    function start() {
        return prepareStage()
            .then(resize)
            .then(registerLoader)
            .then(loadStartingTiles)
            .then(removeSplash)
            .then(displayStartingTile)
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

    function displayStartingTile() {
        var imagePath = options.images.startingTiles[0];
        var tile = new Sprite(Resources[imagePath].texture);

        stage.addChild(tile);

        tile.scale.x = tile.scale.y = 8;
        tile.anchor.x = tile.anchor.y = 0.5;
        tile.x = renderer.width / 2;
        tile.y = renderer.height / 2;
        tile.rotation = Math.PI / 4;

        renderer.render(stage);
    }

    function prepareStage() {
        try {
            renderer = ADR(options.size.width, options.size.height, options.renderer);
            document.body.appendChild(renderer.view);

            stage = new Container();
            renderer.backgroundColor = options.theme.backgroundColor;
            renderer.render(stage);
        } catch (ex) {
            return Promise.reject(ex);
        }

        return Promise.resolve();
    }

    function resize() {
        renderer.view.style.position = 'absolute';
        renderer.view.style.display = 'block';
        renderer.autoResize = true;
        renderer.resize(window.innerWidth, window.innerHeight);
        renderer.render(stage);
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