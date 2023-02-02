const { db_client } = require('../db');
const bcrypt = require('bcryptjs');
const { BCRYPT_WORK_FACTOR } = require('../config')



class User{

    static async getUsers(){
        let query = `
                    SELECT  u.user_id, u.first_name, u.last_name, u.email
                    FROM jest_users AS u
                    `
        let results = await db_client.query(query);
        let data = results.rows;
        return data
    }

    static async register({first_name, last_name, email, password}){
        const hashedPassword = bcrypt.hashSync(password, BCRYPT_WORK_FACTOR)
        let query = `
                    INSERT INTO jest_users
                    (first_name, last_name, email, password)
                    VALUES
                    ($1, $2, $3, $4)
                    RETURNING first_name, last_name , email
                    `          
        const results = await db_client.query(query, [first_name, last_name, email, hashedPassword]);
        const user = results.rows[0];
        return user
    }

    static async login(email){
        let query = `
                    SELECT user_id, first_name, last_name, email, password
                    FROM jest_users 
                    WHERE email = $1
                    `
        const data = await db_client.query(query, [email])
        let user = data.rows[0]
        return user
    }
}

module.exports = User