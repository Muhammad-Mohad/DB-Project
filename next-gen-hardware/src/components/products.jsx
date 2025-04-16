import { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const ProductsPage = () => {
  // Product data
  const products = [
    {
      id: 1,
      title: "NVIDIA GeForce RTX 4080",
      category: "gpu",
      description: "16GB GDDR6X memory with DLSS 3 technology for ultimate gaming performance.",
      price: 1199,
      stock: "in-stock",
      badge: "Best Seller",
      isNew: false,
      popularity: 5
    },
    {
      id: 2,
      title: "Intel Core i7-14700K",
      category: "cpu",
      description: "14th Gen Intel Core i7 Processor with 20 cores and 28 threads.",
      price: 449,
      stock: "in-stock",
      badge: "New",
      isNew: true,
      popularity: 4
    },
    {
      id: 3,
      title: "G.Skill Trident Z5 32GB",
      category: "ram",
      description: "DDR5 6000MHz Memory Kit optimized for Intel and AMD systems.",
      price: 179,
      stock: "in-stock",
      badge: "",
      isNew: false,
      popularity: 3
    },
    {
      id: 4,
      title: "ASUS ROG Strix B650",
      category: "motherboard",
      description: "AM5 ATX Motherboard with PCIe 5.0 and DDR5 support for AMD Ryzen.",
      price: 299,
      stock: "in-stock",
      badge: "",
      isNew: false,
      popularity: 2
    },
    {
      id: 5,
      title: "Samsung 990 Pro 1TB",
      category: "ssd",
      description: "PCIe 4.0 NVMe SSD with read speeds up to 7,450 MB/s.",
      price: 139,
      stock: "low-stock",
      badge: "",
      isNew: false,
      popularity: 4
    },
    {
      id: 6,
      title: "AMD Radeon RX 7800 XT",
      category: "gpu",
      description: "16GB GDDR6 memory with AMD RDNA 3 architecture for 1440p gaming.",
      price: 599,
      stock: "in-stock",
      badge: "",
      isNew: true,
      popularity: 3
    }
  ];

  // State
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [cartCount, setCartCount] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Initialize
  useEffect(() => {
    updateCartCount();
    filterAndSortProducts();
  }, []);

  // Update cart count
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  };

  // Add to cart
  const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        image: `https://via.placeholder.com/300x200?text=${product.title.replace(/\s+/g, '+')}`
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  };

  // Filter and sort products
  const filterAndSortProducts = () => {
    // Filter by category
    let filtered = categoryFilter === 'all' 
      ? [...products] 
      : products.filter(product => product.category === categoryFilter);
    
    // Sort products
    switch(sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => b.isNew - a.isNew);
        break;
      default:
        break;
    }
    
    setFilteredProducts(filtered);
  };

  // Re-filter when options change
  useEffect(() => {
    filterAndSortProducts();
  }, [categoryFilter, sortBy]);

  return (
    <div className="bg-gray-50 text-slate-800 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-sm py-5 sticky top-0 z-50">
        <div className="container mx-auto px-5 max-w-6xl">
          <div className="flex justify-between items-center">
            <a href="/" className="text-3xl font-bold text-blue-500 no-underline flex items-center gap-2.5">
              <span>⚡</span>
              NexGen Hardware
            </a>
            <div className="flex gap-8">
              <a href="/" className="text-slate-800 no-underline font-medium hover:text-blue-500 transition-colors">
                Home
              </a>
              <a href="/products" className="text-blue-500 no-underline font-medium relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-blue-500">
                Shop
              </a>
              <a href="/about" className="text-slate-800 no-underline font-medium hover:text-blue-500 transition-colors">
                About
              </a>
              <a href="/account" className="text-slate-800 no-underline font-medium hover:text-blue-500 transition-colors">
                Account
              </a>
              <a href="/cart" className="text-slate-800 no-underline font-medium hover:text-blue-500 transition-colors flex items-center">
                <FaShoppingCart className="mr-1" />
                <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-1">
                  {cartCount}
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-5 max-w-6xl py-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-800 mb-6">Premium PC Components</h1>
          
          <div className="flex flex-wrap gap-5 items-center">
            <div className="flex items-center gap-3">
              <label htmlFor="category-filter" className="font-medium text-slate-800">Category:</label>
              <select 
                id="category-filter"
                className="px-3 py-2 border border-gray-200 rounded-md bg-white cursor-pointer min-w-[180px]"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Components</option>
                <option value="gpu">Graphics Cards</option>
                <option value="cpu">Processors</option>
                <option value="ram">Memory</option>
                <option value="motherboard">Motherboards</option>
                <option value="ssd">Storage</option>
              </select>
            </div>
            
            <div className="flex items-center gap-3">
              <label htmlFor="sort-by" className="font-medium text-slate-800">Sort By:</label>
              <select 
                id="sort-by"
                className="px-3 py-2 border border-gray-200 rounded-md bg-white cursor-pointer min-w-[180px]"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">New Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow hover:-translate-y-1">
              <div className="h-48 bg-gray-100 flex items-center justify-center p-5 relative">
                {product.badge && (
                  <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                    {product.badge}
                  </span>
                )}
                <img 
                  src={`https://via.placeholder.com/300x200?text=${product.title.replace(/\s+/g, '+')}`} 
                  alt={product.title}
                  className="max-w-full max-h-full object-contain mix-blend-multiply"
                />
              </div>
              
              <div className="p-5 flex flex-col h-[calc(100%-12rem)]">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{product.title}</h3>
                <span className="text-xs text-slate-500 mb-3 uppercase tracking-wider">{product.category}</span>
                <p className="text-sm text-slate-600 mb-4 line-clamp-3">{product.description}</p>
                
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-800">${product.price}</span>
                  <span className={`text-xs px-2 py-1 rounded font-medium ${
                    product.stock === 'in-stock' 
                      ? 'bg-green-50 text-green-600' 
                      : 'bg-yellow-50 text-yellow-600'
                  }`}>
                    {product.stock === 'in-stock' ? 'In Stock' : 'Low Stock'}
                  </span>
                </div>
                
                <button 
                  className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-medium transition-colors"
                  onClick={() => addToCart(product.id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white text-center py-8 mt-20">
        <div className="container mx-auto px-5 max-w-6xl">
          <div className="py-5">
            <p>&copy; 2025 NexGen Hardware. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductsPage;