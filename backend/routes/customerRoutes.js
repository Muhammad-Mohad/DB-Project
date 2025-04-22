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
});

router.post('/verify', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const pool = await sql.connect(config);
      const result = await pool.request()
        .input('Email', sql.NVarChar(100), email)
        .query('SELECT * FROM Customers WHERE Email = @Email');
  
      const user = result.recordset[0];
  
      if (user) {
        if (user.PasswordHash === password) {
          res.status(200).json({
            success: true,
            userId: user.CustomerID,
            message: 'Login successful',
          });
        } else {
          res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
      } else {
        res.status(404).json({ success: false, message: 'User not found' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ success: false, message: 'An error occurred' });
    }
  });

  router.get('/:id', async (req, res) => {
    const customerId = parseInt(req.params.id, 10);
    if (isNaN(customerId)) {
      return res.status(400).json({ message: 'Invalid customer ID' });
    }
  
    try {
      const pool = await sql.connect(config);
      const result = await pool.request()
        .input('CustomerID', sql.Int, customerId)
        .query(`
          SELECT 
            CustomerID,
            FullName,
            Email,
            passwordhash,
            Creationdate
          FROM Customers
          WHERE CustomerID = @CustomerID
        `);
  
      if (!result.recordset.length) {
        return res.status(404).json({ message: 'Customer not found' });
      }
  
      const cust = result.recordset[0];
      // split FullName into first/last
      const [firstName = '', lastName = ''] = cust.FullName.split(' ');
  
      res.json({
        firstName,
        lastName,
        email: cust.Email,
        phone: cust.PhoneNumber,
        joinDate: cust.CreatedAt.toISOString().slice(0, 10)
      });
    } catch (err) {
      console.error('Error fetching customer data:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

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
