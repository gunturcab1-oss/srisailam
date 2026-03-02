import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO_PAGES } from '../constants';
import { Layout } from './Layout';
import { ArrowLeft, Phone, MapPin, Clock, ShieldCheck } from 'lucide-react';

const SEOPage: React.FC = () => {
  const { url } = useParams<{ url: string }>();
  const page = SEO_PAGES.find(p => p.url === url);

  useEffect(() => {
    if (page) {
      document.title = page.seoTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', page.metaDescription);
      }
    }
    window.scrollTo(0, 0);
  }, [page]);

  if (!page) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-black mb-4">Page Not Found</h1>
            <Link to="/" className="text-yellow-600 font-bold hover:underline">Return Home</Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-32 pb-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-yellow-600 mb-8 transition-colors font-bold">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          
          <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border border-gray-100">
            <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              {page.topic}
            </h1>
            
            <div className="prose prose-lg prose-yellow max-w-none text-gray-700 leading-relaxed mb-12">
              <p className="text-xl font-medium text-gray-900 mb-8">
                {page.metaDescription}
              </p>
              <div className="whitespace-pre-wrap">
                {page.content}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-yellow-50 p-8 rounded-3xl border border-yellow-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center text-black">
                    <Phone size={24} />
                  </div>
                  <h3 className="text-xl font-black">Book Now</h3>
                </div>
                <p className="text-gray-600 mb-4">Instant booking and 24/7 support for your pilgrimage.</p>
                <a href="tel:+919491320241" className="text-2xl font-black text-black hover:text-yellow-700 transition-colors">
                  9491320241
                </a>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center">
                    <ShieldCheck size={24} />
                  </div>
                  <h3 className="text-xl font-black">Safe Travel</h3>
                </div>
                <p className="text-gray-600">Professional drivers experienced in forest and ghat road driving.</p>
              </div>
            </div>

            <div className="bg-black text-white p-10 rounded-[2.5rem] text-center">
              <h2 className="text-3xl font-black mb-4">Ready for your journey?</h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">We provide the most reliable taxi service from Markapur Road to Srisailam and surrounding areas.</p>
              <a href="tel:+919491320241" className="inline-block bg-yellow-400 text-black px-10 py-4 rounded-2xl font-black text-xl hover:bg-yellow-500 transition-all shadow-xl">
                Call: 9491320241
              </a>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-2xl font-black mb-8">Other Popular Services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SEO_PAGES.filter(p => p.url !== url).slice(0, 6).map((otherPage) => (
                <Link 
                  key={otherPage.url} 
                  to={`/${otherPage.url}`}
                  className="bg-white p-6 rounded-2xl border border-gray-100 hover:border-yellow-400 hover:shadow-lg transition-all font-bold text-gray-700"
                >
                  {otherPage.topic}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SEOPage;
