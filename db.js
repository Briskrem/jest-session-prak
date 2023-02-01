const { Client } = require('pg');
let pgSimple = require('connect-pg-simple');
let session = require('express-session')

const conObject = {
    user: 'christopherjoseph',
    password: 'kukukoko999',
    host: 'localhost',
    port: 5432,
    database: 'jestsession2'
}

const db_client = new Client(conObject);
db_client.connect()

pgSimple = new pgSimple(session);
const store = new pgSimple({conObject, createTableIfMissing: true});

module.exports = { store, db_client };