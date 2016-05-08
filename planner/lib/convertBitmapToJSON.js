var getPixels = require('get-pixels');
var createHistogram = require('./createHistogram');

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

module.exports = convertBitmapToJSON;