import { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

import id1 from './images/id1.jpg';
import id2 from './images/id2.jpg';
import id3 from './images/id3.webp';
import id4 from './images/id4.jpeg';
import id5 from './images/id5.jpg';
import id6 from './images/id6.png';
import id7 from './images/id7.webp';
import id8 from './images/id8.jpg';
import id9 from './images/id9.jpg';
import id10 from './images/id10.jpg';
import id11 from './images/id11.jpg';
import id12 from './images/id12.jpg';
import id13 from './images/id13.jpg';
import id14 from './images/id14.jpg';
import id15 from './images/id15.jpg';
import id16 from './images/id16.webp';

const ProductsPage = () => {
  const baseProducts = [
    { id: 1, image: id1, badge: "Best Seller", isNew: false, popularity: 5, stock: "in-stock"},
    { id: 2, image: id2, badge: "New", isNew: true, popularity: 4, stock: "in-stock"},
    { id: 3, image: id3, badge: "", isNew: false, popularity: 3, stock: "in-stock"},
    { id: 4, image: id4, badge: "", isNew: false, popularity: 2, stock: "in-stock"},
    { id: 5, image: id5, badge: "", isNew: false, popularity: 4, stock: "low-stock"},
    { id: 6, image: id6, badge: "", isNew: true, popularity: 3, stock: "in-stock"},
    { id: 7, image: id7, badge: "", isNew: false, popularity: 4, stock: "in-stock"},
    { id: 8, image: id8, badge: "Best Seller", isNew: false, popularity: 5, stock: "in-stock"},
    { id: 9, image: id9, badge: "", isNew: false, popularity: 4, stock: "in-stock"},
    { id: 10, image: id10, badge: "", isNew: true, popularity: 3, stock: "in-stock"},
    { id: 11, image: id11, badge: "", isNew: false, popularity: 4, stock: "low-stock"},
    { id: 12, image: id12, badge: "", isNew: false, popularity: 3, stock: "in-stock"},
    { id: 13, image: id13, badge: "", isNew: true, popularity: 3, stock: "in-stock"},
    { id: 14, image: id14, badge: "", isNew: false, popularity: 2, stock: "in-stock"},
    { id: 15, image: id15, badge: "", isNew: false, popularity: 4, stock: "in-stock"},
    { id: 16, image: id16, badge: "New", isNew: true, popularity: 3, stock: "in-stock"}
  ];

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const fetchedProducts = await Promise.all(
        baseProducts.map(async (bp) => {
          try {
            const response = await fetch(`http://localhost:5000/products/${bp.id}`);
            if (!response.ok) throw new Error(`Failed to fetch product ${bp.id}`);
            const data = await response.json();

            return {
              id: bp.id,
              image: bp.image,
              badge: bp.badge,
              isNew: bp.isNew,
              popularity: bp.popularity,
              title: data.productName,
              description: data.productDescription,
              category: data.category,
              price: data.price,
              stock: bp.stock
            };
          } catch (error) {
            console.error(`Error fetching product ${bp.id}:`, error);
            return {
              id: bp.id,
              image: bp.image,
              badge: bp.badge,
              isNew: bp.isNew,
              popularity: bp.popularity,
              title: "Unavailable",
              description: "No description available",
              category: "unknown",
              price: 0,
              stock: "unknown"
            };
          }
        })
      );
      setProducts(fetchedProducts);
    };

    fetchAllProducts();
  }, []);

  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [cartCount, setCartCount] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Only update cart count on initial load
  useEffect(() => {
    updateCartCount();
  }, []);

  // Trigger filtering and sorting on products/category/sort change
  useEffect(() => {
    filterAndSortProducts();
  }, [products, categoryFilter, sortBy]);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  };

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
        image: product.image
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  };

  const filterAndSortProducts = () => {
    let filtered = categoryFilter === 'all'
      ? [...products]
      : products.filter(product => product.category === categoryFilter);

    switch (sortBy) {
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

  return (
    <div className="bg-gray-50 text-slate-800 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-sm py-5 sticky top-0 z-50">
        <div className="container mx-auto px-5 max-w-6xl">
          <div className="flex justify-between items-center">
            <a href="/" className="text-3xl font-bold text-blue-500 flex items-center gap-2.5">
              <span>⚡</span>NexGen Hardware
            </a>
            <div className="flex gap-8">
              <a href="/" className="font-medium hover:text-blue-500 transition-colors">Home</a>
              <a href="/products" className="font-medium text-blue-500 relative after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-blue-500">Shop</a>
              <a href="/about" className="font-medium hover:text-blue-500 transition-colors">About</a>
              <a href="/account" className="font-medium hover:text-blue-500 transition-colors">Account</a>
              <a href="/cart" className="font-medium hover:text-blue-500 transition-colors flex items-center">
                <FaShoppingCart className="mr-1" />
                <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-1">{cartCount}</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-5 max-w-6xl py-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-6">Premium PC Components</h1>
          <div className="flex flex-wrap gap-5 items-center">
            <div className="flex items-center gap-3">
              <label htmlFor="category-filter" className="font-medium">Category:</label>
              <select id="category-filter" className="px-3 py-2 border rounded-md" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="all">All Components</option>
                <option value="gpu">Graphics Cards</option>
                <option value="cpu">Processors</option>
                <option value="ram">Memory</option>
                <option value="motherboard">Motherboards</option>
                <option value="ssd">Storage</option>
                <option value="psu">Power Supplies</option>
                <option value="cooler">Cooling</option>
                <option value="case">Cases</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="sort-by" className="font-medium">Sort By:</label>
              <select id="sort-by" className="px-3 py-2 border rounded-md" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
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
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition hover:-translate-y-1">
              <div className="h-48 bg-gray-100 flex items-center justify-center p-5 relative">
                {product.badge && (
                  <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                    {product.badge}
                  </span>
                )}
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = `https://via.placeholder.com/300x200?text=${product.title.replace(/\s+/g, '+')}`;
                  }}
                />
              </div>
              <div className="p-5 flex flex-col h-[calc(100%-12rem)]">
                <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                <span className="text-xs text-slate-500 mb-3 uppercase tracking-wider">{product.category}</span>
                <p className="text-sm text-slate-600 mb-4 line-clamp-3">{product.description}</p>
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-lg font-bold">${product.price}</span>
                  <span className={`text-xs px-2 py-1 rounded font-medium ${
                    product.stock === 'in-stock' 
                      ? 'bg-green-50 text-green-600' 
                      : 'bg-yellow-50 text-yellow-600'
                  }`}>
                    {product.stock === 'in-stock' ? 'In Stock' : 'Low Stock'}
                  </span>
                </div>
                <button 
                  className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-medium transition"
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
          <p>&copy; 2025 NexGen Hardware. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductsPage;
