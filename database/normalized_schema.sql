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


create table Products
(
    ProductID int IDENTITY(1, 1) PRIMARY KEY,   -- ProductID is the primary key for Products Table
    ProductName NVARCHAR(100) not null,
    ProductDescription NVARCHAR(500),
    Category NVARCHAR(50) Check (Category in ('GPU', 'RAM', 'CPU', 'Motherboard', 'Case', 'SSD', 'cooler', 'psu')), 
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






create table Payments 
(
    PaymentID INT IDENTITY(1, 1) PRIMARY KEY,
    OrderID INT NOT NULL UNIQUE,
    FOREIGN KEY (OrderID) REFERENCES PaymentInfo(OrderID) ON DELETE CASCADE
);
create table PaymentInfo 
(
    OrderID INT PRIMARY KEY,
    PaymentMethod NVARCHAR(50),
    PaymentStatus NVARCHAR(50),
    TransactionDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID) ON DELETE CASCADE
);






create table ReturnInfo 
(
    OrderDetailID INT PRIMARY KEY,
    Reason NVARCHAR(200) NOT NULL,
    ReturnStatus NVARCHAR(50) CHECK (ReturnStatus IN ('Requested', 'Approved', 'Rejected', 'Refunded')),
    RequestDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (OrderDetailID) REFERENCES OrderDetails(OrderDetailID) ON DELETE CASCADE
);
create table Returns 
(
    ReturnID INT PRIMARY KEY,
    OrderDetailID INT UNIQUE NOT NULL,
    FOREIGN KEY (OrderDetailID) REFERENCES ReturnInfo(OrderDetailID) ON DELETE CASCADE
);
