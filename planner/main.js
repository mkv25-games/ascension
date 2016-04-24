var read = require('promise-path').read;
var areaTypes = require('./lib/areaTypes');

read('data/areaTypes.json', 'utf8')
    .then(JSON.parse)
    .then(areaTypes.list)
    .then(console.log)
    .catch((error) => {
        console.log(error, error.stack);
    });
