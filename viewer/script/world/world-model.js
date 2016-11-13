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
                    x: 500,
                    y: 500,
                    vx: 0,
                    vy: 0,
                    running: false,
                    direction: 'North'
                },
                clothing: [
                    'scientist'
                ]
            },
            world: {
                name: 'Boundless',
                id: 'boundless',
                size: {
                    width: Infinity,
                    height: Infinity
                },
                type: 'procedural',
                seed: 500,
                areas: {
                    '0,0': {
                        x: 0,
                        y: 0,
                        tiles: AreaLayouts.layouts.SFGM,
                        dimensions: {
                            width: 48,
                            height: 48
                        },
                        items: []
                    }
                }
            }
        };

        model.data.world.areas = {};
        model.data.world.areas['0,0'] = WorldGenerator.select(0, 0, model.data.world.seed);

        model.ui = {
            interpolationMode: InterpolationModes.ON
        };

        model.save = () => {
            save(model);
        };

        model.load = () => {
            load(model);
        };

        return model;
    }

    const InterpolationModes = {
        OFF: 0,
        ON: 1,
        SURFACE_ONLY: 2,
        BASE_ONLY: 3
    };

    return {
        create,
        InterpolationModes
    };
})();