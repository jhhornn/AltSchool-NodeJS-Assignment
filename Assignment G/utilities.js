const path = require('path');

function requestBookAndParse(req, res) {
    return new Promise((resolve, reject) => {
        const body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        })

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            if (!parsedBody){
                reject('Nothing parsed')
            }else{
                const jsonParsedBody = JSON.parse(parsedBody);
                resolve(jsonParsedBody);
            }
        })
    })
}

function accessDatabase(datafile) {
    let directory = __dirname.split(path.sep);
    databaseDirectory = directory.slice(0, directory.indexOf('Assignment G')+1);
    databaseDirectory.push('database');
    databaseDirectory = databaseDirectory.join(`${path.sep}`);
    const bookLibrary = path.join(databaseDirectory, datafile);
    return bookLibrary;

}


module.exports = {
    requestBookAndParse,
    accessDatabase
}