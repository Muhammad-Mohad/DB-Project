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

router.post('/', async (req, res) => {
    const { fullName, email, password, phoneNumber, customerAddress } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10); 
  
      const pool = await sql.connect(config);
  
      await pool.request()
        .input('FullName', sql.NVarChar(100), fullName)
        .input('Email', sql.NVarChar(100), email)
        .input('PasswordHash', sql.NVarChar(200), hashedPassword)
        .input('PhoneNumber', sql.NVarChar(30), phoneNumber || null)
        .input('CustomerAddress', sql.NVarChar(200), customerAddress || null)
        .query(`
          INSERT INTO Customers (FullName, Email, PasswordHash, PhoneNumber, CustomerAddress)
          VALUES (@FullName, @Email, @PasswordHash, @PhoneNumber, @CustomerAddress)
        `);
  
      res.status(201).json({ message: 'Customer registered successfully' });
    } catch (err) {
      console.error('Error inserting customer:', err);
      res.status(500).json({ error: 'Failed to register customer' });
    }
  });

module.exports = router;
