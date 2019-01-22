# MultiGetApp
A Sample Download Booster App that helps to download a file in 1 MiB chunks serially.

Features:
* Source URL/File can be downloaded serially in configurable chunks
* Source URL, Output filename, Chunk size, Number of chunks/requests can be configurable via command line arguments
* The file will be downloaded/chunks will be received in an order

# Installation & How to Run
You would need to clone the repository to run the application

```bash
git clone https://github.com/harikiranyalavarthi9/MultiGetApp.git
cd MultiGetApp
```

You can run the application on Windows, MacOS, Linux either using node or using executable files.

To run using node

Install node modules:

```bash
npm install
```
Run app using below command

```bash
node multiGet -output <file_name-string> -url <url_name-string> -chunkSize <chunk_size-number> -numOfChunks <number_of_chunks-number>
```

Chunk Size is measured in MiB. Eg: -chunkSize 2

Chunk Size and No.of Chunks/Requests are optional. 

By default, Chunk Size is set to 1MiB and No.of Chunks to 4.


To run using executable files:

For Windows: 

```bash
./multiGet-win -o <file_name-string> -url <url_name-string> -chunkSize <chunk_size-number> -numOfChunks <number_of_chunks-number>
```

For MacOS:

```bash
./multiGet-macos -o <file_name-string> -url <url_name-string> -chunkSize <chunk_size-number> -numOfChunks <number_of_chunks-number>
```

```bash
./multiGet-linux -o <file_name-string> -url <url_name-string> -chunkSize <chunk_size-number> -numOfChunks <number_of_chunks-number>
```










