const fs  = require('fs');
const {requestBookAndParse, accessDatabase, addId} = require('./../../utilities.js');


const bookLibrary = accessDatabase('books.json');



function createBook(req, res) {
    const books = requestBookAndParse(req, res);
    books
        .then((book) => {
            fs.readFile(bookLibrary, 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                    res.writeHead(400)
                    res.end("An error occurred while reading");
                }
                const availableBooks = JSON.parse(data);
                const newBook = {
                    title: book.title,
                    author: book.author,
                    year: Number(book.year),
                }
                availableBooks.push(newBook);
                idedBooks = addId(availableBooks);

                fs.writeFile(bookLibrary, JSON.stringify(idedBooks), (err) => {
                    if (err) {
                        console.log(err);
                        res.writeHead(500);
                        res.end(JSON.stringify({
                            message: 'Let me check myself.'
                        }));
                    }
                    res.end(JSON.stringify(idedBooks))
                })
                
            })
        })
        .catch((err) => {
            console.log(err);
        });
}


module.exports = createBook;