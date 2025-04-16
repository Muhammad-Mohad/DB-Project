
-- Queries 
select * from Customers;
-- inertion queries

-- Insert multiple customers
INSERT INTO Customers (FullName, Email, PasswordHash, PhoneNumber, CustomerAddress)
VALUES 
('Alice Johnson', 'alice.j@example.com', 'Alice123!', '03123456789', '123 Garden St, CityA'),
('Bob Smith', 'bob.smith@example.com', 'BobSecure456!', '03987654321', '456 Park Ave, CityB'),
('Charlie Brown', 'charlie.b@example.com', 'CharliePass789!', '03112233445', '789 Oak Lane, CityC'),
('Diana Prince', 'diana.p@example.com', 'DianaWonder1!', '03334455667', '101 Hero St, CityD'),
('Ethan Hunt', 'ethan.h@example.com', 'MissionImpossible2!', '03556677889', '202 Action Rd, CityE');

-- Insert multiple products
INSERT INTO Products (ProductName, ProductDescription, Category, Price, Stock, ImageURL)
VALUES
('Intel Core i9-13900K', '13th Gen Intel Core i9 Processor', 'CPU', 589, 25, 'https://example.com/i9-13900k.jpg'),
('Corsair Vengeance 32GB', 'DDR5 5600MHz Memory Kit', 'RAM', 199, 50, 'https://example.com/corsair-vengeance.jpg'),
('ASUS ROG Strix Z790', 'LGA 1700 ATX Motherboard', 'Motherboard', 399, 15, 'https://example.com/asus-z790.jpg'),
('Samsung 980 Pro 1TB', 'PCIe 4.0 NVMe SSD', 'SSD', 129, 30, 'https://example.com/samsung-980pro.jpg'),
('NZXT H7 Flow', 'Mid-Tower ATX Case', 'Case', 129, 20, 'https://example.com/nzxt-h7flow.jpg');

-- Insert multiple orders

INSERT INTO Orders (CustomerID, TotalAmount, OrderStatus)
VALUES
(6, 788, 'Pending'),
(7, 129, 'Delivered'),
(3, 918, 'Delivered'),
(4, 199, 'Cancelled'),
(5, 528, 'Pending');

-- Insert order details

INSERT INTO OrderDetails (OrderID, ProductID, Quantity, Price)
VALUES
(5, 2, 1, 199),
(8, 4, 1, 129),
(9, 5, 2, 129),
(10, 5, 1, 129),
(11, 1, 1, 589),
(12, 3, 1, 399)


-- Insert payment records
INSERT INTO Payments (OrderID, PaymentMethod, PaymentStatus)
VALUES
(5, 'Debit Card', 'Pending'),
(8, 'Bank Transfer', 'Completed'),
(9, 'Debit Card', 'Completed'),
(10, 'Debit Card', 'Failed'),
(12, 'Bank Transfer', 'Pending');

-- Insert admin accounts

INSERT INTO Admins (UserName, PasswordHash)
VALUES
('superadmin', 'SuperAdmin123!'),
('inventory_manager', 'Inventory456!'),
('sales_admin', 'SalesAdmin789!'),
('support_admin', 'SupportAdmin101!');

-- Insert return requests
INSERT INTO Returns (OrderDetailID, Reason, ReturnStatus)
VALUES
(8, 'Wrong product delivered', 'Requested'),
(9, 'Changed my mind', 'Rejected');


-- Queries for customer table

INSERT INTO Customers (FullName, Email, PasswordHash, PhoneNumber, CustomerAddress)
VALUES ('John Doe', 'john.doe@example.com', 'SecurePass123!', '03123456789', '123 Main St, City');

select * from customers;

SELECT CustomerID, FullName, Email FROM Customers 
WHERE Email = 'john.doe@example.com' AND PasswordHash = 'SecurePass123!';

UPDATE Customers
SET FullName = 'John M. Doe', PhoneNumber = '03987654321', CustomerAddress = '456 Oak Ave, City'
WHERE CustomerID = 1;


SELECT * FROM Customers WHERE CustomerID = 1;

-- Product management queries

INSERT INTO Products (ProductName, ProductDescription, Category, Price, Stock, ImageURL)
VALUES ('RTX 4090', 'NVIDIA GeForce RTX 4090 24GB GDDR6X', 'GPU', 1599, 10, 'https://example.com/rtx4090.jpg');

UPDATE Products
SET Price = 1499, Stock = 15
WHERE ProductID = 1;

SELECT * FROM Products;

SELECT * FROM Products WHERE Category = 'GPU';

SELECT * FROM Products 
WHERE ProductName LIKE '%RTX%' OR ProductDescription LIKE '%RTX%';

UPDATE Products SET Stock = Stock - 1 WHERE ProductID = 1;


-- order processing queries


INSERT INTO Orders (CustomerID, TotalAmount, OrderStatus)
VALUES (3, 3198, 'Pending');
    
INSERT INTO OrderDetails (OrderID, ProductID, Quantity, Price)
VALUES (SCOPE_IDENTITY(), 1, 2, 1599);

SELECT o.OrderID, o.OrderDate, o.TotalAmount, o.OrderStatus,
       p.ProductName, od.Quantity, od.Price
FROM Orders o
JOIN OrderDetails od ON o.OrderID = od.OrderID
JOIN Products p ON od.ProductID = p.ProductID
WHERE o.OrderID = 5;

UPDATE Orders SET OrderStatus = 'Delivered' WHERE OrderID = 5;

SELECT o.OrderID, o.OrderDate, o.TotalAmount, o.OrderStatus
FROM Orders o
WHERE o.CustomerID = 3
ORDER BY o.OrderDate DESC;

select * from Orders;

select * from OrderDetails;


-- payment processing queries

INSERT INTO Payments (OrderID, PaymentMethod, PaymentStatus)
VALUES (5, 'Debit Card', 'Completed');

UPDATE Payments SET PaymentStatus = 'Refunded' WHERE PaymentID = 2;

SELECT * FROM Payments WHERE OrderID = 5;


-- Admin queries

INSERT INTO Admins (UserName, PasswordHash)
VALUES ('admin1', 'AdminPass123!');

SELECT AdminID, UserName FROM Admins 
WHERE UserName = 'admin1' AND PasswordHash = 'AdminPass123!';

-- returns management queries

select  * from Returns;

INSERT INTO Returns (OrderDetailID, Reason, ReturnStatus)
VALUES (2, 'Product not as described', 'Requested');

UPDATE Returns SET ReturnStatus = 'Approved' WHERE ReturnID = 2;

SELECT r.ReturnID, p.ProductName, r.Reason, r.ReturnStatus, r.RequestDate
FROM Returns r
JOIN OrderDetails od ON r.OrderDetailID = od.OrderDetailID
JOIN Products p ON od.ProductID = p.ProductID;


-- inventory management queries

SELECT ProductName, Stock FROM Products WHERE ProductID = 1;


UPDATE Products SET Stock = 20 WHERE ProductID = 1;



-- Deletion queries
select * from customers;
-- Delete a specific customer
DELETE FROM Customers WHERE CustomerID = 5;

-- Delete customers who haven't placed any orders
DELETE FROM Customers 
WHERE CustomerID NOT IN (SELECT DISTINCT CustomerID FROM Orders);

-- Delete a specific product
DELETE FROM Products WHERE ProductID = 5;

-- Delete products with zero stock that have never been ordered
DELETE FROM Products 
WHERE Stock = 20 AND ProductID NOT IN (SELECT DISTINCT ProductID FROM OrderDetails);


-- Delete a specific order
DELETE FROM Orders WHERE OrderID = 5;

-- Delete cancelled orders older than 1 year
DELETE FROM Orders 
WHERE OrderStatus = 'Delivered' AND OrderDate < DATEADD(YEAR, -1, GETDATE());

-- Delete details for a specific order
DELETE FROM OrderDetails WHERE OrderID = 8;

-- Delete order details with quantity less than 1 (shouldn't exist due to constraint)
DELETE FROM OrderDetails WHERE Quantity < 1;


-- Delete a specific payment record
DELETE FROM Payments WHERE PaymentID = 5;

-- Delete failed payments older than 6 months
DELETE FROM Payments 
WHERE PaymentStatus = 'Failed' AND TransactionDate < DATEADD(MONTH, -6, GETDATE());

-- Delete a specific return request
DELETE FROM Returns WHERE ReturnID = 9;

-- Delete completed returns older than 2 years
DELETE FROM Returns 
WHERE ReturnStatus IN ('Approved', 'Rejected') 
AND RequestDate < DATEADD(YEAR, -2, GETDATE());


select * from Returns
select * from OrderDetails


--Additional complex queries

--retrieve the top 3 most selling products

SELECT TOP 3 
    p.ProductID,
    p.ProductName,
    p.Category,
    SUM(od.Quantity) AS TotalQuantitySold,
    SUM(od.Quantity * od.Price) AS TotalRevenue
FROM 
    OrderDetails od
JOIN 
    Products p ON od.ProductID = p.ProductID
JOIN 
    Orders o ON od.OrderID = o.OrderID
WHERE 
    o.OrderStatus != 'Cancelled'
GROUP BY 
    p.ProductID, p.ProductName, p.Category
ORDER BY 
    TotalQuantitySold DESC;


--most profitable categories
SELECT 
    p.Category,
    COUNT(DISTINCT o.OrderID) AS NumberOfOrders,
    SUM(od.Quantity) AS TotalItemsSold,
    SUM(od.Quantity * od.Price) AS TotalRevenue
FROM 
    OrderDetails od
JOIN 
    Products p ON od.ProductID = p.ProductID
JOIN 
    Orders o ON od.OrderID = o.OrderID
WHERE 
    o.OrderStatus != 'Cancelled'
GROUP BY 
    p.Category
ORDER BY 
    TotalRevenue DESC;


--Highest and Lowest Priced Products in Each Category
WITH CategoryPrices AS (
    SELECT 
        Category,
        ProductName,
        Price,
        RANK() OVER (PARTITION BY Category ORDER BY Price DESC) AS PriceRankHigh,
        RANK() OVER (PARTITION BY Category ORDER BY Price ASC) AS PriceRankLow
    FROM 
        Products
)
SELECT 
    Category,
    MAX(CASE WHEN PriceRankHigh = 1 THEN ProductName + ' ($' + CAST(Price AS VARCHAR) END) AS HighestPricedProduct,
    MAX(CASE WHEN PriceRankLow = 1 THEN ProductName + ' ($' + CAST(Price AS VARCHAR) END) AS LowestPricedProduct
FROM 
    CategoryPrices
GROUP BY 
    Category;


--Monthly sales report
SELECT 
    YEAR(o.OrderDate) AS Year,
    MONTH(o.OrderDate) AS Month,
    COUNT(o.OrderID) AS NumberOfOrders,
    SUM(o.TotalAmount) AS TotalRevenue,
    AVG(o.TotalAmount) AS AverageOrderValue
FROM 
    Orders o
WHERE 
    o.OrderStatus = 'Delivered'
GROUP BY 
    YEAR(o.OrderDate), MONTH(o.OrderDate)
ORDER BY 
    Year, Month;


--Products Running Low on Stock (Below 5 items)

SELECT 
    ProductID,
    ProductName,
    Category,
    Stock,
    CASE 
        WHEN Stock = 0 THEN 'Out of Stock'
        WHEN Stock <= 2 THEN 'Critical'
        WHEN Stock <= 5 THEN 'Low'
    END AS StockStatus
FROM 
    Products
WHERE 
    Stock <= 5
ORDER BY 
    Stock ASC;


-- Payment Method Analysis
SELECT 
    p.PaymentMethod,
    COUNT(p.PaymentID) AS NumberOfPayments,
    SUM(o.TotalAmount) AS TotalAmountProcessed,
    AVG(o.TotalAmount) AS AveragePaymentAmount,
    SUM(CASE WHEN p.PaymentStatus = 'Failed' THEN 1 ELSE 0 END) AS FailedPayments,
    CAST(SUM(CASE WHEN p.PaymentStatus = 'Failed' THEN 1 ELSE 0 END) AS FLOAT) / COUNT(p.PaymentID) * 100 AS FailureRatePercentage
FROM 
    Payments p
JOIN 
    Orders o ON p.OrderID = o.OrderID
GROUP BY 
    p.PaymentMethod
ORDER BY 
    TotalAmountProcessed DESC;


