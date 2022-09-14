const fs  = require('fs');
const {requestBookAndParse, accessDatabase} = require('./../../utilities.js');


const bookLibrary = accessDatabase('books.json');



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
                console.log(data);
            })
        })
        .catch((err) => {
            console.log(err);
        });
}


module.exports = createBook;