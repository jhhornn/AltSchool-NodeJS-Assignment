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


function accessDatabase(datafile) {
    let directory = __dirname.split(path.sep);
    databaseDirectory = directory.slice(0, directory.indexOf('Assignment_G')+1);
    databaseDirectory.push('database');
    databaseDirectory = databaseDirectory.join(`${path.sep}`);
    const bookLibrary = path.join(databaseDirectory, datafile);
    return bookLibrary;
}


function getAllUsers() {
    const usersDb = accessDatabase('users.json');
    return new Promise((resolve, reject) => {
        fs.readFile(usersDb, 'utf8', (err, users) => {
            if(err){
                reject(err);
            }

            resolve(JSON.parse(users));
        })
    })
}


function authenticate(req, res) {
    return new Promise((resolve, reject) => {
        const loginDetails = requestAndParse(req, res);
            loginDetails
                .then( async (loginDeet) => {
                    const users = await getAllUsers();
                    const userFound = users.find((user) => {
                        return user.username === loginDeet[0].username;
                    }) //The loginDeet slice is so as to pick the first object of the array passed for authentication.

                    if (!userFound) {
                        reject('User not found: Pls sign up');
                        return
                    }

                    if (userFound.password !== loginDeet[0].password) {
                        reject('Invalid username or password');
                        // return
                    } // Check the comment above
                    resolve();
                })
    })
}

function authorize(req, res, role) {
    return new Promise(function(resolve, reject) {
        const details = requestAndParse(req, res);
        details
            .then( async (detail) => {
                const users = await getAllUsers();
                const userFound = users.find((user) => {
                    // console.log('got here');
                    return user.username === detail[0].username && user.password === detail[0].password;
                })
                console.log(userFound);

                if (!userFound) {
                    reject("Username or password incorrect")
                    return;
                }

                 if (!role.includes(userFound.role)) {
                    reject("You do not have the required role to access this resources")
                    return
                }

                resolve()

            })
           
    }
)}




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
    authenticate,
    authorize,
    addId
}