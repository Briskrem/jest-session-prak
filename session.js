let session = require('express-session');
const { SECRET_KEY } = require('./config')
const { store } = require('./db')

session = session({
    store: store,
    secret: SECRET_KEY,
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

