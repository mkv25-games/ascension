const Terrain = (() => {

    function update(container, camera) {
        
    }

    function create() {
        const container = new Container();

        container.update = (camera) => {
            update(container, camera);
        };

        return container;
    }

    return {
        create
    };
})();