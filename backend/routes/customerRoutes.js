const express = require('express');
const sql = require('mssql');

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

router.get('/customers', async (req, res) => {
    try 
    {
        const pool = await sql.connect(config);
        const result = await pool.request().query('SELECT * FROM Customers');
        res.json(result.recordset);
    } 
    catch(err) 
    {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    const { FullName, Email, PasswordHash, PhoneNumber, CustomerAddress } = req.body;
    try 
    {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('FullName', sql.NVarChar, FullName)
            .input('Email', sql.NVarChar, Email)
            .input('PasswordHash', sql.NVarChar, PasswordHash)
            .input('PhoneNumber', sql.NVarChar, PhoneNumber)
            .input('CustomerAddress', sql.NVarChar, CustomerAddress)
            .query(`INSERT INTO Customers (FullName, Email, PasswordHash, PhoneNumber, CustomerAddress)
                    VALUES (@FullName, @Email, @PasswordHash, @PhoneNumber, @CustomerAddress);
                    SELECT SCOPE_IDENTITY() AS CustomerID;`);

        res.status(201).json({ message: "Customer added", CustomerID: result.recordset[0].CustomerID });
    }
    catch(err) 
    {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { FullName, Email, PhoneNumber, CustomerAddress } = req.body;
    try 
    {
        const pool = await sql.connect(config);
        await pool.request()
            .input('CustomerID', sql.Int, id)
            .input('FullName', sql.NVarChar, FullName)
            .input('Email', sql.NVarChar, Email)
            .input('PhoneNumber', sql.NVarChar, PhoneNumber)
            .input('CustomerAddress', sql.NVarChar, CustomerAddress)
            .query(`UPDATE Customers 
                    SET FullName = @FullName, Email = @Email, PhoneNumber = @PhoneNumber, CustomerAddress = @CustomerAddress
                    WHERE CustomerID = @CustomerID`);

        res.json({ message: "Customer updated" });
    } 
    catch(err) 
    {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try 
    {
        const pool = await sql.connect(config);
        await pool.request()
            .input('CustomerID', sql.Int, id)
            .query(`DELETE FROM Customers WHERE CustomerID = @CustomerID`);

        res.json({ message: "Customer deleted" });
    }
    catch(err)
    {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
