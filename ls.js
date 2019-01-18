const fs = require('fs');
const filesize = require('filesize');

var files = fs.readdirSync('./');
files.forEach(file => {
  let fsize = filesize(fs.statSync(file).size)

  console.log(`${file} - ${fsize}`);
});
