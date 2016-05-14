var write = require('promise-path').write;
var report = require('../lib/report');
var handleError = require('../lib/handleError');
var convertBitmapToJSON = require('../lib/convertBitmapToJSON');

var bitmap = __dirname + '/../data/sample-map-100x100.png';
var destinationFile = __dirname + '/../data/sample-map.json';

convertBitmapToJSON(bitmap, function(result) {
    write(destinationFile, JSON.stringify(result, null, 2), 'utf8')
        .then(report(`Create sample map from bitmap: ${result.histogram.width}, ${result.histogram.height}`))
        .catch(handleError);
});

convertBitmapToJSON(bitmap);