const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

fs.writeFile(
  path.join(__dirname, 'new.txt'),
  '',
  (err) => {
    if (err) throw err;
    }
)

stdout.write('enter the text\n');
stdin.on('data', data => {
  const text = data.toString();
  if (text.trim() !== 'exit') {
    fs.appendFile(
      path.join(__dirname, 'new.txt'),
      text,
      (err) => {
        if (err) throw err;
        console.log('text wrote to new.txt');
      });
  } else if (text.trim() === 'exit') {
    process.on('exit', () => {
      console.log('\nHappy learning, bye!\n');
    });
    process.exit();
  };
});

process.on('SIGINT', () => {
  console.log('\nHappy learning, bye!\n');
  process.exit();
});



