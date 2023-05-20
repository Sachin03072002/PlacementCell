//acquiring express
const express = require("express");
const router = require('./routes/index');

var app = express();
const port = 8000;

//use express router
app.get("/", require('./routes/index'));

//set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/', (req, res) => {
    res.render('index', { title: "Home Page" });
})

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Started application on port ${port}`);
});