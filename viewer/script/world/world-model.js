const WorldModel = (() => {
    
    // TODO: Load and save state via server / cookies / sommat

    function save(model) {
        // who knows what this does
    }

    function load(model) {
        // again, who knows what this does
    }

    function create() {
        const model = {};
        model.data = {
            player: {
                name: 'Avatar',
                position: {
                    x: 0,
                    y: 0,
                    direction: 'S',
                    speed: 'stop'
                },
                clothing: [
                    'scientist'
                ]
            },
            world: {
                name: 'The Void',
                size: {
                    width: Infinity,
                    height: Infinity
                },
                type: 'procedural'
            }
        };

        model.save = () => {
            save(model);
        };

        model.load = () => {
            load(model);
        };

        return model;
    }

    return {
        create
    };
})();