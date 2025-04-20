const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcrypt');

const router = express.Router();

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

  
  module.exports = router;