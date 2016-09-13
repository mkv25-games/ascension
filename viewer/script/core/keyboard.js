const Keyboard = (() => {

    const Keys = {};
    const KeyIndex = {};
    const KeyMap = {
        Left: [37, 65],
        Up: [38, 87],
        Right: [39, 68],
        Down: [40, 83],
        Shift: 16,
        Control: [17, 91],
        Any: true
    };
    var AnyKey;

    function createKey(keyCode) {
        var key = {};
        key.code = keyCode;
        key.isDown = false;
        key.isUp = true;
        key.press = undefined;
        key.release = undefined;
        key.lastEvent = undefined;
        return key;
    }

    function createKeyHandlers() {

        // Attach event listeners
        if (typeof window !== null) {
            // Handle key down
            window.addEventListener("keydown", (event) => {
                const key = KeyIndex[event.keyCode];
                if (key) {
                    if (key.isUp && key.press) key.press();
                    key.isDown = true;
                    key.isUp = false;
                    key.lastEvent = event;
                    event.preventDefault();
                } else {
                    console.info('No keybinding has been set for', event);
                }

                if (AnyKey.isUp && AnyKey.press) AnyKey.press();
                AnyKey.isDown = true;
                AnyKey.isUp = false;
            }, false);

            // Handle key up
            window.addEventListener("keyup", (event) => {
                const key = KeyIndex[event.keyCode];
                if (key) {
                    if (key.isDown && key.release) key.release();
                    key.isDown = false;
                    key.isUp = true;
                    key.lastEvent = event;
                    event.preventDefault();
                }

                if (AnyKey.isUp && AnyKey.press) AnyKey.release();
                AnyKey.isDown = false;
                AnyKey.isUp = true;
            }, false);
        } else {
            console.error('No window object found to bind Keyboard');
        }
    }

    function setup() {
        Object.keys(KeyMap).forEach((keyName) => {
            const keyCode = KeyMap[keyName];
            Keys[keyName] = createKey(keyCode);
            if (keyCode.forEach) {
                keyCode.forEach((code) => {
                    KeyIndex[code] = Keys[keyName];
                });
            } else {
                KeyIndex[keyCode] = Keys[keyName];
            }
        });
        AnyKey = Keys.Any;

        createKeyHandlers();
    }

    setup();

    return Keys;
})();
