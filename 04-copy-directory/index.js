const fs = require('fs');
path = require('path'); 


fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => {
  if (err) throw err;
  fs.readdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err, cfiles) => {
    if (err) throw err;
    if (cfiles.length === 0) return;
    for (const file of cfiles) {
      fs.unlink(path.join(__dirname, 'files-copy', file), err => {
        if (err) throw err;  
      })
    }
  })  
  fs.readdir(path.join(__dirname, 'files'), { recursive: true }, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file), err => {
        if (err) throw err;
      })
    }     
  })
})