import { useState, useEffect } from 'react';
import { FaShoppingCart, FaMinus, FaPlus, FaTrash } from 'react-icons/fa';

const CartPage = () => {
  // State for cart items
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
    updateCartCount(savedCart);
  }, []);

  // Update cart count
  const updateCartCount = (cartItems) => {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  };

  // Update cart item quantity
  const updateCartItem = (productId, newQuantity) => {
    const updatedCart = cart.map(item => 
      item.id === productId ? { ...item, quantity: Math.max(1, newQuantity) } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartCount(updatedCart);
  };

  // Remove item from cart
  const removeCartItem = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartCount(updatedCart);
  };

  // Calculate order summary
  const calculateSummary = () => {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? (subtotal > 1000 ? 0 : 15) : 0;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

    return { subtotal, shipping, tax, total, itemCount };
  };

  // Handle checkout
  const handleCheckout = () => {
    alert('Checkout functionality would be implemented here');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-sm py-5 sticky top-0 z-50">
        <div className="container mx-auto px-5 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <a href="/" className="text-3xl font-bold text-blue-500 flex items-center gap-2.5">
              <span>⚡</span>
              NexGen Hardware
            </a>
            <div className="flex gap-4 md:gap-8 w-full md:w-auto justify-between">
              <a href="/" className="text-slate-800 hover:text-blue-500 transition-colors">Home</a>
              <a href="/products" className="text-slate-800 hover:text-blue-500 transition-colors">Shop</a>
              <a href="/about" className="text-slate-800 hover:text-blue-500 transition-colors">About</a>
              <a href="/account" className="text-slate-800 hover:text-blue-500 transition-colors">Account</a>
              <a href="/cart" className="text-blue-500 relative flex items-center">
                Cart
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
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Your Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            {cart.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <FaShoppingCart className="text-5xl text-gray-400 mx-auto mb-6" />
                <p className="text-gray-600 text-lg mb-6">Your cart is empty</p>
                <a 
                  href="/products" 
                  className="text-blue-500 font-medium hover:underline"
                >
                  Browse products
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col md:flex-row">
                    <div className="w-full md:w-48 h-48 bg-gray-100 flex items-center justify-center p-4">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="max-w-full max-h-full object-contain mix-blend-multiply"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-lg font-bold mb-4">${(item.price * item.quantity).toFixed(2)}</p>
                      <div className="mt-auto flex flex-wrap items-center gap-4">
                        <div className="flex items-center border border-gray-200 rounded-md">
                          <button 
                            onClick={() => updateCartItem(item.id, item.quantity - 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            <FaMinus />
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateCartItem(item.id, parseInt(e.target.value))}
                            min="1"
                            className="w-12 text-center border-x border-gray-200 py-1"
                          />
                          <button 
                            onClick={() => updateCartItem(item.id, item.quantity + 1)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            <FaPlus />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeCartItem(item.id)}
                          className="flex items-center gap-2 text-gray-500 hover:text-red-500"
                        >
                          <FaTrash /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Order Summary */}
          {cart.length > 0 && (
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-28">
                <h3 className="text-xl font-semibold mb-6 pb-4 border-b">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal ({calculateSummary().itemCount} items)</span>
                    <span>${calculateSummary().subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${calculateSummary().shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8%)</span>
                    <span>${calculateSummary().tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
                    <span>Total</span>
                    <span>${calculateSummary().total.toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md font-medium mt-6 transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8 mt-12">
        <div className="container mx-auto px-5 max-w-6xl text-center">
          <p>&copy; 2025 NexGen Hardware. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="hover:text-blue-300">Privacy Policy</a>
            <a href="#" className="hover:text-blue-300">Terms of Service</a>
            <a href="#" className="hover:text-blue-300">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CartPage;