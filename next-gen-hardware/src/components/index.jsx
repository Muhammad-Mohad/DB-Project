import React from "react";

const Index = () => {
  return (
    <div className="bg-slate-50 text-slate-800 leading-relaxed">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-5 sticky top-0 z-50">
        <div className="container mx-auto px-5 max-w-6xl flex justify-between items-center">
          <a
            href="index.html"
            className="text-2xl md:text-3xl font-bold text-blue-500 flex items-center gap-2"
          >
            ⚡ NexGen Hardware
          </a>
          <div className="flex gap-6 md:gap-8">
            {["Home", "About", "Account", "Cart"].map((item) => (
              <a
                key={item}
                href={`${item.toLowerCase()}.html`}
                className="relative text-slate-800 font-medium transition-colors hover:text-blue-500 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-500 after:transition-all hover:after:w-full"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center min-h-[70vh] py-16">
        <div className="container mx-auto px-5 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-5 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Next Generation PC Components
          </h1>
          <p className="text-lg md:text-xl text-slate-500 mb-6 leading-relaxed">
            Cutting-edge hardware for gamers, creators, and professionals
          </p>
          <p className="text-base md:text-lg text-slate-700 mb-10">
            Discover the latest GPUs, CPUs, RAM, SSDs, and premium components to build
            your ultimate PC. We offer top-tier performance parts from leading brands
            with competitive pricing and expert support.
          </p>
          <a
            href="products.html"
            className="inline-block px-8 py-3.5 bg-blue-500 text-white rounded-lg font-semibold text-lg transition-all shadow-md shadow-blue-500/20 hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30"
          >
            Shop Now
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white text-center py-8 mt-20">
        <div className="container mx-auto px-5 max-w-6xl">
          <p>&copy; 2025 NexGen Hardware. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
