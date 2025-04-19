import { FaUser, FaMedal, FaLightbulb, FaHandHoldingHeart, FaShoppingCart } from 'react-icons/fa';

const AboutPage = () => {
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
              <a href="/about" className="text-blue-500 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-blue-500">
                About
              </a>
              <a href="/account" className="text-slate-800 hover:text-blue-500 transition-colors">
                Account
              </a>
              <a href="/cart" className="text-slate-800 hover:text-blue-500 transition-colors flex items-center">
                <FaShoppingCart className="mr-1" />
                <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-1">
                  0
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-slate-800 text-white py-20 text-center mb-10">
        <div className="container mx-auto px-5 max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About NexGen Hardware</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your trusted source for premium PC components and expert building advice since 2025
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-5 max-w-6xl">
        {/* Our Story Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-800">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              Founded in 2025 by Mohad Zaheer, NexGen Hardware began as a vision to revolutionize the PC components market. What started as a passion project among tech enthusiasts quickly grew into a leading hardware provider under the leadership of CEO Shavez Bajwa and CTO Rustam Chatha.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, we serve customers worldwide, maintaining our commitment to quality components and honest advice. Every product we sell is carefully selected by our expert team, ensuring you get only the best components for your build.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80" 
              alt="Our team working on PC builds"
              className="w-full h-auto"
            />
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-20">
          <div className="order-1 md:order-2 space-y-6">
            <h2 className="text-3xl font-bold text-slate-800">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              At NexGen Hardware, we believe everyone deserves access to high-quality PC components without the confusion that often comes with building a computer. Our mission is to simplify the process while providing top-tier products at competitive prices.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We're not just selling parts - we're helping you bring your computing vision to life. Whether you're a professional creator, competitive gamer, or first-time builder, we're here to guide you every step of the way.
            </p>
          </div>
          <div className="order-2 md:order-1 rounded-lg overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
              alt="Technology mission"
              className="w-full h-auto"
            />
          </div>
        </section>

        {/* Team Section */}
        <section className="text-center my-20">
          <h2 className="text-3xl font-bold text-slate-800 mb-12">Meet Our Leadership</h2>
          <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
            {[
              { name: "Mohad Zaheer", role: "Founder" },
              { name: "Shavez Bajwa", role: "Chief Executive Officer" },
              { name: "Rustam Chatha", role: "Chief Technology Officer" }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden w-full sm:w-64">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <FaUser className="text-6xl text-gray-400" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-gray-500 text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="my-20">
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaMedal className="text-2xl" />,
                title: "Quality First",
                description: "We rigorously test and select only the most reliable components from trusted manufacturers to ensure your build stands the test of time."
              },
              {
                icon: <FaLightbulb className="text-2xl" />,
                title: "Expert Advice",
                description: "Our team of PC building experts is always available to help you choose the right components for your specific needs and budget."
              },
              {
                icon: <FaHandHoldingHeart className="text-2xl" />,
                title: "Customer Focus",
                description: "Your satisfaction is our top priority. We stand behind every product we sell with comprehensive support and warranty services."
              }
            ].map((value, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-8 mt-20">
        <div className="container mx-auto px-5 max-w-6xl text-center">
          <p>&copy; 2025 NexGen Hardware. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;