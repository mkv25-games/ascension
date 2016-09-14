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
                        tiles: "G:24:M:24:G:24:M:24:G:24:M:24:G:24:M:24:G:24:M:24:G:24:M:24:G:24:M:24:G:24:M:24:G:24:M:24:G:25:M:23:G:20:F:2:G:3:M:23:G:13:F:2:G:4:F:3:G:3:M:23:G:4:F:2:G:7:F:3:G:3:F:2:G:5:M:22:G:4:F:3:G:19:M:22:G:5:F:2:G:19:M:22:G:5:F:3:G:12:F:2:G:2:F:G:2:M:21:G:5:F:5:G:4:F:3:G:2:F:3:G:5:M:21:G:5:F:5:G:4:F:3:G:2:F:2:G:6:M:2:F:4:M:15:G:5:F:6:G:16:F:7:M:14:G:5:F:7:G:10:F:G:4:F:8:M:13:G:5:F:7:G:10:F:G:4:F:11:M:10:G:5:F:9:G:13:F:12:M:9:G:6:F:9:G:13:F:12:M:8:G:6:F:11:G:2:F:G:8:F:16:M:4:S:6:F:17:G:6:F:19:W:2:S:5:F:18:G:5:F:18:W:5:S:3:F:19:G:3:F:18:W:6:S:3:F:20:G:3:F:16:W:6:S:4:F:20:G:4:F:14:W:7:S:4:F:20:G:4:F:13:W:F:W:5:S:6:F:14:G:9:F:12:W:F:W:2:F:W:2:S:F:S:6:F:11:G:5:F:2:G:3:F:12:W:7:S:10:F:6:G:4:F:8:G:3:F:10:W:7:S:3:F:S:10:F:2:G:F:12:G:4:F:8:W:2:F:W:4:S:16:G:F:13:G:4:F:7:W:6:S:6:F:S:11:F:14:G:10:W:6:S:3:F:S:5:F:S:3:F:S:5:F:13:G:10:W:5:S:7:F:S:6:F:S:5:F:13:G:4:F:6:W:2:F:W:2:S:2:F:S:8:F:S:9:F:12:G:3:F:7:W:5:S:11:F:S:4:F:S:4:F:11:G:3:F:8:W:4:S:6:W:5:S:11:G:5:F:5:G:3:F:9:W:4:S:4:W:10:S:8:F:4:G:F:5:G:2:F:10:W:S:6:W:12:S:7:F:4:G:F:4:G:3:F:10:W:S:4:W:16:S:5:F:3:G:2:F:4:G:2:F:11:W:22:S:3:F:4:G:F:5:G:2:F:11:W:23:S:2:F:4:G:F:2:G:5:F:11:W:23:S:2:F:4:G:4:F:2:G:2:F:11:W:23:S:F:11:G:2:F:11",
                        dimensions: {
                            width: 48,
                            height: 48
                        },
                        items: []
                    }
                }
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