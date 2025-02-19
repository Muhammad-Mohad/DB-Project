use myDB;

create table Customers
(
    CustomerID int IDENTITY(1, 1) PRIMARY KEY,
    FullName NVARCHAR(100) not null,
    Email NVARCHAR(100) unique not null,
    PasswordHash NVARCHAR(200) not null,
    PhoneNumber NVARCHAR(30),
    CustomerAddress NVARCHAR(200),
    CreationDate DATETIME DEFAULT GETDATE()
);

create table Products
(
    ProductID int IDENTITY(1, 1) PRIMARY KEY,
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
    OrderID int IDENTITY(1, 1) PRIMARY KEY,
    CustomerID int not null,
    OrderDate datetime DEFAULT GETDATE(),
    TotalAmount int not null,
    OrderStatus NVARCHAR(50) check (OrderStatus in ('Pending', 'Delivered', 'Cancelled', 'Returned')),
    FOREIGN key (CustomerID) REFERENCES Customers(CustomerID)
);

create table OrderDetails
(
    OrderDetailID int IDENTITY(1, 1) PRIMARY key,
    OrderID int not null,
    ProductID int not null,
    Quantity int not null,
    Price int not null,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID) on delete CASCADE,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID) on delete CASCADE
);

create table Payments
(
    PaymentID int IDENTITY(1, 1) PRIMARY KEY,
    OrderID int not null,
    PaymentMethod NVARCHAR(50) check (PaymentMethod in ('Dedit Card', 'Cash on Delivery', 'Bank Transfer')),
    PaymentStatus NVARCHAR(50) check (PaymentStatus in ('Pending', 'Completed', 'Failed', 'Refunded')),
    TransactionDate DATETIME DEFAULT GETDATE(),
    FOREIGN key (OrderID) REFERENCES Orders(OrderID) on delete cascade
);

select * from Customers;
select * from Products;
select * from Orders;
select * from OrderDetails;
select * from Payments;