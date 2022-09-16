const fs  = require('fs');
const {requestAndParse, accessDatabase, addId} = require('./../../utilities.js');


const bookLibrary = accessDatabase('books.json');



function createBook(req, res) {
    const books = requestAndParse(req, res);
    console.log(books);
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
                    title: book[1].title,
                    author: book[1].author,
                    year: Number(book[1].year),
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