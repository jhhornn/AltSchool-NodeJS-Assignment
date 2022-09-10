const http = require('http');
const fs = require('fs');
const path = require('path');
import createBook from './modules/book modules/createBook'
import deleteBook from './modules/book modules/deleteBook'
import loanOutBook from './modules/book modules/createBook'
import returnBook from './modules/book modules/returnBook'
import updateBook from './modules/book modules/updateBook'


host = 'localhost';
port = 8080;

function requestHandler(req, res){
    res.setHeader('Content-Type', 'application/json');

    let req_url  = req.url.toLowerCase();
    let req_method = req.method.toLowerCase();

    if (req_url === 'books/create' && req_method === 'post'){
        createBook(req,res)
    }
    if (req_url === 'books/delete' && req_method === 'delete'){
        deleteBook(req,res)
    }
    if (req_url === 'books/loanout' && req_method === 'post'){
        loanOutBook(req,res)
    }
    if (req_url === 'books/return' && req_method === 'post'){
        returnBook(req,res)
    }
    if (req_url === 'books/update' && req_method === 'put'){
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