var auth = require('../auth.secret.json'),
  ftpClient = require('ftp-client'),
  config = {
    host: auth.host,
    port: 21,
    user: auth.user,
    password: auth.password
  },
  options = {
    logging: 'basic'
  };


const pkg = require('../package.json');
const baseDir = `/${pkg.version}`;

function connect() {
    const client = new ftpClient(config, options);
    return new Promise((accept, reject) => {
        client.connect(() => {
            accept(client);
        });
    });
}

function upload(glob, targetDir) {
    return connect().then((client) => {
        return new Promise((accept, reject) => {
            console.log(`Uploading ${glob} to ${targetDir}`);
            client.upload([glob], targetDir , {
                baseDir: targetDir,
                overwrite: 'older'
            }, function (result) {
                console.log(result);
                accept();
            });
        });
    });
}

Promise.resolve(true)
    .then(() => {
        return upload('./viewer.html', baseDir);
    })
    .then(() => {
        return upload('./build/**', `${baseDir}`);
    })
    .then(() => {
        return upload('./images/**', `${baseDir}`);
    })
    .then(() => {
        return upload('./lib/**', `${baseDir}`);
    })
    .catch((ex) => {
        console.error(ex, ex.stack);
    });
