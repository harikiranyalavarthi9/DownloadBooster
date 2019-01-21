const http = require('http');
const fs = require('fs');
let b = Buffer.alloc(0);

if(process.argv.length < 6 || process.argv.length > 6) {
    console.log(`Usage: `+process.argv[0]+` [OPTIONS] url \n\t -o string \n\t\tWrite output to <file> instead of default \n\t -parallel \n\t\tDownload chunks in parallel instead of sequentially`);
}
else {
    const CHUNK_SIZE = 1024000;
    let chunkArray = [];
    let numberOfBytesReceived = 0;
    const file = fs.createWriteStream(process.argv[3]);

    http.get(process.argv[5], function(response) {
        console.log("Downloading first 4 chunks of "+process.argv[5]+" to "+process.argv[3]);
        response.pipe(file);
        response.on('data', (chunk) => {
            numberOfBytesReceived += chunk.length;
            chunkArray.push(chunk);
            b = Buffer.concat([b, chunk]);
            if(b.length >= 4e6) {
                response.destroy();
                file.close();
            }
        });
        response.on('end', () => {
            console.log(chunkArray.length);
            console.log(numberOfBytesReceived);
            console.log("...done");
        });
    });
}