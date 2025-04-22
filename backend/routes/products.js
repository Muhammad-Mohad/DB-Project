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

router.get('/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        const pool = await sql.connect(config);

        const result = await pool.request()
            .input('ProductID', sql.Int, productId)
            .query(`
                SELECT productName, productDescription, category, price, stock
                FROM Products
                WHERE id = @ProductID
            `);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(result.recordset[0]);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching product data' });
    }
});

  
  module.exports = router;