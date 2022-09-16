const fs  = require('fs');
const path = require('path');

function requestAndParse(req, res) {
    return new Promise((resolve, reject) => {
        const body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        })

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            if (!parsedBody){
                reject('Nothing parsed')
            }else{
                const jsonParsedBody = JSON.parse(parsedBody);
                resolve(jsonParsedBody);
            }
        })
    })
}

function authenticate(req, res) {
    return new Promise((resolve, reject) => {
        const loginDetails = requestAndParse(req, res); 
            loginDetails
                .then( async (user) => {
                    const users = await getAllUsers()
                    console.log(users);
                })
    })
}


function getAllUsers() {
    const usersDb = accessDatabase('users.json');
    console.log(usersDb);
    return new Promise((resolve, reject) => {
        fs.readFile(usersDb, 'utf8', (err, users) => {
            if(err){
                reject(err);
            }

            resolve(JSON.parse(users));
        })
    })
}
console.log(getAllUsers())


function accessDatabase(datafile) {
    let directory = __dirname.split(path.sep);
    databaseDirectory = directory.slice(0, directory.indexOf('Assignment_G')+1);
    databaseDirectory.push('database');
    databaseDirectory = databaseDirectory.join(`${path.sep}`);
    const bookLibrary = path.join(databaseDirectory, datafile);
    return bookLibrary;
}


function addId(book) {
    if (book.length > 0) {
        if (book.length == 1) {
		    if (!book[0].id) {
			    book[0].id = 1;
		    }
	    }
	    if (book.length > 1) {
		    for (i = 0; i < book.length; i++) {
                if (!book[0].id) {
			        book[0].id = 1;
		        }
			    if (!book[i].id) {
				    book[i].id = book[i - 1].id + 1;
			    }
		    }
	    }
        return book;
    }
	return;
}


module.exports = {
    requestAndParse,
    accessDatabase,
    addId, 
    authenticate
}