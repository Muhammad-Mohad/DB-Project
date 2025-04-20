import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="bg-gray-50 text-slate-800 leading-relaxed">
      {/* Navbar */}
      <nav className="bg-white shadow-sm py-5 sticky top-0 z-50">
        <div className="container mx-auto px-5 max-w-6xl">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-3xl font-bold text-blue-500 no-underline flex items-center gap-2.5">
              <span>⚡</span>
              NexGen Hardware
            </Link>
            <div className="flex gap-8">
              <Link to="/" className="text-slate-800 no-underline font-medium hover:text-blue-500 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all hover:after:w-full">
                Home
              </Link>
              <Link to="/about" className="text-slate-800 no-underline font-medium hover:text-blue-500 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all hover:after:w-full">
                About
              </Link>
              <Link to="/account" className="text-slate-800 no-underline font-medium hover:text-blue-500 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all hover:after:w-full">
                Account
              </Link>
              <Link to="/cart" className="text-slate-800 no-underline font-medium hover:text-blue-500 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all hover:after:w-full">
                Cart
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center min-h-[70vh] py-10">
        <div className="container mx-auto px-5 max-w-6xl">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl mb-5 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Next Generation PC Components
            </h1>
            <p className="text-xl text-slate-500 mb-10 leading-loose">
              Cutting-edge hardware for gamers, creators, and professionals
            </p>
            <p className="text-lg mb-10 text-slate-800">
              Discover the latest GPUs, CPUs, RAM, SSDs, and premium components to build 
              your ultimate PC. We offer top-tier performance parts from leading brands 
              with competitive pricing and expert support.
            </p>
            <Link 
              to="/products" 
              className="inline-block px-8 py-3.5 bg-blue-500 text-white no-underline rounded-lg font-semibold text-lg transition-all shadow-lg shadow-blue-500/20 hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

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

export default Index;
