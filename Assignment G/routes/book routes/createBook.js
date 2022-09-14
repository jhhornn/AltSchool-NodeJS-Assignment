const fs  = require('fs');
const path = require('path');
const {requestBookAndParse, accessDatabase} = require('./../../utilities.js');


const bookLibrary = accessDatabase('books.json');
console.log(bookLibrary);


function createBook(req, res) {
    const books = requestBookAndParse(req, res);
    books
        .then((books) => {
            fs.readFile(bookLibrary, 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                    res.writeHead(400)
                    res.end("An error occurred while reading");
                }
            })
        })
        .catch((err) => {
            console.log(err);
        });
}


module.exports = createBook;