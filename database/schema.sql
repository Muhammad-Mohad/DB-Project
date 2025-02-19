create database myDB;
use myDB;

create table Customers
(
    CustomerID int IDENTITY(1, 1) PRIMARY KEY,  -- CustomerID is the primary key for Customers Table
    FullName NVARCHAR(100) not null,
    Email NVARCHAR(100) unique not null,
    PasswordHash NVARCHAR(200) not null,
    PhoneNumber NVARCHAR(30),
    CustomerAddress NVARCHAR(200),
    CreationDate DATETIME DEFAULT GETDATE()
);

create table Products
(
    ProductID int IDENTITY(1, 1) PRIMARY KEY,   -- ProductID is the primary key for Products Table
    ProductName NVARCHAR(100) not null,
    ProductDescription NVARCHAR(500),
    Category NVARCHAR(50) Check (Category in ('GPU', 'RAM', 'CPU', 'Motherboard', 'Case', 'SSD')), 
    Price int not null,
    Stock int not null,
    ImageURL NVARCHAR(200),
    AddedAt DATETIME DEFAULT GETDATE()
);

create table Orders
(
    OrderID int IDENTITY(1, 1) PRIMARY KEY,     -- OrderID is the primary key for Orders Table
    CustomerID int not null,
    OrderDate datetime DEFAULT GETDATE(),
    TotalAmount int not null,
    OrderStatus NVARCHAR(50) check (OrderStatus in ('Pending', 'Delivered', 'Cancelled', 'Returned')),
    FOREIGN key (CustomerID) REFERENCES Customers(CustomerID)   -- Every order has a reference for Customers via the CustomerID from Customers Table
);

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

create table Payments
(
    PaymentID int IDENTITY(1, 1) PRIMARY KEY,   -- PaymentID is the primary key for Payments Table
    OrderID int not null,
    PaymentMethod NVARCHAR(50) check (PaymentMethod in ('Dedit Card', 'Cash on Delivery', 'Bank Transfer')),
    PaymentStatus NVARCHAR(50) check (PaymentStatus in ('Pending', 'Completed', 'Failed', 'Refunded')),
    TransactionDate DATETIME DEFAULT GETDATE(),
    FOREIGN key (OrderID) REFERENCES Orders(OrderID) on delete cascade  -- Every Payment has a reference for Orders via the OrderID from Orders Table
);

select * from Customers;
select * from Products;
select * from Orders;
select * from OrderDetails;
select * from Payments;