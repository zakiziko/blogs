const fs = require('fs');
const path = require('path');
module.exports = function(app){
    fs.readdirSync(path.join(__dirname)).forEach(file=> {
        if(file!='indexRoutes.js'){
            require('./'+file)(app);
        }
    });
};