
import React, { useState, useEffect, useRef } from 'react';
import { FLEET_DATA, TOURIST_PLACES } from './constants';
import { askTravelAssistant } from './services/geminiService';
import { SearchResponse } from './types';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Fleet', href: '#fleet' },
    { name: 'Places', href: '#places' },
    { name: 'Assistant', href: '#assistant' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-white shadow-md py-2' : 'bg-black/20 backdrop-blur-sm py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center font-bold text-black text-xl shadow-sm">MT</div>
            <span className={`text-xl font-bold tracking-tight ${isScrolled || isMenuOpen ? 'text-gray-900' : 'text-white'}`}>Markapur Taxi</span>
          </div>
          
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

const Hero: React.FC = () => {
  return (
    <div id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden scroll-mt-20">
      <div className="absolute inset-0">
        <img 
          src="/srisaila-mallikarjuna-swamy-temple-mallikarjun-jyotirlinga-srisailam-tourism-entry-fee-timings-holidays-reviews-header.jpg" 
          className="w-full h-full object-cover" 
          alt="Srisailam Temple"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-gray-900"></div>
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto text-center px-4 pt-20">
        <div className="inline-block px-4 py-1.5 mb-6 bg-yellow-400/20 backdrop-blur-md border border-yellow-400/30 rounded-full text-yellow-400 text-sm font-bold tracking-widest uppercase">
          Safe & Reliable Pilgrimage Taxi
        </div>
        <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-tight tracking-tighter">
          Markapur Road <br/> to <span className="text-yellow-400">Srisailam</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
          Premium transport from <span className="font-semibold text-white">Markapur Railway Station (MRK)</span>. 
          The nearest and most convenient gateway to Lord Mallikarjuna Swamy.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <a href="#fleet" className="bg-yellow-400 text-black px-10 py-5 rounded-2xl font-black text-xl hover:bg-yellow-500 transition-all shadow-2xl transform hover:-translate-y-1">
            Book a Taxi
          </a>
          <a href="#assistant" className="bg-white/10 backdrop-blur-lg text-white border border-white/20 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all shadow-2xl">
            Ask Questions
          </a>
        </div>
      </div>
    </div>
  );
};

const AISearchBox: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResponse | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (e?: React.FormEvent, customQuery?: string) => {
    const finalQuery = customQuery || query;
    e?.preventDefault();
    if (!finalQuery.trim()) return;
    
    setQuery(finalQuery);
    setLoading(true);
    const response = await askTravelAssistant(finalQuery);
    setResult(response);
    setLoading(false);

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const keywords = [
    "Distance to Srisailam",
    "Taxi Fare",
    "Best Route",
    "Darshan Timings",
    "Accommodation",
    "Railway Station Pickup"
  ];

  return (
    <section id="assistant" className="py-24 bg-gray-50 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black mb-4">Travel Assistant</h2>
          <p className="text-gray-600 text-lg">Instant help for your journey from Markapur Road</p>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-gray-100">
          <form onSubmit={(e) => handleSearch(e)} className="relative mb-10">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask distance, taxi fare, or travel route..."
              className="w-full pl-8 pr-40 py-6 rounded-3xl bg-gray-50 border-2 border-transparent focus:border-yellow-400 focus:bg-white focus:outline-none text-xl shadow-inner transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-3 top-3 bottom-3 bg-black text-white px-10 rounded-2xl font-bold hover:bg-gray-800 transition-all disabled:bg-gray-400 flex items-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : 'Search'}
            </button>
          </form>

          <div className="space-y-4">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Common Traveler Queries</p>
            <div className="flex flex-wrap gap-3">
              {keywords.map((k, i) => (
                <button
                  key={i}
                  onClick={() => handleSearch(undefined, k)}
                  className="text-sm font-medium bg-gray-100 hover:bg-yellow-100 hover:text-yellow-700 px-5 py-2.5 rounded-2xl text-gray-700 transition-all border border-transparent hover:border-yellow-200"
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          {result && (
            <div ref={resultRef} className="mt-16 pt-10 border-t border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center text-xl shadow-lg font-bold">MT</div>
                <div>
                  <h3 className="text-2xl font-black">Travel Guide Response</h3>
                </div>
              </div>
              <div className="bg-yellow-50 rounded-3xl p-8 md:p-10 border border-yellow-100">
                <div className="prose prose-lg prose-yellow max-w-none text-gray-800 leading-relaxed font-medium whitespace-pre-wrap">
                  {result.answer}
                </div>
                
                {result.sources && result.sources.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-yellow-200">
                    <p className="text-sm font-bold text-yellow-800 uppercase tracking-widest mb-4">Official Sources</p>
                    <div className="flex flex-wrap gap-4">
                      {result.sources.map((source, idx) => (
                        <a 
                          key={idx}
                          href={source.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs bg-white/50 hover:bg-white px-3 py-1.5 rounded-full border border-yellow-200 text-yellow-900 transition-all flex items-center gap-1 shadow-sm hover:shadow-md"
                        >
                          <span className="truncate max-w-[150px]">{source.title}</span>
                          <span className="text-[10px] opacity-50">↗</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const FleetSection: React.FC = () => {
  return (
    <section id="fleet" className="py-32 bg-white overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-6xl font-black mb-6 leading-none">Our <span className="text-yellow-400">Vehicles</span></h2>
            <p className="text-gray-600 text-xl font-light">Available for immediate pickup at Markapur Road Station. Expert drivers for safe forest travel.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {FLEET_DATA.map((car) => (
            <div key={car.id} className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500">
              <div className="h-72 overflow-hidden relative">
                <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-6 left-6 bg-white text-black text-xs font-black px-4 py-2 rounded-full shadow-lg uppercase tracking-widest">
                  {car.type}
                </div>
              </div>
              <div className="p-10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-3xl font-black mb-1">{car.name}</h3>
                    <p className="text-yellow-600 font-bold">{car.capacity}</p>
                  </div>
                </div>
                <p className="text-gray-500 mb-8 leading-relaxed">{car.description}</p>
                <a href="tel:+919491320241" className="block w-full py-5 bg-gray-50 group-hover:bg-yellow-400 text-gray-900 text-center rounded-2xl font-black transition-all border border-gray-100 group-hover:border-transparent group-hover:shadow-lg">
                  Book 9491320241
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TouristPlacesSection: React.FC = () => {
  return (
    <section id="places" className="py-32 bg-gray-900 text-white rounded-t-[4rem] -mt-10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-black mb-6">Explore <span className="text-yellow-400">Srisailam</span></h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto font-light leading-relaxed">Book a full day package starting from Markapur Road to visit all these sacred sites.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {TOURIST_PLACES.map((place) => (
            <div key={place.id} className="relative group rounded-[3rem] overflow-hidden h-[30rem] shadow-2xl">
              <img src={place.image} alt={place.name} className="absolute inset-0 w-full h-full object-cover brightness-50 group-hover:brightness-75 transition-all duration-700" />
              <div className="absolute inset-0 p-12 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent">
                <h3 className="text-4xl font-black mb-4 group-hover:text-yellow-400 transition-colors">{place.name}</h3>
                <p className="text-gray-300 text-lg max-w-xl opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  {place.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
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
              <li><a href="#home" className="hover:text-black">Return to Top</a></li>
              <li><a href="#fleet" className="hover:text-black">Vehicle Options</a></li>
              <li><a href="#assistant" className="hover:text-black">Travel Assistant</a></li>
              <li><a href="https://srisailamonline.com" target="_blank" className="hover:text-black">Official Temple Site</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-10 border-t border-gray-200 text-center text-gray-400 text-sm">
          <p>© 2024 Markapur Taxi Services. For darshan/accommodation, please visit the official Srisailam website.</p>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <Hero />
      <div id="about" className="py-32 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 mb-6 bg-gray-100 rounded-full text-gray-600 text-sm font-bold tracking-widest uppercase">
                Expert Drivers
              </div>
              <h2 className="text-5xl font-black mb-8 leading-tight">Comfortable Journey from <span className="text-yellow-400">Markapur Road</span></h2>
              <p className="text-xl text-gray-600 font-light mb-12 leading-relaxed">
                The journey through Nallamala Forest to Srisailam takes about 3 hours. We ensure your trip is safe, punctual, and comfortable.
              </p>
              <div className="space-y-6">
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center text-2xl shadow-sm flex-shrink-0">🚉</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">MRK Station Pickup</h4>
                    <p className="text-gray-500">Professional pickup directly from the Markapur Road railway station exit.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center text-2xl shadow-sm flex-shrink-0">🛕</div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Temple Pilgrimage</h4>
                    <p className="text-gray-500">Direct drops and sightseeing packages for the complete Srisailam experience.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-yellow-400 rounded-[3rem] rotate-3 -z-10"></div>
              <img 
                src="/srisaila-mallikarjuna-swamy-temple-mallikarjun-jyotirlinga-srisailam-tourism-entry-fee-timings-holidays-reviews-header.jpg" 
                className="w-full rounded-[3rem] shadow-2xl relative z-10" 
                alt="Reliable Taxi"
              />
            </div>
          </div>
        </div>
      </div>
      <AISearchBox />
      <FleetSection />
      <TouristPlacesSection />
      <Footer />
    </div>
  );
};

export default App;
