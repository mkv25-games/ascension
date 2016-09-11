const Tweener = TweenMax;
const Tween = (() => {

    const animate = Tweener.to;

    function fadeIn(obj) {
        animate(object, 1.0, {autoAlpha: 1});
    }

    function fadeOut(obj) {
        animate(object, 1.0, {autoAlpha: 0});
    }

    return {
        fadeIn,
        fadeOut,
        animate
    };
})();