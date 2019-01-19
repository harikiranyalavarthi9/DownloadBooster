const fs = require('fs');
const filesize = require('filesize');
const argv = require('yargs').argv;

console.log(argv.o);

console.log(argv.parallel);

var files = fs.readdirSync('./');
files.forEach(file => {
  let fsize = filesize(fs.statSync(file).size)

  console.log(`${file} - ${fsize}`);
});
