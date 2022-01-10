const fs = require('fs');

fs.appendFile('logger.txt', 'New User Loaded ', (err) => {
    if (err) {
        console.log('Failed to write in file.');
    } else {
        console.log('Wrote in file successfully.');
    }
});