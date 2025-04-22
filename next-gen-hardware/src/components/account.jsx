import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUser, 
  FaBox, 
  FaMapMarkerAlt, 
  FaHeart, 
  FaCog, 
  FaSignOutAlt,
  FaPlus,
  FaShoppingCart
} from 'react-icons/fa';

const AccountPage = () => {
  const navigate = useNavigate();
  // State for user data
  const [userData, setUserData] = useState({
    firstName: 'Mohad',
    lastName: 'Zaheer',
    email: 'mohad@nexgenhardware.com',
    phone: '+1 (555) 123-4567',
    joinDate: 'January 2025',
    orders: [
      {
        id: 'NGH-2025-001',
        date: 'Jan 15, 2025',
        items: 3,
        total: 1899.97,
        status: 'completed'
      },
      {
        id: 'NGH-2025-002',
        date: 'Feb 3, 2025',
        items: 1,
        total: 599.99,
        status: 'processing'
      },
      {
        id: 'NGH-2025-003',
        date: 'Mar 12, 2025',
        items: 2,
        total: 1249.98,
        status: 'cancelled'
      }
    ],
    addresses: [
      {
        type: 'primary',
        name: 'Mohad Zaheer',
        street: '123 Tech Street',
        city: 'Silicon Valley, CA 94025',
        country: 'United States',
        phone: '+1 (555) 123-4567'
      },
      {
        type: 'work',
        name: 'Mohad Zaheer',
        street: '456 Innovation Blvd',
        street2: 'Suite 200',
        city: 'San Francisco, CA 94107',
        country: 'United States'
      }
    ]
  });

  // State for active tab
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Tab navigation items
  const navItems = [
    { id: 'profile', icon: <FaUser />, label: 'Profile' },
    { id: 'orders', icon: <FaBox />, label: 'Orders' },
    { id: 'addresses', icon: <FaMapMarkerAlt />, label: 'Addresses' },
    { id: 'wishlist', icon: <FaHeart />, label: 'Wishlist' },
    { id: 'settings', icon: <FaCog />, label: 'Settings' },
    { id: 'logout', icon: <FaSignOutAlt />, label: 'Logout' }
  ];

  // Handle tab change
  const handleTabChange = (tabId) => {
    if (tabId === 'logout') {
      setIsLoggedIn(false);
      navigate('/login');
      return;
    }
    setActiveTab(tabId);
  };
  

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusClasses = {
      completed: 'bg-green-50 text-green-600',
      processing: 'bg-yellow-50 text-yellow-600',
      cancelled: 'bg-red-50 text-red-600'
    };

    const statusText = {
      completed: 'Completed',
      processing: 'Processing',
      cancelled: 'Cancelled'
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${statusClasses[status]}`}>
        {statusText[status]}
      </span>
    );
  };

  return (
    <div className="bg-gray-50 text-slate-800 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-sm py-5 sticky top-0 z-50">
        <div className="container mx-auto px-5 max-w-6xl">
          <div className="flex justify-between items-center">
            <a href="/" className="text-3xl font-bold text-blue-500 flex items-center gap-2.5">
              <span>⚡</span>
              NexGen Hardware
            </a>
            <div className="hidden md:flex gap-8">
              <a href="/" className="text-slate-800 hover:text-blue-500 transition-colors">
                Home
              </a>
              <a href="/products" className="text-slate-800 hover:text-blue-500 transition-colors">
                Shop
              </a>
              <a href="/about" className="text-slate-800 hover:text-blue-500 transition-colors">
                About
              </a>
              <a href="/account" className="text-blue-500 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-blue-500">
                Account
              </a>
              <a href="/cart" className="text-slate-800 hover:text-blue-500 transition-colors flex items-center">
                <FaShoppingCart className="mr-1" />
                <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-1">
                  0
                </span>
              </a>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                {userData.firstName.charAt(0)}
              </div>
              <span className="hidden sm:inline">{userData.firstName}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-5 max-w-6xl py-8">
        {/* Account Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2 md:mb-0">My Account</h1>
          <p className="text-gray-500">
            Welcome back, {userData.firstName} {userData.lastName}!
          </p>
        </div>
        
        {/* Account Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-full lg:w-64 bg-white rounded-lg shadow-sm p-6 h-fit">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleTabChange(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-md flex items-center gap-3 transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-500 text-white'
                        : 'text-slate-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>
          
          {/* Main Content */}
          <div className="flex-1 bg-white rounded-lg shadow-sm p-6">
            {/* Profile Section */}
            {activeTab === 'profile' && (
              <div>
                <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                  <div className="w-20 h-20 rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl font-semibold">
                    {userData.firstName.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold">
                      {userData.firstName} {userData.lastName}
                    </h2>
                    <p className="text-gray-500">
                      Member since {userData.joinDate}
                    </p>
                  </div>
                </div>
                
                <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                  <div className="space-y-2">
                    <label className="block font-medium">First Name</label>
                    <input
                      type="text"
                      value={userData.firstName}
                      onChange={(e) => setUserData({...userData, firstName: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-medium">Last Name</label>
                    <input
                      type="text"
                      value={userData.lastName}
                      onChange={(e) => setUserData({...userData, lastName: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-medium">Email Address</label>
                    <input
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({...userData, email: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-medium">Phone Number</label>
                    <input
                      type="tel"
                      value={userData.phone}
                      onChange={(e) => setUserData({...userData, phone: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-md"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
                    >
                      Update Profile
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Orders Section */}
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Order History</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-gray-500 font-medium">Order #</th>
                        <th className="text-left py-3 px-4 text-gray-500 font-medium">Date</th>
                        <th className="text-left py-3 px-4 text-gray-500 font-medium">Items</th>
                        <th className="text-left py-3 px-4 text-gray-500 font-medium">Total</th>
                        <th className="text-left py-3 px-4 text-gray-500 font-medium">Status</th>
                        <th className="text-left py-3 px-4 text-gray-500 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userData.orders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-200">
                          <td className="py-3 px-4">{order.id}</td>
                          <td className="py-3 px-4">{order.date}</td>
                          <td className="py-3 px-4">{order.items}</td>
                          <td className="py-3 px-4">${order.total.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <StatusBadge status={order.status} />
                          </td>
                          <td className="py-3 px-4">
                            <a href="#" className="text-blue-500 font-medium">View</a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            {/* Addresses Section */}
            {activeTab === 'addresses' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Address Book</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userData.addresses.map((address, index) => (
                    <div 
                      key={index}
                      className={`border rounded-lg p-6 ${
                        address.type === 'primary' ? 'border-2 border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <h3 className="font-semibold text-lg mb-3">
                        {address.type === 'primary' ? 'Primary Address' : 'Work Address'}
                      </h3>
                      <div className="space-y-1 text-gray-600">
                        <p>{address.name}</p>
                        <p>{address.street}</p>
                        {address.street2 && <p>{address.street2}</p>}
                        <p>{address.city}</p>
                        <p>{address.country}</p>
                        {address.phone && <p>Phone: {address.phone}</p>}
                      </div>
                      <div className="flex gap-4 mt-4 text-sm">
                        <button className="text-blue-500 hover:text-blue-600">Edit</button>
                        <button className="text-blue-500 hover:text-blue-600">Remove</button>
                        {address.type !== 'primary' && (
                          <button className="text-blue-500 hover:text-blue-600">Set as Default</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-medium flex items-center gap-2">
                  <FaPlus /> Add New Address
                </button>
              </div>
            )}
            
            {/* Wishlist Section */}
            {activeTab === 'wishlist' && (
              <div className="text-center py-12">
                <h2 className="text-xl font-semibold mb-4">Your Wishlist</h2>
                <p className="text-gray-500 mb-6">You haven't added any items to your wishlist yet.</p>
                <a 
                  href="/products" 
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-medium"
                >
                  Browse Products
                </a>
              </div>
            )}
            
            {/* Settings Section */}
            {activeTab === 'settings' && (
              <div>
                <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                  <div className="space-y-2">
                    <label className="block font-medium">Language</label>
                    <select className="w-full px-4 py-2 border border-gray-200 rounded-md">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block font-medium">Currency</label>
                    <select className="w-full px-4 py-2 border border-gray-200 rounded-md">
                      <option>US Dollar (USD)</option>
                      <option>Euro (EUR)</option>
                      <option>British Pound (GBP)</option>
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="block font-medium">Email Notifications</label>
                    <select className="w-full px-4 py-2 border border-gray-200 rounded-md">
                      <option>All Notifications</option>
                      <option>Order Updates Only</option>
                      <option>None</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md font-medium"
                    >
                      Save Settings
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8 mt-12">
        <div className="container mx-auto px-5 max-w-6xl text-center">
          <p>&copy; 2025 NexGen Hardware. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AccountPage;