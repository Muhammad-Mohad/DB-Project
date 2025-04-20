import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './components/index.jsx';
import ProductsPage from './components/products.jsx';
import AccountPage from './components/account.jsx';
import AboutPage from './components/about.jsx';
import CartPage from './components/cart.jsx';
import LoginPage from './components/login.jsx';
import SignupPage from './components/signup.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
