const Viewer = (function() {

    var renderer, stage;
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
            .then(loadStartingTiles)
            .then(displayStartingTile)
    }

    function loadStartingTiles() {
        return new Promise((accept, reject) => {
            PIXI.loader
                .add(options.images.startingTiles)
                .load(accept);
        });
    }

    function displayStartingTile() {
        var imagePath = options.images.startingTiles[0];
        var tile = new PIXI.Sprite(
            PIXI.loader.resources[imagePath].texture
        );

        stage.addChild(tile);

        renderer.render(stage);
    }

    function prepareStage() {
        try {
            renderer = PIXI.autoDetectRenderer(options.size.width, options.size.height, options.renderer);
            document.body.appendChild(renderer.view);

            stage = new PIXI.Container();
            renderer.backgroundColor = options.theme.backgroundColor;
            renderer.render(stage);
        } catch (ex) {
            return Promise.reject(ex);
        }

        return Promise.resolve();
    }

    function resize() {
        renderer.view.style.position = "absolute";
        renderer.view.style.display = "block";
        renderer.autoResize = true;
        renderer.resize(window.innerWidth, window.innerHeight);
        renderer.render(stage);
    }

    function removeSplash() {
        var element = document.getElementById('splash');
        element.parentNode.removeChild(element);
        return element;
    }

    return {
        start,
        removeSplash
    };
})();