const conn = require('../db');

exports.getUsers = () => {

    conn.query(`select * from users`, (err, data) => {
       
            return data;
        
    })
}