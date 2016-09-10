const Recycler = (() => {

    function create(constructor, recycler) {
        const inUse = [];
        const recycled = [];

        if (!constructor) {
            throw 'No constructor function set for recycler; supply a function to create a new object';
        }

        if (!recycler) {
            throw 'No recycle function set for recycler; supply a function to recycle an instance, i.e. to reset its properties';
        }

        function get() {
            var instance;
            if (recycled.length > 0) {
                instance = recycled.pop();
            } else {
                instance = constructor();
            }
            inUse.push(instance);
            return instance;
        }

        function recycle(instance) {
            recycler(instance);
            recycled.push(instance);
            const i = inUse.indexOf(instance);
            inUse.splice(i, 1);
        }

        function recycleAll() {
            var instance;
            while (inUse.length > 0) {
                instance = inUse.pop();
                recycler(instance);
                recycled.push(instance);
            }
        }

        return {
            get,
            recycle,
            recycleAll
        };
    }

    return {
        create
    };
})();