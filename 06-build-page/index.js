const fs = require('fs');
const path = require('path');

// создание директории project-dist

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, err => {
  if (err) throw err;

  // создание дирректории project-dist -- assets
  
  fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), { recursive: true }, err => {
    if (err) throw err;
    fs.readdir(path.join(__dirname, 'project-dist', 'assets'), { withFileTypes: true }, (err, assetFiles) => {
      if (err) throw err;
      if (assetFiles.length === 0) return;
      for (const elemOfAssets of assetFiles) {
        if (elemOfAssets.isDirectory()) {
          fs.readdir(path.join(__dirname, 'project-dist', 'assets', elemOfAssets.name), { withFileTypes: true }, (err, innerAssetFiles) => {
            if (err) throw err;
            if (innerAssetFiles.length === 0) return;
            for (const elemOfAssetsFiles of innerAssetFiles) {
              if (elemOfAssetsFiles.isDirectory()) {
                console.log('the deep contains file!')
              } else if (elemOfAssetsFiles.isFile()) {
                fs.unlink(path.join(__dirname, 'project-dist', 'assets', elemOfAssets.name, elemOfAssetsFiles.name), err => {
                  if (err) throw err;
                });
                fs.copyFile(path.join(__dirname, 'assets', elemOfAssets.name, elemOfAssetsFiles.name), path.join(__dirname, 'project-dist', 'assets', elemOfAssets.name, elemOfAssetsFiles.name), err => {
                  if (err) console.log(`file ${elemOfAssetsFiles.name} removed from project-dist`);
                })
              }
            }
          })
        } else if (elemOfAssets.isFile()) {
          fs.unlink(path.join(__dirname, 'project-dist', 'assets', elemOfAssets.name), err => {
            if (err) throw err;
          })
        }
      }
    })
    fs.readdir(path.join(__dirname, 'assets'), { withFileTypes: true }, (err, elements) => {
      if (err) throw err;
      for (const elem of elements) {
        if (elem.isDirectory()) {
          fs.mkdir(path.join(__dirname, 'project-dist', 'assets', elem.name), { recursive: true }, err => {
            if (err) throw err;
          })
          fs.readdir(path.join(__dirname, 'assets', elem.name), { withFileTypes: true }, (err, elemsOfDir) => {
            if (err) throw err;
            for (const elemOfDir of elemsOfDir) {
              if (elemOfDir.isFile()) {
                fs.copyFile(path.join(__dirname, 'assets', elem.name, elemOfDir.name), path.join(__dirname, 'project-dist', 'assets', elem.name, elemOfDir.name), err => {
                  if (err) throw err;
                })
              } else if (elemOfDir.isDirectory()) {
                console.log('the deep contains file!')
              }
            }
          })
        } else if (elem.isFile()) {
          fs.copyFile(path.join(__dirname, 'assets', elem.name), path.join(__dirname, 'project-dist', 'assets', elem.name), err => {
            if (err) throw err;
          })
        }  
      }
    })
  });
  
  //создание файла project-dist -- index.html

  fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'),
    '',
    err => {
      if (err) throw err;
      fs.readFile(path.join(__dirname, 'template.html'),
        'utf-8',
        (err, data) => {
          if (err) throw err;
          fs.appendFile(path.join(__dirname, 'project-dist', 'index.html'),
            ('\n' + data),
            err => {
              if (err) throw err;
            }
          )
          fs.readFile(path.join(__dirname, 'project-dist', 'index.html'),
            'utf-8',
            (err, data) => {
              if (err) throw err;
              const array = data.split(' ');
              const templateTags = array.filter(item => item.startsWith('{{'));
              let arrTags = templateTags.map(item => {
                let index = item.indexOf('}');
                item = item.slice(0, index + 2);
                return item;
              })
              for (let tag of arrTags) {
                let innerTag = tag.slice(2, (tag.length - 2));
                fs.readFile(path.join(__dirname, 'components', `${innerTag}.html`), 'utf-8', (err, newdata) => {
                  if (err) throw err;
                  data = data.replace(tag, `\n${newdata}\n`);
                  fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'),
                    data,
                    err => {
                      if (err) throw err;
                    })
                })
              };
            }
          )
        }
      )
  })
  
  // создание файла project-dist -- style.css
  
  fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'),
    '',
    err => {
      if (err) throw err;
    });
  
  fs.readdir(path.join(__dirname, 'styles'), { 'withFileTypes': true }, (err, files) => {
  if (err) throw err;
  for (const file of files) {
    if (file.isFile() && (path.extname(file.name).toString() === '.css')) {
      fs.readFile(path.join(__dirname, 'styles', file.name),
        'utf-8',
        (err, data) => {
          if (err) throw err;
          fs.appendFile(path.join(__dirname, 'project-dist', 'style.css'),
            ('\n' + data),
            err => {
              if (err) throw err;
            }
          )
        }
      )
    }
  }
  });
})

