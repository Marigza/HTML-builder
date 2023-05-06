const fs = require('fs');
path = require('path'); 

fs.readdir(path.join(__dirname, 'secret-folder'), {'withFileTypes': true}, (err,files) => {
  if (err) throw err;
  for (const file of files) {
    if (file.isFile()) {
      let fileName = file.name;
      fs.stat(path.join(__dirname, 'secret-folder', fileName), (err, stats) => {
        if (err) throw err;
        console.log(`${path.parse(fileName).name} - ${path.extname(fileName).slice(1)} - ${stats.size}bytes`);
      })
    }
  }     
}) ;
