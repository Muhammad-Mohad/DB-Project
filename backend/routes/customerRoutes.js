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

router.post('/create', async (req, res) => {
    const { fullName, email, password, phoneNumber, customerAddress } = req.body;

    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
        .input('FullName', sql.NVarChar(100), fullName)
        .input('Email', sql.NVarChar(100), email)
        .input('PasswordHash', sql.NVarChar(200), password)
        .input('PhoneNumber', sql.NVarChar(30), phoneNumber)
        .input('CustomerAddress', sql.NVarChar(200), customerAddress)
        .query(`
            INSERT INTO Customers (FullName, Email, PasswordHash, PhoneNumber, CustomerAddress)
            OUTPUT INSERTED.CustomerID
            VALUES (@FullName, @Email, @PasswordHash, @PhoneNumber, @CustomerAddress)
        `);

        const customerId = result.recordset[0].CustomerID;

        res.status(201).json({ message: 'Customer registered and order placed successfully',
            customerId: customerId
         });
    } catch (err) {
        console.error('Error inserting customer or order:', err);
        res.status(500).json({ error: 'Failed to register customer and place order' });
    }
})

// router.post('/', async (req, res) => {
//     const { fullName, email, password, phoneNumber, customerAddress, totalAmount } = req.body;

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const pool = await sql.connect(config);

//         const result = await pool.request()
//             .input('FullName', sql.NVarChar(100), fullName)
//             .input('Email', sql.NVarChar(100), email)
//             .input('PasswordHash', sql.NVarChar(200), hashedPassword)
//             .input('PhoneNumber', sql.NVarChar(30), phoneNumber || null)
//             .input('CustomerAddress', sql.NVarChar(200), customerAddress || null)
//             .query(`
//                 INSERT INTO Customers (FullName, Email, PasswordHash, PhoneNumber, CustomerAddress)
//                 OUTPUT INSERTED.CustomerID
//                 VALUES (@FullName, @Email, @PasswordHash, @PhoneNumber, @CustomerAddress)
//             `);

//         const customerID = result.recordset[0].CustomerID;

//         await pool.request()
//             .input('CustomerID', sql.Int, customerID)
//             .input('TotalAmount', sql.Int, totalAmount)
//             .input('OrderStatus', sql.NVarChar(50), 'Pending')
//             .query(`
//                 INSERT INTO Orders (CustomerID, TotalAmount, OrderStatus)
//                 VALUES (@CustomerID, @TotalAmount, @OrderStatus)
//             `);

//         res.status(201).json({ message: 'Customer registered and order placed successfully' });
//     } catch (err) {
//         console.error('Error inserting customer or order:', err);
//         res.status(500).json({ error: 'Failed to register customer and place order' });
//     }
// });


module.exports = router;
