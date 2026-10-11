import React, { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEO_PAGES } from '@/constants.tsx';
import { Layout } from '@/components/Layout.tsx';
import { ArrowLeft, Phone, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

const SITE_URL = 'https://www.markapurtaxi.com';

type TrainTiming = {
  number: string;
  name: string;
  route: string;
  runs: string;
  departure: string;
  arrival: string;
};

const CITY_TRAIN_GUIDES: Record<string, { stations: string; note: string; trains: TrainTiming[] }> = {
  'bengaluru-to-srisailam-via-markapur': {
    stations: 'KSR Bengaluru and Yesvantpur',
    note: 'Arrival after midnight is shown as next day. Special trains may operate only for a limited period.',
    trains: [
      { number: '18464', name: 'Prashanthi Express', route: 'KSR Bengaluru → Markapur Road', runs: 'Daily', departure: '13:40', arrival: '01:09 next day' },
      { number: '02812', name: 'Yesvantpur–Bhubaneswar Special', route: 'Yesvantpur → Markapur Road', runs: 'Monday (special)', departure: '04:30', arrival: '14:09' }
    ]
  },
  'hubballi-to-srisailam-via-markapur': {
    stations: 'SSS Hubballi Junction',
    note: 'Three scheduled direct options are shown. Confirm the running day printed on your ticket.',
    trains: [
      { number: '18048', name: 'Vasco da Gama–Shalimar Express', route: 'Hubballi → Markapur Road', runs: 'Tue, Thu, Fri, Sun', departure: '12:05', arrival: '22:29' },
      { number: '17226', name: 'Amaravathi Express', route: 'Hubballi → Markapur Road', runs: 'Daily', departure: '13:00', arrival: '23:28' },
      { number: '17329', name: 'Hubballi–Vijayawada Express', route: 'Hubballi → Markapur Road', runs: 'Daily', departure: '19:30', arrival: '06:51 next day' }
    ]
  },
  'tirupati-to-srisailam-via-markapur': {
    stations: 'Tirupati and Renigunta Junction',
    note: 'The train starts at Tirupati at 19:25 and departs Renigunta at 19:50.',
    trains: [
      { number: '17262', name: 'Tirupati–Guntur Express', route: 'Tirupati → Markapur Road', runs: 'Daily', departure: '19:25', arrival: '04:16 next day' }
    ]
  },
  'visakhapatnam-to-srisailam-via-markapur': {
    stations: 'Visakhapatnam and Duvvada',
    note: 'The weekly Howrah–Yesvantpur service boards at Duvvada; Prashanthi Express boards at Visakhapatnam.',
    trains: [
      { number: '18463', name: 'Prashanthi Express', route: 'Visakhapatnam → Markapur Road', runs: 'Daily', departure: '13:05', arrival: '22:50' },
      { number: '22831', name: 'Howrah–Yesvantpur Superfast', route: 'Duvvada → Markapur Road', runs: 'Thursday', departure: '04:40', arrival: '13:08' }
    ]
  },
  'kochi-to-srisailam-via-markapur': {
    stations: 'Ernakulam Town (North)',
    note: 'These are weekly special services and may be extended, changed or withdrawn. Confirm that the train is operating on your intended date.',
    trains: [
      { number: '07104', name: 'Kollam–Machilipatnam Special', route: 'Ernakulam Town → Markapur Road', runs: 'Sunday (special)', departure: '05:35', arrival: '05:28 next day' },
      { number: '07184', name: 'Kollam Special', route: 'Ernakulam Town → Markapur Road', runs: 'Friday (special)', departure: '11:45', arrival: '11:03 next day' },
      { number: '07182', name: 'Kollam–Kakinada Special', route: 'Ernakulam Town → Markapur Road', runs: 'Monday (special)', departure: '13:40', arrival: '13:43 next day' }
    ]
  },
  'kolkata-to-srisailam-via-markapur': {
    stations: 'Howrah, Shalimar and Santragachi',
    note: 'Different trains use different Kolkata-area stations. Confirm the boarding station carefully.',
    trains: [
      { number: '18063', name: 'Santragachi–Yelahanka AC Express', route: 'Santragachi → Markapur Road', runs: 'Thursday', departure: '12:50', arrival: '12:29 next day' },
      { number: '22831', name: 'Howrah–Yesvantpur Superfast', route: 'Howrah → Markapur Road', runs: 'Wednesday', departure: '14:45', arrival: '13:08 next day' },
      { number: '18047', name: 'Amaravati Express', route: 'Shalimar → Markapur Road', runs: 'Mon, Tue, Thu, Sat', departure: '23:10', arrival: '22:35 next day' }
    ]
  },
  'bhubaneswar-to-srisailam-via-markapur': {
    stations: 'Bhubaneswar',
    note: 'Prashanthi Express is the daily option. The other listed services run weekly or as specials.',
    trains: [
      { number: '18463', name: 'Prashanthi Express', route: 'Bhubaneswar → Markapur Road', runs: 'Daily', departure: '05:40', arrival: '22:50' },
      { number: '22831', name: 'Howrah–Yesvantpur Superfast', route: 'Bhubaneswar → Markapur Road', runs: 'Wednesday', departure: '21:15', arrival: '13:08 next day' },
      { number: '02811', name: 'Bhubaneswar–Yesvantpur Special', route: 'Bhubaneswar → Markapur Road', runs: 'Sunday (special)', departure: '19:15', arrival: '11:20 next day' }
    ]
  },
  'varanasi-to-srisailam-via-markapur': {
    stations: 'Varanasi Junction, Banaras and Pt. Deen Dayal Upadhyaya Junction',
    note: 'No dependable direct train was identified. Use a connection at Vijayawada and leave a generous transfer buffer; do not treat the rows as one guaranteed through itinerary.',
    trains: [
      { number: '12670', name: 'Gangakaveri Express', route: 'Varanasi → Vijayawada', runs: 'Tue, Thu', departure: '01:20', arrival: '05:10 next day' },
      { number: '16368', name: 'Kashi Tamil Express', route: 'Varanasi → Vijayawada', runs: 'Selected days', departure: '16:45', arrival: '20:30 next day' },
      { number: '17330', name: 'Vijayawada–Hubballi Express', route: 'Vijayawada → Markapur Road', runs: 'Daily', departure: '13:10', arrival: '17:14' },
      { number: '18463', name: 'Prashanthi Express', route: 'Vijayawada → Markapur Road', runs: 'Daily', departure: '19:35', arrival: '22:50' },
      { number: '17215', name: 'Machilipatnam–Dharmavaram Express', route: 'Vijayawada → Markapur Road', runs: 'Daily', departure: '21:25', arrival: '00:49 next day' }
    ]
  }
};

const CITY_GUIDE_URLS = new Set(Object.keys(CITY_TRAIN_GUIDES));

const upsertMeta = (selector: string, attribute: 'name' | 'property', key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const upsertCanonical = (href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }
  element.href = href;
};

const SEOPage: React.FC = () => {
  const { url } = useParams<{ url: string }>();
  const page = SEO_PAGES.find(p => p.url === url);

  const relatedPages = useMemo(() => {
    if (!page) return [];
    const pageWords = new Set((page.topic + ' ' + page.url)
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(word => word.length > 3));

    return SEO_PAGES
      .filter(item => item.url !== page.url)
      .map(item => {
        const words = (item.topic + ' ' + item.url).toLowerCase().split(/[^a-z0-9]+/);
        const score = words.reduce((total, word) => total + (pageWords.has(word) ? 1 : 0), 0);
        return { item, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(result => result.item);
  }, [page]);

  useEffect(() => {
    if (!page) return;

    const canonical = `${SITE_URL}/${page.url}`;
    document.title = page.seoTitle;
    upsertMeta('meta[name="description"]', 'name', 'description', page.metaDescription);
    upsertMeta('meta[name="robots"]', 'name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', page.seoTitle);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', page.metaDescription);
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonical);
    upsertMeta('meta[property="og:type"]', 'property', 'og:type', 'article');
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', page.seoTitle);
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', page.metaDescription);
    upsertCanonical(canonical);

    const schemaId = 'page-structured-data';
    document.getElementById(schemaId)?.remove();
    const schema = document.createElement('script');
    schema.id = schemaId;
    schema.type = 'application/ld+json';
    schema.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: page.topic, item: canonical }
          ]
        },
        {
          '@type': 'Service',
          name: page.topic,
          description: page.metaDescription,
          url: canonical,
          provider: {
            '@type': 'TaxiService',
            name: 'Markapur Taxi',
            url: SITE_URL,
            telephone: '+91-9491320241'
          },
          areaServed: ['Markapur', 'Srisailam']
        }
      ]
    });
    document.head.appendChild(schema);
    window.scrollTo(0, 0);

    return () => document.getElementById(schemaId)?.remove();
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
      <article className="pt-32 pb-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-yellow-700 font-semibold">Home</Link>
            <ChevronRight size={16} aria-hidden="true" />
            <span aria-current="page">{page.topic}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border border-gray-100"
          >
            <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-yellow-700 mb-8 font-bold">
              <ArrowLeft size={20} /> Back to Markapur Taxi
            </Link>

            <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">{page.topic}</h1>

            <div className="prose prose-lg prose-yellow max-w-none text-gray-700 leading-relaxed mb-12">
              <p className="text-xl font-medium text-gray-900 mb-8">{page.metaDescription}</p>
              <div className="whitespace-pre-wrap">{page.content}</div>
            </div>

            {CITY_GUIDE_URLS.has(page.url) && (
              <>
                <section aria-labelledby="train-timings" className="mb-12 bg-blue-50 p-7 rounded-3xl border border-blue-100">
                  <h2 id="train-timings" className="text-2xl font-black mb-3">Train names and scheduled timings</h2>
                  <p className="text-gray-700 mb-5"><strong>Boarding stations:</strong> {CITY_TRAIN_GUIDES[page.url].stations}</p>
                  <div className="overflow-x-auto bg-white rounded-2xl border border-blue-100">
                    <table className="w-full min-w-[720px] text-left text-sm">
                      <thead className="bg-blue-900 text-white">
                        <tr>
                          <th className="p-4">Train</th>
                          <th className="p-4">Route</th>
                          <th className="p-4">Runs</th>
                          <th className="p-4">Departure</th>
                          <th className="p-4">Arrival</th>
                        </tr>
                      </thead>
                      <tbody>
                        {CITY_TRAIN_GUIDES[page.url].trains.map((train) => (
                          <tr key={`${train.number}-${train.route}`} className="border-t border-gray-100">
                            <td className="p-4 font-bold">{train.number} – {train.name}</td>
                            <td className="p-4">{train.route}</td>
                            <td className="p-4">{train.runs}</td>
                            <td className="p-4 font-semibold">{train.departure}</td>
                            <td className="p-4 font-semibold">{train.arrival}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-sm text-gray-600 mt-5"><strong>Important:</strong> {CITY_TRAIN_GUIDES[page.url].note} Railway timetables and special services can change, so confirm the schedule before travelling.</p>
                </section>

                <section aria-labelledby="markapur-stopover" className="mb-12">
                  <h2 id="markapur-stopover" className="text-2xl font-black mb-3">Hotel and food information in Markapur</h2>
                  <p className="text-gray-600 mb-6">Use these guides to plan rest, meals and your onward station pickup.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Link to="/hotels-in-markapur" className="bg-gray-50 p-5 rounded-2xl border border-gray-100 hover:border-yellow-400 font-bold">Hotels in Markapur</Link>
                    <Link to="/home-made-food-in-markapur" className="bg-gray-50 p-5 rounded-2xl border border-gray-100 hover:border-yellow-400 font-bold">Home Made Food in Markapur</Link>
                    <Link to="/north-indian-food-in-markapur" className="bg-gray-50 p-5 rounded-2xl border border-gray-100 hover:border-yellow-400 font-bold">North Indian Food in Markapur</Link>
                  </div>
                </section>
              </>
            )}

            <section aria-labelledby="booking-help" className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-yellow-50 p-8 rounded-3xl border border-yellow-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center text-black"><Phone size={24} /></div>
                  <h2 id="booking-help" className="text-xl font-black">Check fare and availability</h2>
                </div>
                <p className="text-gray-600 mb-4">Share your date, pickup point, destination, passengers and luggage.</p>
                <a href="tel:+919491320241" className="text-2xl font-black text-black hover:text-yellow-700">9491320241</a>
              </div>

              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center"><ShieldCheck size={24} /></div>
                  <h2 className="text-xl font-black">Experienced local drivers</h2>
                </div>
                <p className="text-gray-600">Drivers familiar with Markapur, Srisailam, railway pickups, forest routes and ghat-road travel.</p>
              </div>
            </section>

            <div className="bg-black text-white p-10 rounded-[2.5rem] text-center">
              <h2 className="text-3xl font-black mb-4">Plan your journey</h2>
              <p className="text-gray-300 mb-8 max-w-xl mx-auto">Book online or call Markapur Taxi for route, vehicle and pickup assistance.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/book" className="bg-yellow-400 text-black px-8 py-4 rounded-2xl font-black text-lg hover:bg-yellow-500">Book a Taxi</Link>
                <a href="tel:+919491320241" className="border border-white/30 px-8 py-4 rounded-2xl font-black text-lg hover:bg-white/10">Call 9491320241</a>
              </div>
            </div>
          </motion.div>

          <section className="mt-16" aria-labelledby="related-pages">
            <h2 id="related-pages" className="text-2xl font-black mb-3">Related taxi services and travel guides</h2>
            <p className="text-gray-600 mb-8">Continue planning with these relevant Markapur and Srisailam pages.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPages.map((otherPage) => (
                <Link
                  key={otherPage.url}
                  to={`/${otherPage.url}`}
                  className="block h-full bg-white p-6 rounded-2xl border border-gray-100 hover:border-yellow-400 hover:shadow-lg transition-all font-bold text-gray-700"
                >
                  {otherPage.topic}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </article>
    </Layout>
  );
};

export default SEOPage;
