const Time = (() => {
    const state = {
        gameStart: Date.now(),
        lastTime: Date.now(),
        timeSinceLastFrame: 0,
        gameTime: 0
    };

    state.update = () => {
        state.now = Date.now();
        state.timeSinceLastFrame = state.now - state.lastTime;
        state.lastTime = state.now;
        state.gameTime = state.now - state.gameStart;
    };

    return state;
})();