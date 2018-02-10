const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/db');
const app = express();
const cors = require('cors');
var port = 5000;

mongoose.connect(db.database,db.options);
//bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors());

console.log('App listen to port : '+port+' ....');
app.listen(port);

require('./routes/indexRoutes')(app);