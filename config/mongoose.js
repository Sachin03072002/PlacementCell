//setting up the database connection with mongodb
const mongoose = require('mongoose');
const env = require("./environment");
mongoose.connect(`mongodb://127.0.0.1:27017/${env.db}`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "error connecting to mongodb"));
db.once('open', function () {
    console.log('connected to database :: Mongodb');
});

module.exports = db;

