//acquiring express
const express = require("express");
// var cors = require('cors');
var path = require('path');
var app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
// const db = require('./config/mongoose');

// app.use(cors());

app.use(expressLayouts);
//extract stylesand scripts from sub pages into the layout


//use express router
app.use('/', require('./routes'));
//use express router
app.use(express.static(path.join(__dirname, '/assets')));


app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// app.get('/', (req, res) => {
//     res.render(path.join(__dirname + '/views/layout.ejs'), { title: 'Home Page' });
// })

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Started application on port ${port}`);
});