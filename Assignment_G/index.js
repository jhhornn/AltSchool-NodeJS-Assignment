const http = require('http');
const fs = require('fs');
const path = require('path');
const {authenticate, authorization} = require('./utilities.js')


const modulePath = path.join(__dirname, '/routes/book routes/')
const createBook = require(`${modulePath}createBook`);
const deleteBook = require(`${modulePath}deleteBook`);
const loanOutBook = require(`${modulePath}loanOutBook`);
const returnBook = require(`${modulePath}returnBook`);
const updateBook = require(`${modulePath}updateBook`);



host = 'localhost';
port = 8080;

function requestHandler(req, res){
    res.setHeader('Content-Type', 'application/json');

    let req_url  = req.url.toLowerCase();
    let req_method = req.method.toLowerCase();

    if (req_url === '/books/create' && req_method === 'post'){
        authenticate(req, res)
            .then((() => {
                createBook(req, res);
            })()).catch((err) => {
                console.log(err);
                res.writeHead(400);
                res.end(JSON.stringify({message: err}));
            });  
    }
    else if (req_url === '/books/delete' && req_method === 'delete'){
        authenticate(req, res)
            .then((() => {
                deleteBook(req, res);
            })()).catch((err) => {
                console.log(err);
                res.writeHead(400);
                res.end(JSON.stringify({message: err}));
            });  
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