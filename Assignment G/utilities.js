function requestBookAndParse(req, res) {
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

module.exports = {
    requestBookAndParse
}