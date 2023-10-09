// only load these env variables if in production enviroment
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require("express-ejs-layouts");

const indexRouter = require('./routes/index'); // imports default route

app.set('view engine','ejs'); // sets view engine as ejs
app.set('views', __dirname + '/views'); //views of diff files come from inside a views directory
app.set('layout', 'layouts/layout');   //every file is put inside of this file (html)
app.use(expressLayouts);
app.use(express.static('public'));// public files are in this folder

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL,{ // use env var because the url will vary on local db vs server db (deployed)
    useNewUrlParser: true });
const db = mongoose.connection; // changed from failing mongoose.connect()
db.on('error', error => console.error(error)); // print error if it fails to connect
db.once('open', () => console.log('connected to Mongoose'));

app.use('/',indexRouter);

app.listen(process.env.PORT || 3000,function(){
    console.log("Listening on port 3000");
});



