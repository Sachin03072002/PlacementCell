// Acquiring Express and other dependencies
const express = require("express");
const env = require('./config/environment');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.port || 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// Used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-stratergy');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMWare = require('./config/middleware');
// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use('/static', express.static(path.join(process.cwd(), env.asset_path)));

app.use(logger(env.morgan.mode, env.morgan.options));

app.use(expressLayouts);

// Extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Set up the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//mongo store is used to store the session cookie
// Session configuration
app.use(session({
    name: env.session_cookie_key,
    secret: 'place',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 100 // Adjust the cookie expiration time as needed
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/placement_development',
        autoRemove: 'disabled'
    }),
    function(err) {
        console.log(err || 'connect-mongodb store ok');
    }
}));




// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Custom middleware to set authenticated user
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMWare.setFlash);
// Use express router
app.use('/', require('./routes'));

// Start the server
app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Started application on port ${port}`);
});
