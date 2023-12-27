const sql = require('mssql')

const config = {
  user: "sang123",
  password: "1234",
  database: "QuanLySoTietKiem",
  server: 'localhost',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {    
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
};

const db = {
    connectDatabase: async function connectDatabase(configObject) {
        try {
            const pool = new sql.ConnectionPool(configObject);
            const connection = await pool.connect();
            console.log(connection.connected);//
            return configObject;
        } catch (error) {
            console.log(error);
            throw(error);
        }
    },
    db: sql,
};
// simple query
module.exports = {
    getLoaiTietKiem: async function () {    
        try {
            const returnConfig = await db.connectDatabase(config);
            const pool = new db.db.ConnectionPool(returnConfig);
            const connection = await pool.connect();
            const Request = new db.db.Request(connection);
            const result1 = await Request.query('select * from LoaiTietKiem')
                
            return result1.recordsets;
        } catch (err) {
            console.log(err);            
        }
    },
    
}
