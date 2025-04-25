import { useState, useEffect } from 'react';
import { FaShoppingCart, FaMinus, FaPlus, FaTrash, FaTimes, FaCheckCircle, FaMapMarkerAlt, FaCreditCard } from 'react-icons/fa';

const CartPage = () => {
  // State
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  });

  // Load cart from localStorage
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
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

    return { subtotal, shipping, tax, total, itemCount };
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle checkout steps
  const nextStep = () => setCheckoutStep(prev => prev + 1);
  const prevStep = () => setCheckoutStep(prev => prev - 1);

  // Submit order
  const submitOrder = async (e) => {
    e.preventDefault();

    const { subtotal, shipping, tax, total, itemCount } = calculateSummary();
    const customerID = localStorage.getItem('userId');
  
    const customerData = {
      fullName: formData.name,
      email: formData.email,
      password: formData.cardCvv, 
      phoneNumber: '', 
      customerAddress: formData.address,
      totalAmount: total,
      customerID: customerID,
      count: itemCount
    };
  
    try {
      const response = await fetch('http://localhost:5000/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData)
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.orderID) {
          localStorage.setItem('orderID', data.orderID);

          const orderDetails = cart.map(item => ({
            orderID: data.orderID,
            productID: item.id,
            quantity: item.quantity,
            price: item.price*item.quantity
          }));
      
          const orderDetailsResponse = await fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: orderDetails })
          });
      
          if (!orderDetailsResponse.ok) {
            const orderDetailsError = await orderDetailsResponse.json();
            alert('Error submitting order details: ' + (orderDetailsError.message || 'Failed'));
          }
        }
  
        setOrderComplete(true);
  
        localStorage.removeItem('cart');
        setCart([]);
        setCartCount(0);
      } else {
        const error = await response.json();
        alert('Error: ' + error.message || 'Failed to order');
      }
    } catch (err) {
      console.error('Error submitting order', err);
      alert('Network or server error.');
    }
  };
  

  // Reset checkout
  const resetCheckout = () => {
    setShowCheckout(false);
    setCheckoutStep(1);
    setOrderComplete(false);
    setFormData({
      name: '',
      email: '',
      address: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvv: ''
    });
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
                <p className="text-gray-600 text-lg mb-6">
                  {orderComplete ? 'Your order has been placed successfully!' : 'Your cart is empty'}
                </p>
                <a 
                  href="/products" 
                  className="text-blue-500 font-medium hover:underline"
                >
                  {orderComplete ? 'Continue Shopping' : 'Browse products'}
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
          {cart.length > 0 && !orderComplete && (
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
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md font-medium mt-6 transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Checkout</h2>
                <button 
                  onClick={resetCheckout}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Checkout Steps */}
              {!orderComplete ? (
                <div>
                  {/* Progress Indicator */}
                  <div className="flex justify-between mb-8 relative">
                    <div className="flex flex-col items-center z-10">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${checkoutStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                        1
                      </div>
                      <span className={`text-sm mt-2 ${checkoutStep >= 1 ? 'text-blue-500' : 'text-gray-500'}`}>Shipping</span>
                    </div>
                    <div className="flex flex-col items-center z-10">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${checkoutStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                        2
                      </div>
                      <span className={`text-sm mt-2 ${checkoutStep >= 2 ? 'text-blue-500' : 'text-gray-500'}`}>Payment</span>
                    </div>
                    <div className="flex flex-col items-center z-10">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${checkoutStep >= 3 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                        3
                      </div>
                      <span className={`text-sm mt-2 ${checkoutStep >= 3 ? 'text-blue-500' : 'text-gray-500'}`}>Confirm</span>
                    </div>
                    <div className="absolute top-5 left-10 right-10 h-1 bg-gray-200 z-0"></div>
                    <div 
                      className="absolute top-5 left-10 right-10 h-1 bg-blue-500 z-0 transition-all duration-300"
                      style={{ width: `${(checkoutStep - 1) * 50}%` }}
                    ></div>
                  </div>

                  {/* Step 1: Shipping */}
                  {checkoutStep === 1 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-blue-500" /> Shipping Information
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex justify-end mt-6">
                        <button
                          onClick={nextStep}
                          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md font-medium"
                          disabled={!formData.name || !formData.email || !formData.address}
                        >
                          Continue to Payment
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Payment */}
                  {checkoutStep === 2 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <FaCreditCard className="text-blue-500" /> Payment Details
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                            <input
                              type="text"
                              name="cardExpiry"
                              value={formData.cardExpiry}
                              onChange={handleInputChange}
                              placeholder="MM/YY"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                            <input
                              type="text"
                              name="cardCvv"
                              value={formData.cardCvv}
                              onChange={handleInputChange}
                              placeholder="123"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between mt-6">
                        <button
                          onClick={prevStep}
                          className="text-blue-500 hover:text-blue-700 font-medium py-2 px-4"
                        >
                          Back
                        </button>
                        <button
                          onClick={nextStep}
                          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md font-medium"
                          disabled={!formData.cardNumber || !formData.cardExpiry || !formData.cardCvv}
                        >
                          Review Order
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Confirm */}
                  {checkoutStep === 3 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                      
                      <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Shipping Information</h4>
                        <p>{formData.name}</p>
                        <p>{formData.address}</p>
                        <p>{formData.email}</p>
                      </div>

                      <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Payment Method</h4>
                        <p>Card ending in {formData.cardNumber.slice(-4)}</p>
                        <p>Expires {formData.cardExpiry}</p>
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between font-bold text-lg mb-4">
                          <span>Total</span>
                          <span>${calculateSummary().total.toFixed(2)}</span>
                        </div>
                        <button
                          onClick={submitOrder}
                          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md font-medium"
                        >
                          Place Order
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Order Complete */
                <div className="text-center py-8">
                  <FaCheckCircle className="text-5xl text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Order Confirmed!</h3>
                  <p className="text-gray-600 mb-6">Thank you for your purchase. A confirmation has been sent to {formData.email}.</p>
                  <button
                    onClick={resetCheckout}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md font-medium"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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