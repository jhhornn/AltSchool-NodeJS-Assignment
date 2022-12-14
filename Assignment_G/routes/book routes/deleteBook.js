const fs  = require('fs');
const {requestAndParse, accessDatabase} = require('./../../utilities.js');


const bookLibrary = accessDatabase('books.json');

function deleteBook(req, res) {
    const books = requestAndParse(req, res);
    books
        .then((book) => {
            // console.log(book);
            const bookId = book[1].id;
            fs.readFile(bookLibrary, 'utf8', (err, data) => {
                if (err) {
                    console.log(err);
                    res.writeHead(400)
                    res.end("An error occurred while reading");
                }
                const availableBooks = JSON.parse(data);
                
                const bookIndex = availableBooks.findIndex(book => book.id === bookId);

                if (bookIndex === -1) {
                    res.writeHead(404);
                    res.end("Book with the specifed id not found!");
                    return;
                }
                
                availableBooks.splice(bookIndex, 1);

                fs.writeFile(bookLibrary, JSON.stringify(availableBooks), (err) => {
                    if (err) {
                        console.log(err);
                        res.writeHead(500);
                        res.end(JSON.stringify({
                            message: 'Let me check myself.'
                        }));
                        return
                    }
                    res.writeHead(200);
                    res.end(JSON.stringify({message: 'Deletion successfull'}));
                })
                
            })
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = deleteBook;