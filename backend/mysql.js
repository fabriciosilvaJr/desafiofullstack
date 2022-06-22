const mysql = require('mysql');

// var pool = mysql.createPool({
//     connectionLimit: 1000,
//     user:"b7d9e1da558971",
//     password:"38b753a4" ,
//     database: "heroku_5e8a0c1d892b3b7",
//     host: "us-cdbr-east-05.cleardb.net",
//     port: 3306
// });

var pool = mysql.createPool({
    "connectionLimit": 1000,
    "user": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD ,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "port": process.env.MYSQL_PORT
});
// exports.execute = (query, params = []) =>{
//     return new Promise((resolve, reject) =>{
       
//                pool.getConnection((error,conn) =>{
//                 if(error){
//                     reject(error)
//                 } else {
//                     conn.query(`USE gestao_facil;`);

//                     conn.query(query, params,(error, result, fields) =>{
//                         conn.release();
//                         if(error){
//                             reject(error);
//                         }else {
//                             resolve(result)
//                         }
//                     })
//                 }
//                }) 
            
//         })
// }

exports.execute = (query, params = []) =>{
    return new Promise((resolve, reject) =>{

               //pool.query(`USE gestao_facil;`);
       
                pool.query(query, params, (error, result, fields) =>{
                    if(error){
                        reject(error);
                    } else {
                        resolve(result)
                    }
                });
            
        })
}

exports.pool = pool; 