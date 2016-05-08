var getPixels = require('get-pixels');

function convertBitmapToJSON(bitmapPath, callback) {
    getPixels(bitmapPath, function(err, pixels) {
        if (err) {
            console.log("Bad image path")
            return
        }

        // computer, enhance
        pixels.getPixel = function(x, y) {
            var pixel = {
                r: pixels.get(x, y, 0),
                g: pixels.get(x, y, 1),
                b: pixels.get(x, y, 2)
            };

            pixel.rgb = [pixel.r, pixel.g, pixel.b].join(',');

            return pixel;
        };

        var histogram = createHistogram(pixels);

        console.log("Histogram", JSON.stringify(histogram, null, 2));

        (callback) ? callback({
            histogram
        }): null;
    });
}

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

module.exports = convertBitmapToJSON;