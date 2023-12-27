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
            const pool = new sql.ConnectionPool(config);
            const connection = await pool.connect();
            const Request = new sql.Request(connection);
            const result1 = await Request.query('select * from LoaiTietKiem')
                
            return result1.recordsets;
        } catch (err) {
            console.log(err);            
        }
    },

    NextID: async function(tbname) {
        try {            
            const pool = new sql.ConnectionPool(config);
            const connection = await pool.connect();
            const Request = new sql.Request(connection);                        
            const result1 = await Request.query(`select count(*) as cnt from ${tbname}`);
            //console.log(result1.recordset);
            return result1.recordset[0].cnt + 1;
        } catch (err) {
            console.log(err);            
        }
    },
    
    InsertToTable: async function (tbName, colName, val) {
        try {            
            const pool = new sql.ConnectionPool(config);
            const connection = await pool.connect();
            const Request = new sql.Request(connection);
            const ID = await this.NextID(tbName);
            val.push(ID);
            val =  val.map((v) => {
                return `N'${v}'`;
            })
            //console.log(val);
            const result1 = await Request.query(`insert into ${tbName}(${colName.join()}) values(${val.join()})`);
            //console.log(result1);
            //return result1.recordsets;
        } catch (err) {
            console.log(err);            
        }
    },

    SelectFromTable: async function (tbName, colName, condition) {
        try {            
            const pool = new sql.ConnectionPool(config);
            const connection = await pool.connect();
            const Request = new sql.Request(connection);
            if (condition!='') condition = `where ${condition}`;
            const result1 = await Request.query(`select ${colName.join()} from ${tbName} ${condition}`);
            //console.log(result1);
            return result1.recordsets;
        } catch (err) {
            console.log(err);            
        }
    },
}
