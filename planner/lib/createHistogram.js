function createHistogram(pixels) {
    var shape = pixels.shape.slice();
    var width = shape[0];
    var height = shape[1];
    var histogram = {
        pixelCount: width * height,
        width,
        height
    };
    var pixel;
    for (var j = 0; j < width; j++) {
        for (var i = 0; i < height; i++) {
            pixel = pixels.getPixel(i, j);
            histogram[pixel.rgb] = histogram[pixel.rgb] || {
                count: 0,
                percentage: 0
            };
            histogram[pixel.rgb].count++;
        }
    }

    Object.keys(histogram).forEach((key) => {
        var colour = histogram[key];
        colour.percentage = (colour.count / histogram.pixelCount);
    });

    return histogram;
}

module.exports = createHistogram;