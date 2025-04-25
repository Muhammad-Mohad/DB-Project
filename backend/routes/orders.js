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

router.post('/', async (req, res) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items)) {
      return res.status(400).json({ message: 'Invalid items data' });
  }

  try {
      const pool = await sql.connect(config);

      const insertPromises = items.map(item => {
          return pool.request()
              .input('OrderID', sql.Int, item.orderID)
              .input('ProductID', sql.Int, item.productID)
              .input('Quantity', sql.Int, item.quantity)
              .input('Price', sql.Int, item.price)
              .query(`
                  INSERT INTO OrderDetails (OrderID, ProductID, Quantity, Price)
                  VALUES (@OrderID, @ProductID, @Quantity, @Price)
              `);
      });

      // Insert all order details
      await Promise.all(insertPromises);

      // Send back the orderID in the response
      res.status(201).json({
          message: 'Order details inserted successfully',
          orderID: items[0].orderID // Assuming all items belong to the same order
      });
  } catch (err) {
      console.error('Error inserting order details:', err);
      res.status(500).json({ message: 'Failed to insert order details' });
  }
});


  
  module.exports = router;