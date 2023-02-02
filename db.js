const { Client } = require('pg');
let pgSimple = require('connect-pg-simple');
let session = require('express-session')
const { getDatabaseUri } = require('./config')
let db_client;
let store;

const conObject = {
    user: 'christopherjoseph',
    password: 'kukukoko999',
    host: 'localhost',
    port: 5432,
    database: `${getDatabaseUri()}`
}

if (process.env.NODE_ENV === "production") {
    db_client = new Client(conObject);
    db_client.connect()

    pgSimple = new pgSimple(session);
    store = new pgSimple({conObject, createTableIfMissing: true});
    
  } else {
    db_client = new Client(conObject);
    db_client.connect()

    pgSimple = new pgSimple(session);
    store = new pgSimple({conObject, createTableIfMissing: true});
  }


module.exports = { store, db_client };