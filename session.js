let session = require('express-session');
const { store } = require('./db')

session = session({
    store: store,
    secret: 'vockchrewt',
    saveUninitialized: false,
    resave: false,
    
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: 'none', 
        maxAge: 1000 * 60 * 60 * 24,
    },
})

module.exports = session;

