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
                name: 'The Void',
                id: 'test',
                size: {
                    width: Infinity,
                    height: Infinity
                },
                type: 'procedural',
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
                    },
                    '-1,0': {
                        x: -1,
                        y: 0,
                        tiles: AreaLayouts.layouts.SSMG,
                        dimensions: {
                            width: 48,
                            height: 48
                        },
                        items: []
                    },
                    '-1,-1': {
                        x: -1,
                        y: -1,
                        tiles: AreaLayouts.layouts.GFSS,
                        dimensions: {
                            width: 48,
                            height: 48
                        },
                        items: []
                    },
                    '0,-1': {
                        x: 0,
                        y: -1,
                        tiles: AreaLayouts.layouts.MFSF,
                        dimensions: {
                            width: 48,
                            height: 48
                        },
                        items: []
                    }
                }
            }
        };

        model.data.world.areas = WorldGenerator.create(4, 4, 500);

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
        BASE_ONLY: 2,
        SURFACE_ONLY: 3
    };

    return {
        create,
        InterpolationModes
    };
})();