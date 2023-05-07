const fs = require('fs');
path = require('path');

fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'),
  '',
  err => {
  if (err) throw err;
    //console.log('bundle.css is created');
})

fs.readdir(path.join(__dirname, 'styles'), { 'withFileTypes': true }, (err, files) => {
  if (err) throw err;
  for (const file of files) {
    if (file.isFile() && (path.extname(file.name).toString() === '.css')) {
      fs.readFile(path.join(__dirname, 'styles', file.name),
        'utf-8',
        (err, data) => {
          if (err) throw err;
          fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'),
            ('\n' + data),
            err => {
              if (err) throw err;
              //console.log(`${file.name} appending`)
            }
          )
        }
      )
    }
  }
});