//acquiring express
const express = require("express");

var cors = require('cors');
var path = require('path');

var app = express();
const port = 8000;

app.use(cors());
//use express router
app.use(express.static(path.join(__dirname, '/assets')));
app.get("/", require('./routes/index'));


//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/', (req, res) => {
    res.render(path.join(__dirname + '/views/home.ejs'), { title: 'Home Page' });
})

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Started application on port ${port}`);
});