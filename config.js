require('dotenv').config();
require("colors");

process.env.NODE_ENV = "test" ;

const SECRET_KEY = process.env.SECRET_KEY || 'vockchrewt';

const PORT = +process.env.PORT || 3080 ;

function getDatabaseUri() {
    return process.env.NODE_ENV === "test" ? "jestsession2_test" : process.env.DATABASE_URL || "jestsession2";
  }
console.log(getDatabaseUri() , 'getDATABASEURL('.red)
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12 ;

// console.log(process.env,'process.env')
console.log("Jobly Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("---");

module.exports = {
    SECRET_KEY,
    PORT,
    BCRYPT_WORK_FACTOR,
    getDatabaseUri,
};
  
