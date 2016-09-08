var Viewer = (function() {

    function start() {
        try {        
            var renderer = PIXI.autoDetectRenderer(256, 256);
            document.body.appendChild(renderer.view);
            var stage = new PIXI.Container();
            renderer.render(stage);
        }
        catch(ex) {
            return Promise.reject(ex);
        }
        return Promise.resolve(true);
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