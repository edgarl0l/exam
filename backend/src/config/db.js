const sql = require("mssql");

const config = {
    server: "localhost",
    database: "animals",
    options: {
        encrypt: false,
        trustServerCertificate: true
    },
    authentication: {
        type: "ntlm",
        options: {
            domain: "DESKTOP-2ISDHQP",
            userName: "Lenovo",
            password: "LisaZvizda22"
        }
    }
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

module.exports = { sql, pool, poolConnect };
