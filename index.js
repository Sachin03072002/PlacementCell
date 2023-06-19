// Acquiring Express and other dependencies
const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// Used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-stratergy');

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use('/static', express.static(path.join(process.cwd(), 'assets')));
app.use(expressLayouts);

// Extract styles and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Set up the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session configuration
app.use(session({
    name: 'placement-cell',
    secret: 'place',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 100 // Adjust the cookie expiration time as needed
    }
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Custom middleware to set authenticated user
app.use(passport.setAuthenticatedUser);

// Use express router
app.use('/', require('./routes'));

// Start the server
app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Started application on port ${port}`);
});
