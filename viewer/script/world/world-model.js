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
                    },
                    '-1,0': {
                        x: -1,
                        y: 0,
                        tiles: "M:24:G:24:M:24:G:24:M:23:G:3:G:22:M:23:G:3:G:22:M:22:G:4:G:22:M:21:G:4:G:23:M:18:F:2:M:G:4:F:3:G:20:M:16:F:4:G:4:G:F:4:G:19:M:14:F:3:G:7:G:F:5:G:18:M:13:F:2:G:9:G:F:5:G:18:M:12:F:G:3:F:5:G:3:G:2:F:4:G:18:M:11:F:G:3:F:2:M:2:F:2:M:G:2:G:3:F:3:G:18:M:9:F:2:G:3:F:2:M:6:G:2:G:4:F:3:G:17:M:8:F:7:M:8:G:2:G:3:F:3:G:17:M:7:F:4:M:12:G:3:G:3:F:2:G:17:M:24:G:G:3:F:3:G:17:M:24:G:G:3:F:3:G:17:M:15:M:M:3:M:2:M:3:G:G:2:F:3:G:12:F:2:G:4:M:14:M:7:M:M:M:G:2:F:4:G:11:F:4:G:3:M:15:M:8:G:3:F:2:G:3:G:9:F:5:G:3:M:10:F:2:M:3:M:M:M:6:G:G:G:5:G:9:F:5:G:4:M:7:F:10:M:2:F:M:2:G:2:G:G:5:G:8:F:4:G:6:M:5:F:7:G:5:F:3:G:9:G:7:F:6:G:6:M:4:F:3:M:4:F:5:G:10:G:2:G:G:6:F:6:G:G:3:G:S:2:M:4:F:M:11:F:G:18:F:5:G:5:S:3:M:16:M:F:2:G:16:F:3:G:5:S:3:W:2:M:16:M:2:G:9:F:3:G:12:S:3:W:3:M:16:M:G:9:F:5:G:11:S:2:W:4:M:17:G:8:F:6:G:10:S:2:W:5:M:16:G:8:F:6:G:9:S:3:W:6:M:16:G:7:F:6:G:10:W:9:M:13:F:2:G:7:F:4:G:11:W:11:M:9:F:5:G:8:F:3:G:10:W:13:M:8:F:3:G:10:F:3:G:9:W:15:M:8:G:4:F:3:G:6:F:3:G:7:W:17:M:6:F:2:G:2:F:2:M:4:G:5:F:2:G:6:W:19:M:5:F:4:M:8:G:11:W:20:M:5:F:2:M:10:G:10:S:W:20:M:18:G:8:S:2:W:20:M:19:G:7:S:W:21:M:19:G:6:S:2:W:21:M:20:G:5:S:W:22:M:20:G:5:S:W:22:M:22:G:2:S:2:W:22:M:24:S:2:W:22:M:24:S:2:W:22:M:24:S:2:W:22:M:24:S:2:W:22",
                        dimensions: {
                            width: 48,
                            height: 48
                        },
                        items: []
                    },
                    '-1,-1': {
                        x: -1,
                        y: -1,
                        tiles: "S:24:M:24:S:24:M:24:S:24:M:24:S:24:M:2:M:22:S:23:M:2:M:23:S:22:M:2:M:24:S:21:S:6:M:21:S:20:M:G:2:M:2:S:2:M:21:S:19:M:G:3:M:M:2:S:M:2:S:M:18:S:17:M:3:G:F:G:M:2:M:S:M:2:S:M:18:S:16:M:G:6:M:2:M:S:M:21:S:15:M:2:G:5:M:2:S:3:M:21:S:14:M:3:G:2:F:G:2:M:S:2:M:8:S:M:14:S:13:G:2:M:G:2:F:G:3:M:S:M:M:12:G:2:M:9:S:12:G:9:M:2:S:M:M:3:S:M:19:S:11:M:G:2:M:G:3:M:2:G:M:2:S:M:M:5:S:M:17:S:10:M:10:G:3:S:M:M:8:S:4:M:11:S:10:M:11:G:S:3:M:6:S:3:M:2:S:2:M:3:G:2:M:5:S:9:M:5:S:M:6:S:2:M:S:2:M:M:3:S:2:M:5:S:M:3:G:2:M:5:S:9:M:7:S:6:M:3:S:6:M:6:S:M:10:S:8:G:3:M:4:S:2:M:8:M:2:S:2:G:M:7:S:2:M:9:S:7:M:3:G:M:4:S:M:6:S:2:M:M:4:G:M:8:S:M:9:S:5:M:5:G:M:3:S:2:M:2:S:M:7:M:3:G:M:8:S:2:M:8:S:3:M:7:G:3:M:S:M:10:M:M:G:3:M:2:G:M:6:S:2:M:7:M:3:M:M:M:3:M:4:G:3:M:8:M:2:G:3:S:M:6:G:M:4:S:4:M:3:G:M:4:M:2:M:S:M:6:G:M:4:M:4:G:3:M:2:S:2:M:13:S:2:M:G:2:M:9:S:M:3:G:2:M:3:S:M:2:G:3:M:5:S:M:14:S:G:3:M:13:G:M:4:S:M:G:2:M:M:5:S:2:M:13:G:5:M:13:G:M:4:M:2:G:M:M:3:G:M:3:S:M:2:G:2:M:3:G:M:4:G:6:M:13:G:2:M:3:M:G:2:M:M:M:G:M:4:S:M:10:G:8:M:14:G:3:M:2:G:M:2:M:7:S:3:M:3:S:M:S:M:G:9:M:9:S:2:M:3:G:F:G:4:M:4:M:5:S:4:M:S:5:G:9:M:18:G:3:M:3:M:5:S:8:F:S:G:4:F:G:4:M:20:G:2:M:M:2:G:M:4:S:9:G:4:F:G:4:M:12:G:M:8:G:2:M:6:S:4:F:S:4:G:10:M:12:G:M:4:G:2:M:2:G:2:M:6:S:4:F:S:2:G:12:M:22:G:M:6:S:F:2:S:4:G:5:F:2:G:5:M:22:G:2:M:5:S:6:G:6:F:2:G:5:M:19:G:M:3:G:M:3:G:M:3:S:3:G:14:M:22:M:G:2:M:6:S:G:16:M:21:M:2:M:G:M:6:G:4:F:2:G:5:F:2:G:4:M:21:M:3:G:2:M:3:G:6:F:2:G:5:F:2:G:4:M:21:M:4:G:3:G:20:M:21:M:M:M:4:G:21:M:21:M:M:M:3:G:6:F:G:7:F:2:G:6:M:23:M:3:G:14:F:2:G:6:M:23:M:2:G:23:M:24:G:24",
                        dimensions: {
                            width: 48,
                            height: 48
                        },
                        items: []
                    },
                    '0,-1': {
                        x: 0,
                        y: -1,
                        tiles: "M:24:S:W:23:M:24:S:W:23:M:24:S:W:23:M:23:S:2:W:23:M:23:S:W:24:M:22:S:2:W:24:M:22:S:W:W:24:M:21:S:2:W:W:24:M:21:S:W:2:W:24:M:21:S:W:2:W:24:M:20:S:2:W:2:W:24:M:20:S:W:3:W:24:M:20:S:W:3:W:24:M:20:S:2:W:2:W:24:M:21:S:W:2:W:24:M:21:S:W:2:W:24:M:21:S:W:2:W:24:M:21:S:2:W:W:3:W:3:W:18:M:18:M:2:M:2:S:W:W:3:W:3:W:18:M:18:M:2:M:2:S:2:W:W:5:W:S:8:W:9:M:18:M:3:M:G:S:W:W:5:S:2:M:3:W:M:3:S:2:W:7:M:19:M:2:G:2:S:2:W:4:S:2:M:4:W:M:4:S:3:W:5:M:19:M:G:4:S:W:3:S:2:M:4:W:3:M:6:S:2:W:3:M:M:M:8:M:2:M:M:M:4:G:6:S:5:M:4:W:4:M:7:S:4:G:M:14:G:3:G:2:M:2:G:4:S:2:M:M:M:2:W:5:M:11:G:3:M:9:G:6:M:6:G:2:M:3:M:3:W:5:M:11:G:4:M:6:G:7:M:7:G:2:M:3:M:3:W:4:M:12:G:5:M:4:G:3:M:G:3:M:7:G:2:M:4:M:2:W:5:M:12:G:12:M:2:G:3:M:6:G:2:M:5:W:4:M:14:G:11:M:3:G:3:M:4:G:G:2:M:3:M:3:W:3:M:15:G:11:M:4:G:2:M:4:G:3:M:7:W:M:16:G:4:F:G:5:M:6:G:2:M:2:G:3:M:2:M:23:G:10:M:6:G:2:M:2:G:2:M:2:M:24:G:9:M:7:G:5:M:4:M:23:G:8:M:7:G:6:M:3:M:24:G:8:M:5:G:5:M:G:2:M:3:M:24:G:F:2:G:2:F:G:3:M:3:G:5:M:2:G:M:4:M:24:G:F:2:G:2:F:G:9:M:3:G:2:M:4:M:24:G:7:F:2:G:5:M:4:G:2:M:4:M:24:G:7:F:2:G:3:M:6:G:3:M:3:M:24:G:10:M:8:G:3:M:4:M:23:G:4:F:G:6:M:8:G:3:M:3:M:23:G:12:M:8:G:2:M:3:M:23:G:9:F:G:4:M:6:G:3:M:3:M:22:G:15:M:5:G:3:M:3:M:22:G:18:M:2:G:4:M:M:23:G:24:M:24:G:24:M:24",
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