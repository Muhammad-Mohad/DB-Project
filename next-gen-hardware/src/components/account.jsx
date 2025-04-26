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
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    joinDate: '',
    orders: [],     
    addresses: []   
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const customerId = localStorage.getItem('userId'); 

        if (!customerId) {
          console.warn("No user ID found in localStorage.");
          return;
        }

        const response = await fetch(`http://localhost:5000/customers/data/${customerId}`);

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const customer = await response.json();

        const [firstName = '', lastName = ''] = customer.fullname?.split(' ') || [];

        setUserData(prev => ({
          ...prev,
          firstName,
          lastName,
          email: customer.email,
          phone: customer.phonenumber,
          joinDate: new Date(customer.creationdate).toLocaleString('default', { month: 'long', year: 'numeric' }),
        }));
      } catch (error) {
        console.error("Failed to fetch customer info:", error.message);
      }

      try {
        const customerId = localStorage.getItem('userId');
        const response = await fetch(`http://localhost:5000/orders/${customerId}`);
    
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }
    
        const orders = await response.json();
    
        setUserData(prev => ({
          ...prev,
          orders: orders.map(order => ({
            id: order.OrderID,
            date: new Date(order.OrderDate).toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' }),
            items: 1, 
            total: order.TotalAmount,
            status: mapOrderStatus(order.OrderStatus)
          }))
        }));
    
      } catch (error) {
        console.error("Failed to fetch orders:", error.message);
      }
    };

    fetchUserData();
  }, []);

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

  // Helper function to map order status
  const mapOrderStatus = (status) => {
    const statusMap = {
      'Pending': 'processing',
      'Delivered': 'completed',
      'Cancelled': 'cancelled',
      'Returned': 'cancelled'
    };
    return statusMap[status] || 'processing'; // Default to 'processing' if unknown
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
              <a href="/" className="text-slate-800 hover:text-blue-500 transition-colors">Home</a>
              <a href="/products" className="text-slate-800 hover:text-blue-500 transition-colors">Shop</a>
              <a href="/about" className="text-slate-800 hover:text-blue-500 transition-colors">About</a>
              <a href="/account" className="text-blue-500 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-blue-500">Account</a>
              <a href="/cart" className="text-slate-800 hover:text-blue-500 transition-colors flex items-center">
                <FaShoppingCart className="mr-1" />
                <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-1">0</span>
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
                    <h2 className="text-2xl font-semibold">{userData.firstName} {userData.lastName}</h2>
                    <p className="text-gray-500">Member since {userData.joinDate}</p>
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
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-medium">Last Name</label>
                    <input
                      type="text"
                      value={userData.lastName}
                      onChange={(e) => setUserData({...userData, lastName: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-medium">Email Address</label>
                    <input
                      type="email"
                      value={userData.email}
                      onChange={(e) => setUserData({...userData, email: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-medium">Phone Number</label>
                    <input
                      type="text"
                      value={userData.phone}
                      onChange={(e) => setUserData({...userData, phone: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountPage;
