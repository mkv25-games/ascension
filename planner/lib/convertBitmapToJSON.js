var getPixels = require('get-pixels');
var createHistogram = require('./createHistogram');
var tileTypes = require('../data/tileTypes');

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

        var tilePixelMap = {};
        tileTypes.tiles.forEach((tile) => {
            tilePixelMap[tile.palette.code] = tile;
        });

        var shape = pixels.shape.slice();
        var width = shape[0];
        var height = shape[1];
        var map = [];
        for (var j = 0; j < width; j++) {
            var row = [];
            for (var i = 0; i < height; i++) {
                pixel = pixels.getPixel(i, j);
                row[i] = (tilePixelMap[pixel.rgb] || {}).symbol || '#';
            }
            map[j] = row.join(':');
        }

        var histogram = createHistogram(pixels);

        console.log("Histogram", JSON.stringify(histogram, null, 2));

        (callback) ? callback({
            histogram,
            mapData: map
        }): null;
    });
}

module.exports = convertBitmapToJSON;