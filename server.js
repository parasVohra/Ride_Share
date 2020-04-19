const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('config');

// DB Config 
const db_URI = config.get('mongoURI')
//conection to mongodb
mongoose.connect(db_URI, {  useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);

let db = mongoose.connection;

db.once('open', function(){
    console.log('connected with database')
})

//check for db error
db.on('error', function(err){
    console.log("error"+ err);
})


//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

//enabling cros
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


//use routes
app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started at ${port}`))