const express = require('express');
const cors = require('cors');
const sql = require('mssql');

const app = express();
const PORT = 5000;

app.use(cors());

const config = {
    user: "kraken",
    password: "12345",
    server: "localhost\\SQLEXPRESS",
    database: "myDB",
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
        instancename: "SQLEXPRESS"
    },
    port: 1433
};

app.get('/Data', async(req, res) => {
    try {
        const pool = await sql.connect(config);
        const data = pool.request().query('select * from orders');
        data.then((res1 => {
            return res.json(res1);
        }));
    }
    catch(err) {
        console.log(err);       
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    
});