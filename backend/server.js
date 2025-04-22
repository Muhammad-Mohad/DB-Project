const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const customerRoutes = require('./routes/customerRoutes');
app.use('/customers', customerRoutes);

const orders = require('./routes/orders');
app.use('/orders', orders);

const products = require('./routes/products');
app.use('/products', products);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});