const http = require('http');
const fs = require('fs');
const path = require('path');


host = 'localhost';
port = 8080;

function requestHandler(req, res){
    res.setHeader('Content-Type', 'application/json');

    let req_url  = req.url.toLowerCase();
    let req_method = req.method.toLowerCase();

    if (req_url === 'books/create' && req_method === 'get'){
        getBook(req,res)
    }
    if (req_url === 'books/delete' && req_method === 'get'){
        deleteBook(req,res)
    }
    if (req_url === 'books/loanout' && req_method === 'get'){
        loanOutBook(req,res)
    }
    if (req_url === 'books/return' && req_method === 'get'){
        returnBook(req,res)
    }
    if (req_url === 'books/update' && req_method === 'get'){
        updateBook(req,res)
    }else {
        res.writeHead(404);
        res.end(JSON.stringify({message: 'Method Not Allowed'}));
    }
   
}

const server = http.createServer(requestHandler);