const variations = ['forest', 'grass', 'mountain', 'sand', 'water', 'template'];
const types = variations.map((variation) => {
    const name = variation.toUpperCase();
    const key = name.charAt(0);
    const folder = variation;
    return {
        name,
        key,
        folder
    };
});

module.exports = types;