const path = require('path');
const {requestBookAndParse} = require('./../../utilities.js');


let directory = __dirname.split(path.sep)
let databaseDirectory = directory.slice(0, directory.indexOf('Assignment G')+1);
databaseDirectory.push('database');
databaseDirectory = databaseDirectory.join(`${path.sep}`)
const bookLibrary = path.join(databaseDirectory, 'book.json');
console.log(bookLibrary);

function createBook(req, res) {
    const books = requestBookAndParse(req, res);
    books
        .then((books) => {
            console.log(books);
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = createBook;