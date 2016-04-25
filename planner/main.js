var read = require('promise-path').read;
var write = require('promise-path').write;
var areaTypes = require('./lib/areaTypes');

read('data/areaTypes.json', 'utf8')
    .then(JSON.parse)
    .then((areaData) => {
        return areaTypes.add(areaData);
    })
    .then((results) => {
        return JSON.stringify(results, null, 2);
    })
    .then((areaData) => {
        return write('data/areaTypes.json', areaData, 'utf8');
    })
    .catch((error) => {
        console.log(error, error.stack);
    });
