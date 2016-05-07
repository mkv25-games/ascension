function combine(variants, iterations) {
    var combinations = expand(variants, iterations);

    combinations = reduce(combinations);

    return {
        variants: variants,
        length: iterations,
        count: combinations.length,
        combinations: combinations
    };
}

function expand(variants, iterations) {
    var combinations = [
        []
    ];

    for (var i = 0; i < iterations; i++) {
        combinations = multiply(combinations, variants);
    }

    return combinations;
}

function reduce(combinations) {
    return combinations.map((combination) => {
        return combination.join('');
    });
}

function multiply(combinations, variants) {
    var result = [];

    combinations.forEach((combination) => {
        variants.forEach((variant) => {
            result.push(combination.concat(variant));
        });
    });

    return result;
}

module.exports = {
    combine
};