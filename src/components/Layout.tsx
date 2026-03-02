import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SEO_PAGES } from '../constants';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: isHome ? '#home' : '/' },
    { name: 'About', href: isHome ? '#about' : '/#about' },
    { name: 'Fleet', href: isHome ? '#fleet' : '/#fleet' },
    { name: 'Places', href: isHome ? '#places' : '/#places' },
    { name: 'Assistant', href: isHome ? '#assistant' : '/#assistant' },
    { name: 'Contact', href: isHome ? '#contact' : '/#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-white shadow-md py-2' : 'bg-black/20 backdrop-blur-sm py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center font-bold text-black text-xl shadow-sm">MT</div>
            <span className={`text-xl font-bold tracking-tight ${isScrolled || isMenuOpen ? 'text-gray-900' : 'text-white'}`}>Markapur Taxi</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 text-sm font-semibold">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className={`${isScrolled ? 'text-gray-600 hover:text-yellow-600' : 'text-white/80 hover:text-white'} transition-colors`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a href="tel:+919491320241" className="hidden sm:block bg-yellow-400 text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-yellow-500 transition-all shadow-md">
              Call: 9491320241
            </a>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${isScrolled || isMenuOpen ? 'text-gray-900' : 'text-white'}`}
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-4 text-base font-bold text-gray-700 hover:text-yellow-600 border-b border-gray-50 last:border-0"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="tel:+919491320241"
              className="block w-full bg-yellow-400 text-black text-center py-4 rounded-xl font-bold mt-4"
            >
              Book Now: 9491320241
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-gray-50 pt-32 pb-16 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-black rounded-[4rem] p-12 md:p-20 text-white flex flex-col md:flex-row justify-between items-center gap-12 mb-24">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-black mb-6">Coming to Markapur <br className="hidden md:block"/> Road Station?</h2>
            <p className="text-gray-400 text-xl font-light">We track your train and wait for you. Call for instant pickup.</p>
          </div>
          <div className="flex flex-col gap-4 w-full md:w-auto">
            <a href="tel:+919491320241" className="bg-yellow-400 text-black px-12 py-6 rounded-3xl font-black text-2xl text-center hover:bg-yellow-500 transition-all shadow-2xl">
              9491320241
            </a>
            <p className="text-center text-gray-500 text-sm font-bold uppercase tracking-widest underline decoration-yellow-400 underline-offset-4">Available 24/7</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20 px-8">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center font-black text-black text-2xl shadow-lg">MT</div>
              <span className="text-3xl font-black tracking-tighter">Markapur Taxi</span>
            </div>
            <p className="text-gray-500 text-lg leading-relaxed">
              Specialized in Markapur to Srisailam pilgrimage transport. Trusted, safe, and professional forest drivers.
            </p>
          </div>
          <div>
            <h4 className="font-black text-xl mb-8">Contact Information</h4>
            <ul className="space-y-4 text-gray-500 font-medium">
              <li>📞 Primary: 9491320241</li>
              <li>📞 Secondary: 91-9491320241</li>
              <li>📍 Markapur Road Railway Station, AP</li>
            </ul>
          </div>
          <div>
            <h4 className="font-black text-xl mb-8">Helpful Links</h4>
            <ul className="space-y-4 text-gray-500 font-medium">
              <li><Link to="/" className="hover:text-black">Home</Link></li>
              <li><a href="/#fleet" className="hover:text-black">Vehicle Options</a></li>
              <li><a href="/#assistant" className="hover:text-black">Travel Assistant</a></li>
              <li><a href="https://srisailamonline.com" target="_blank" className="hover:text-black">Official Temple Site</a></li>
            </ul>
          </div>
        </div>

        {/* SEO Links Section */}
        <div className="mb-20 px-8">
          <h4 className="font-black text-xl mb-8">Our Services</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SEO_PAGES.map((page) => (
              <Link 
                key={page.url} 
                to={`/${page.url}`}
                className="text-gray-500 hover:text-yellow-600 text-sm transition-colors"
              >
                {page.topic}
              </Link>
            ))}
          </div>
        </div>

        <div className="pt-10 border-t border-gray-200 text-center text-gray-400 text-sm">
          <p>© 2024 Markapur Taxi Services. For darshan/accommodation, please visit the official Srisailam website.</p>
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-white">
      <Navbar />
      <main>{children}</main>
      <Footer />
      
      {/* Floating Call Button for Mobile */}
      <a 
        href="tel:+919491320241" 
        className="md:hidden fixed bottom-6 right-6 z-[90] bg-yellow-400 text-black w-16 h-16 rounded-full flex items-center justify-center shadow-2xl animate-bounce border-4 border-white"
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
      </a>
    </div>
  );
};
