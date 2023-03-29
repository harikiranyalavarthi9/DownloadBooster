import axios from 'axios';
import fs from 'fs';

let fileName = process.argv[3] || 'file.txt'; // Get file name from command line arguments
let url = process.argv[5]; // Get http url from command line arguments
let numberofChunks = process.argv[9] || 4; // Default number of requests need to be made to the server
const CHUNK_SIZE = process.argv[7] * 1024 || 1024; // 1 KB = 1024 B

let downloadFile = async () => { // async-await 
    if(process.argv.length < 6 || process.argv.length > 10) {
        console.info(`Usage: ${process.argv[0]} [OPTIONS] url \n\t -output string \n\t\tWrite output to <file> instead of default \n\t -url \n\t\tDownload chunks in parallel instead of sequentially`);
    }
    else {
        console.log(`Downloading first 4 chunks of ${url} to ${fileName}`);
        for(let i=0; i<numberofChunks; i++) { // Seriel execution
            const requestConfig = {
                headers: {
                    Range: `bytes=${i*CHUNK_SIZE}-${(i+1)*CHUNK_SIZE-1}` // Range headers Eg: Range: bytes=0-1048576
                },
                responseType: 'arraybuffer' // arraybuffer for blob data type
            }
            
            await axios.get(url, requestConfig)
            .then((response) => { // Perform axios get call using the above request config
                let blob = response.data;
                let offset = 0;
                let chunkLength = (i+1)*CHUNK_SIZE - (i*CHUNK_SIZE);
                let position = i*CHUNK_SIZE;
                fs.open(fileName, 'w', (err, fd) => {
                    if (err) {
                        throw `Could not open file: ${err}`;
                    }
                    fs.write(fd, blob, offset, chunkLength, position, (err) => { // write blob file in 1 MiB chunks serially 
                        if (err) throw `Error writing file: ${err}`;
                        fs.close(fd, () => {
                            console.log(`Downloaded chunk ${i+1} successfully`);
                        });
                    });
                });
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log(`Error code: ${error.response.status}`);
                }
            });
        }
    }
}

downloadFile();