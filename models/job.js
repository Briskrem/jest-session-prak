const { db_client } = require('../db')

class Job{
    static async getAll(){
        try{
            let query = `SELECT * FROM jest_users`
            const results = await db_client.query(query);
            return results.rows
        }catch(e){
            console.log(e)
        }
    }
}

module.exports = Job;