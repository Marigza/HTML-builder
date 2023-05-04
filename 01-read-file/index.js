let fs = require('fs');
let path = require('path');

let stream = new fs.ReadStream(path.join(__dirname, 'text.txt')) //'01-read-file/text.txt')

stream.on('readable', function () {
  let data = stream.read();
  if (data !== null) console.log(data.toString())
});
stream.on('end', function () {
  console.log('')
})


