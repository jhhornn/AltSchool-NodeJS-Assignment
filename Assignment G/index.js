const http = require('http');
const fs = require('fs');
const path = require('path');


const modulePath = path.join(__dirname, '/modules/book modules/')
const createBook = require(`${modulePath}createBook`);
const deleteBook = require(`${modulePath}deleteBook`);
const loanOutBook = require(`${modulePath}loanOutBook`);
const returnBook = require(`${modulePath}returnBook`);
const updateBook = require(`${modulePath}updateBook`);
// import createBook from './modules/book modules/createBook.js';
// import deleteBook from './modules/book modules/deleteBook.js';
// import loanOutBook from'./modules/book modules/loanOutBook.js';
// import returnBook from './modules/book modules/returnBook.js';
// import updateBook from './modules/book modules/updateBook.js';


host = 'localhost';
port = 8080;

function requestHandler(req, res){
    res.setHeader('Content-Type', 'application/json');

    let req_url  = req.url.toLowerCase();
    let req_method = req.method.toLowerCase();

    if (req_url === '/books/create' && req_method === 'post'){
        createBook(req,res)
        res.end()
    }
    else if (req_url === '/books/delete' && req_method === 'delete'){
        deleteBook(req,res)
    }
    else if (req_url === '/books/loanout' && req_method === 'post'){
        loanOutBook(req,res)
    }
    else if (req_url === '/books/return' && req_method === 'post'){
        returnBook(req,res)
    }
    else if (req_url === '/books/update' && req_method === 'put'){
        updateBook(req,res)
    }else {
        res.writeHead(404);
        res.end(JSON.stringify({message: 'Method Not Allowed'}));
    }
   
}

const server = http.createServer(requestHandler);

server.listen(port,host, () => {
    console.log(`Server is listening on ${port}`);
});