
create database myDB;
use myDB;


drop table if exists Customers;
drop table if exists Products;
drop table if exists Orders;
drop table if exists OrderDetails;
drop table if exists Payments;
drop table if exists Admins;
drop table if exists Stocks;
drop table if exists Returns;
drop table if exists Reports;


create table Customers
(
    CustomerID int IDENTITY(1, 1) PRIMARY KEY,  -- CustomerID is the primary key for Customers Table
    FullName NVARCHAR(100) not null,
    Email NVARCHAR(100) unique not null ,
    PasswordHash NVARCHAR(200) not null,
    PhoneNumber NVARCHAR(30),
    CustomerAddress NVARCHAR(200),
    CreationDate DATETIME DEFAULT GETDATE()
);

alter table customers 
add constraint c1 
CHECK (Email LIKE '%_@%_._%' AND Email NOT LIKE '%@%@%' AND Email NOT LIKE '%..%');

alter table customers 
add constraint c2
CHECK (
    LEN(PasswordHash) >= 8 AND                          -- Minimum length 8
    PasswordHash LIKE '%[0-9]%' AND                      -- At least one digit
    PasswordHash LIKE '%[A-Z]%' AND                      -- At least one uppercase letter
    PasswordHash LIKE '%[a-z]%' AND                      -- At least one lowercase letter
    PasswordHash LIKE '%[^a-zA-Z0-9]%'                   -- At least one special character
);

ALTER TABLE Customers
ADD CONSTRAINT C3
CHECK (
    LEN(PhoneNumber) = 11 AND            -- Exactly 11 digits
    PhoneNumber NOT LIKE '%[^0-9]%' AND  -- Only digits allowed
    PhoneNumber LIKE '03%'               -- Must start with '03'
);

insert into customers (fullname, email,
PasswordHash, PhoneNumber, CustomerAddress) values
('Kraken', 'mohad@gmail.com', 'Mohad!23', '03338240907', 'PUEHS');

select * from Customers;

TRUNCATE table customers;
drop table customers;



create table Products
(
    ProductID int IDENTITY(1, 1) PRIMARY KEY,   -- ProductID is the primary key for Products Table
    ProductName NVARCHAR(100) not null,
    ProductDescription NVARCHAR(500),
    Category NVARCHAR(50) Check (Category in ('GPU', 'RAM', 'CPU', 'Motherboard', 'Case', 'SSD')), 
    Price int not null,
    Stock int,
    ImageURL NVARCHAR(200),
    AddedAt DATETIME DEFAULT GETDATE()
);

ALTER TABLE Products
ADD CONSTRAINT p3 CHECK (Price > 0);

alter table products
add constraint p1
UNIQUE(ProductDescription);

alter table products
add constraint p2
check (stock>=0)

create table Orders
(
    OrderID int IDENTITY(1, 1) PRIMARY KEY,     -- OrderID is the primary key for Orders Table
    CustomerID int not null,
    OrderDate datetime DEFAULT GETDATE(),
    TotalAmount int not null,
    OrderStatus NVARCHAR(50) check (OrderStatus in ('Pending', 'Delivered', 'Cancelled', 'Returned')),
    FOREIGN key (CustomerID) REFERENCES Customers(CustomerID)  on delete CASCADE -- Every order has a reference for Customers via the CustomerID from Customers Table
);



ALTER TABLE Orders
ADD CONSTRAINT o1 CHECK (TotalAmount >= 0);

create table OrderDetails
(
    OrderDetailID int IDENTITY(1, 1) PRIMARY key,   -- OrderDetailID is the primary key for OrderDetails Table
    OrderID int not null,
    ProductID int not null,
    Quantity int not null,
    Price int not null,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID) on delete CASCADE,   -- Every OrderDetail has a reference for Orders via the OrderID from Orders Table
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID) on delete CASCADE    -- Every OrderDetail has a reference for Products via the ProductID from Products Table
);


ALTER TABLE OrderDetails
ADD CONSTRAINT od1 CHECK (Quantity > 0);

-- Ensure price is positive
ALTER TABLE OrderDetails
ADD CONSTRAINT od2 CHECK (Price >= 0);

create table Payments
(
    PaymentID int IDENTITY(1, 1) PRIMARY KEY,   -- PaymentID is the primary key for Payments Table
    OrderID int not null,
    PaymentMethod NVARCHAR(50) check (PaymentMethod in ('Debit Card', 'Cash on Delivery', 'Bank Transfer')),
    PaymentStatus NVARCHAR(50) check (PaymentStatus in ('Pending', 'Completed', 'Failed', 'Refunded')),
    TransactionDate DATETIME DEFAULT GETDATE(),
    FOREIGN key (OrderID) REFERENCES Orders(OrderID) on delete cascade  -- Every Payment has a reference for Orders via the OrderID from Orders Table
);


create table Admins
(
    AdminID int IDENTITY(1, 1) PRIMARY KEY,     -- AdminID is the primary key for Admins Table
    UserName NVARCHAR(100) unique not null, 
    PasswordHash NVARCHAR(200) not null,
);

alter table admins 
add constraint a1
CHECK (
    LEN(PasswordHash) >= 8 AND                          -- Minimum length 8
    PasswordHash LIKE '%[0-9]%' AND                      -- At least one digit
    PasswordHash LIKE '%[A-Z]%' AND                      -- At least one uppercase letter
    PasswordHash LIKE '%[a-z]%' AND                      -- At least one lowercase letter
    PasswordHash LIKE '%[^a-zA-Z0-9]%'                   -- At least one special character
);

create table Stocks
(
    ID int IDENTITY(1, 1) PRIMARY key,  -- ID is the primary key for Stocks Table
    ProductID int not null,
    AdminID int not null,
    Quantity int check (Quantity>=0),
    FOREIGN key (ProductID) REFERENCES Products(ProductID),   -- Every Stock has a reference for Products via the ProductID from Products Table
    FOREIGN key (AdminID) REFERENCES Admins(AdminID)    -- Every Stock has a reference for Admins via the AdminID from Admins Table
);

drop table Stocks;

create table Returns 
(
    ReturnID int IDENTITY(1,1) PRIMARY KEY,  -- ReturnID is the primary key for Returns Table
    OrderDetailID int not null,
    Reason NVARCHAR(200) not null,
    ReturnStatus NVARCHAR(50) CHECK (ReturnStatus IN ('Requested', 'Approved', 'Rejected', 'Refunded')),
    RequestDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (OrderDetailID) REFERENCES OrderDetails(OrderDetailID) ON DELETE CASCADE    -- Every Return has a reference for OrderDetail via the OrderDetailID from OrderDetails Table
);


-- Queries 

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


select * from [Returns]
select * from OrderDetails
-- 
-- CREATE TABLE ProductReviews (
--     ReviewID INT IDENTITY(1,1) PRIMARY KEY,
--     ProductID INT NOT NULL,
--     CustomerID INT NOT NULL,
--     Rating INT NOT NULL CHECK (Rating BETWEEN 1 AND 5),
--     ReviewText NVARCHAR(500),
--     ReviewDate DATETIME DEFAULT GETDATE(),
--     FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
--     FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
--     CONSTRAINT UQ_ProductCustomerReview UNIQUE (ProductID, CustomerID)
-- );


-- CREATE TABLE ShippingInformation (
--     ShippingID INT IDENTITY(1,1) PRIMARY KEY,
--     OrderID INT NOT NULL,
--     TrackingNumber NVARCHAR(50),
--     ShippingMethod NVARCHAR(50),
--     ShippingAddress NVARCHAR(200) NOT NULL,
--     ShippingDate DATETIME,
--     EstimatedDelivery DATETIME,
--     ActualDelivery DATETIME,
--     ShippingCost DECIMAL(10,2) CHECK (ShippingCost >= 0),
--     FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
-- );

SELECT TOP 5 
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