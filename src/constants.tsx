
import { Car, Place, SEOPageData } from './types';

export const FLEET_DATA: Car[] = [
  {
    id: 'dzire',
    name: 'Swift Dzire',
    type: 'Sedan',
    capacity: '4+1 Seater',
    image: 'https://raw.githubusercontent.com/gunturcab1-oss/srisailam/main/public/images/image.png',
    description: 'Perfect for small families and budget-friendly travel.'
  },
  {
    id: 'innova',
    name: 'Toyota Innova',
    type: 'SUV',
    capacity: '6+1 Seater',
    image: 'https://raw.githubusercontent.com/gunturcab1-oss/srisailam/main/public/images/Toyota-Innova-Crysta-GX-Variant-Front-Three-Quarters.jpeg',
    description: 'Classic comfort for family groups with ample luggage space.'
  },
  {
    id: 'crysta',
    name: 'Innova Crysta',
    type: 'Premium SUV',
    capacity: '7+1 Seater',
    image: 'https://raw.githubusercontent.com/gunturcab1-oss/srisailam/main/public/images/inova%20images.jpg',
    description: 'Luxury travel experience with premium interiors and ride quality.'
  },
  {
    id: 'xylo',
    name: 'Mahindra Xylo',
    type: 'MUV',
    capacity: '7+1 Seater',
    image: 'https://raw.githubusercontent.com/gunturcab1-oss/srisailam/main/public/images/DSC05193.JPG',
    description: 'Spacious and robust, ideal for group travel on ghat roads.'
  },
  {
    id: 'toofan',
    name: 'Force Toofan',
    type: 'Multi-Utility Van',
    capacity: '12+1 Seater',
    image: 'https://raw.githubusercontent.com/gunturcab1-oss/srisailam/main/public/images/6660d8670e4025c6bac778f78848fa2d.jpg',
    description: 'Best for large groups and pilgrimage parties.'
  }
];

export const TOURIST_PLACES: Place[] = [
  {
    id: 'mallikarjuna',
    name: 'Mallikarjuna Swamy Temple',
    description: 'One of the twelve Jyotirlingas, this ancient temple is the main attraction of Srisailam.',
    image: 'https://raw.githubusercontent.com/gunturcab1-oss/srisailam/main/public/images/srisaila-mallikarjuna-swamy-temple-mallikarjun-jyotirlinga-srisailam-tourism-entry-fee-timings-holidays-reviews-header.jpg'
  },
  {
    id: 'bhramaramba',
    name: 'Bhramaramba Devi Temple',
    description: 'One of the eighteen Shakti Peethas, located within the main temple complex.',
    image: 'https://raw.githubusercontent.com/gunturcab1-oss/srisailam/main/public/images/temple_rEEq67u4_202408201723250.jpg'
  },
  {
    id: 'dam',
    name: 'Srisailam Dam',
    description: 'A massive dam built across the Krishna River, offering breathtaking views.',
    image: 'https://raw.githubusercontent.com/gunturcab1-oss/srisailam/main/public/images/download.jpg'
  },
  {
    id: 'patala-ganga',
    name: 'Patala Ganga',
    description: 'A holy bathing place where pilgrims take a dip in the Krishna River.',
    image: 'https://raw.githubusercontent.com/gunturcab1-oss/srisailam/main/public/images/download%20(1).jpg'
  }
];

export const PREDEFINED_ANSWERS = [
  {
    keywords: ["location", "where is", "situated", "located"],
    answer: "Srisailam is a pilgrimage town in Andhra Pradesh. It lies in the Nallamala Hills and is situated on the banks of the Krishna River. It is one of the most sacred places in India."
  },
  {
    keywords: ["hyderabad", "from hyderabad"],
    answer: "Srisailam is about 220 km from Hyderabad. You can travel by bus, taxi, or car. The journey usually takes around 5–6 hours."
  },
  {
    keywords: ["distance", "km", "how far", "markapur to srisailam"],
    answer: "The distance from Markapur Road (MRK) to Srisailam is about 75–80 km. Travel time is around 2 hours, and the route passes through scenic forest hills."
  },
  {
    keywords: ["fare", "price", "cost", "charge", "rate", "amount"],
    answer: "Our taxi fares are very competitive and depend on the vehicle type (Sedan, SUV, etc.). We offer fixed rates for Markapur to Srisailam drops and round trips. Please call us at 91-9491320241 for an instant quote."
  },
  {
    keywords: ["route", "map", "way", "how to reach", "directions"],
    answer: "The best route from Markapur is via Dornala. It takes you through the beautiful Nallamala forest. Our drivers are highly experienced with this ghat road section."
  },
  {
    keywords: ["darshan", "tickets", "seva", "temple timings", "pooja", "darshanam", "how long"],
    answer: "Darshan usually takes 1–3 hours. Special darshan reduces waiting time, though festival days may take longer. For official bookings, please visit the temple website."
  },
  {
    keywords: ["accommodation", "rooms", "cottages", "stay", "hotel", "lodge", "book rooms"],
    answer: "Rooms can be booked via the official temple website or at accommodation counters. Temple guest houses, Devasthanam rooms, and private hotels are available. Advance booking is highly recommended for weekends and festivals."
  },
  {
    keywords: ["station", "railway", "mrk", "markapur road", "nearest station"],
    answer: "The nearest railway station is Markapur Road (MRK), about 85 km from Srisailam. We provide 24/7 pickup services directly from the station platforms. Taxis and buses are readily available."
  },
  {
    keywords: ["ghat road", "safe", "night travel", "driving"],
    answer: "The Srisailam ghat road is safe but has sharp curves. It's important to drive slowly and carefully. We recommend avoiding night travel if possible for better safety."
  },
  {
    keywords: ["best time", "visit", "weather", "season", "months"],
    answer: "October to March offers the most pleasant weather. The monsoon season provides lush green scenery, and Maha Shivaratri is the most spiritually significant time to visit."
  },
  {
    keywords: ["famous", "attractions", "sightseeing", "places to see"],
    answer: "Srisailam is famous for the Mallikarjuna Jyotirlinga temple. Other major attractions include the Srisailam Dam, the Tiger Reserve, and the surrounding forests."
  }
];

export const SEO_PAGES: SEOPageData[] = [
  {
    topic: "Markapur Railway Station to Srisailam Taxi",
    url: "markapur-railway-station-to-srisailam-taxi",
    seoTitle: "Markapur Railway Station to Srisailam Taxi | 24/7 Pickup Service",
    metaDescription: "Book a taxi from Markapur Railway Station to Srisailam with safe drivers, affordable fares, and 24/7 pickup service for a comfortable temple journey.",
    content: "Markapur Road (MRK) is the closest railway station to Srisailam. We provide dedicated taxi services for pilgrims arriving by train. Our drivers wait at the station exit to ensure a seamless transition from your train to our comfortable cabs. The 90km journey through the Nallamala forest is scenic and safe with our experienced drivers."
  },
  {
    topic: "Guntur to Srisailam Taxi",
    url: "guntur-to-srisailam-taxi",
    seoTitle: "Guntur to Srisailam Taxi Service | Professional Drivers",
    metaDescription: "Hire Guntur to Srisailam taxi service with professional drivers and comfortable vehicles for a safe and hassle-free temple trip.",
    content: "Traveling from Guntur to Srisailam is a popular pilgrimage route. We offer reliable taxi services from Guntur city to Srisailam temple. Whether you're traveling with family or in a large group, our fleet of Sedans, SUVs, and Tempo Travelers are at your service."
  },
  {
    topic: "Hyderabad to Srisailam Taxi",
    url: "hyderabad-to-srisailam-taxi",
    seoTitle: "Hyderabad to Srisailam Taxi | Easy Online Booking",
    metaDescription: "Book Hyderabad to Srisailam taxi for a smooth journey with experienced drivers, transparent pricing, and easy booking options.",
    content: "Hyderabad to Srisailam is approximately 220 km. Our taxi service provides the most comfortable way to cover this distance. Enjoy a stress-free journey through the hills and forests with our professional chauffeurs who know the route perfectly."
  },
  {
    topic: "Markapur to Temples Taxi",
    url: "markapur-to-temples-taxi",
    seoTitle: "Markapur to Temples Taxi Service | Affordable Fares",
    metaDescription: "Travel from Markapur to Srisailam and nearby temples with reliable taxi service, comfortable vehicles, and affordable fares.",
    content: "Explore the sacred temples around Markapur and Srisailam. We offer customized temple tour packages that include Mallikarjuna Swamy Temple, Bhramaramba Devi Temple, and other local shrines. Our drivers act as local guides to help you navigate the pilgrimage sites."
  },
  {
    topic: "Markapur to Tirupati Taxi",
    url: "markapur-to-tirupati-taxi",
    seoTitle: "Markapur to Tirupati Taxi Service | Safe Pilgrimage",
    metaDescription: "Book Markapur to Tirupati taxi with experienced drivers and comfortable cars for a safe and convenient pilgrimage journey.",
    content: "Connect two major pilgrimage centers with our Markapur to Tirupati taxi service. We ensure a safe and comfortable long-distance journey, allowing you to focus on your spiritual visit while we handle the road."
  },
  {
    topic: "Tirupati to Srisailam Taxi",
    url: "tirupati-to-srisailam-taxi",
    seoTitle: "Tirupati to Srisailam Taxi | Comfortable Long Distance",
    metaDescription: "Hire Tirupati to Srisailam taxi service for a smooth long-distance journey with professional drivers and affordable pricing.",
    content: "Travel from the feet of Lord Venkateswara to the abode of Lord Mallikarjuna. Our Tirupati to Srisailam cab service is designed for devotees looking for a reliable and comfortable way to visit both sacred sites in one trip."
  },
  {
    topic: "Srisailam to Markapur Railway Station Taxi",
    url: "srisailam-to-markapur-railway-station-taxi",
    seoTitle: "Srisailam to Markapur Railway Station Taxi | Timely Drop",
    metaDescription: "Book Srisailam to Markapur Railway Station taxi for timely drop, safe travel, and reliable cab service.",
    content: "Ensure you never miss your train with our Srisailam to Markapur Road station drop service. We monitor train timings and schedule your departure from Srisailam to account for forest checkpost timings and road conditions."
  },
  {
    topic: "Srisailam to Hyderabad Airport Taxi",
    url: "srisailam-to-hyderabad-airport-taxi",
    seoTitle: "Srisailam to Hyderabad Airport Taxi | Punctual Transfer",
    metaDescription: "Hire Srisailam to Hyderabad Airport taxi for reliable airport transfer with punctual service and comfortable vehicles.",
    content: "Need a reliable ride to Rajiv Gandhi International Airport (HYD)? Our Srisailam to Hyderabad Airport taxi service guarantees punctuality and comfort for your flight. We understand the importance of timing for airport transfers."
  },
  {
    topic: "Srisailam to Hyderabad Railway Station Taxi",
    url: "srisailam-to-hyderabad-railway-station-taxi",
    seoTitle: "Srisailam to Hyderabad Railway Station Taxi | Reliable Cabs",
    metaDescription: "Book Srisailam to Hyderabad Railway Station taxi for a comfortable journey with professional drivers and transparent pricing.",
    content: "We provide comfortable taxi services from Srisailam to Secunderabad, Kacheguda, or Nampally railway stations. Our transparent pricing and professional service make us the preferred choice for long-distance railway station transfers."
  },
  {
    topic: "Srisailam Temple Darshan Timings",
    url: "srisailam-temple-darshan-timings",
    seoTitle: "Srisailam Temple Darshan Timings | Plan Your Visit",
    metaDescription: "Check Srisailam temple darshan timings, sevas, and best visiting hours to plan your pilgrimage smoothly.",
    content: "Plan your spiritual journey with the latest Srisailam temple darshan timings. Generally, the temple opens at 4:30 AM and closes at 10:00 PM, with specific slots for Sarva Darshan and Special Sevas. We help you reach the temple on time for your preferred slot."
  },
  {
    topic: "Visiting Places in Srisailam",
    url: "visiting-places-in-srisailam",
    seoTitle: "Top Visiting Places in Srisailam | Sightseeing Guide",
    metaDescription: "Explore the best visiting places in Srisailam including temples, viewpoints, and scenic spots for a memorable trip.",
    content: "Beyond the main temple, Srisailam offers numerous attractions like the Srisailam Dam, Patala Ganga, Akka Mahadevi Caves, and the Srisailam Tiger Reserve. Our local sightseeing packages cover all these must-visit spots with ease."
  },
  {
    topic: "Bus Timings from Markapur to Srisailam",
    url: "markapur-to-srisailam-bus-timings",
    seoTitle: "Markapur to Srisailam Bus Timings | Travel Duration",
    metaDescription: "Check Markapur to Srisailam bus timings, travel duration, and tips for a comfortable journey.",
    content: "While buses are available from Markapur to Srisailam, they can be crowded and infrequent. For a more comfortable and flexible journey, especially with family or luggage, our private taxi service is the best alternative to the public bus schedule."
  },
  {
    topic: "How to Reach Srisailam from Markapur",
    url: "how-to-reach-srisailam-from-markapur",
    seoTitle: "How to Reach Srisailam from Markapur | Travel Tips",
    metaDescription: "Learn the best ways to reach Srisailam from Markapur by taxi, bus, or private vehicle with travel tips.",
    content: "Markapur is the most convenient railhead for Srisailam. The best way to reach is by taking a taxi from Markapur Road station. The route via Dornala is the standard path. We provide detailed travel tips and reliable transport for this specific route."
  },
  {
    topic: "Home Made Food in Markapur",
    url: "home-made-food-in-markapur",
    seoTitle: "Home Made Food in Markapur | Fresh & Hygienic",
    metaDescription: "Find home made food options in Markapur offering fresh, hygienic, and tasty meals for travelers and pilgrims.",
    content: "Looking for a home-cooked meal during your transit in Markapur? We can guide you to local spots that offer hygienic, traditional home-made food, perfect for pilgrims who prefer simple and healthy meals over restaurant fare."
  },
  {
    topic: "North Indian Food in Markapur",
    url: "north-indian-food-in-markapur",
    seoTitle: "North Indian Food in Markapur | Best Restaurants",
    metaDescription: "Discover the best North Indian food in Markapur including popular restaurants and tasty meal options for visitors.",
    content: "For travelers from North India visiting Srisailam, Markapur has several restaurants that serve authentic North Indian cuisine. From Rotis to North Indian curries, we can recommend the best places to satisfy your palate before heading to the temple."
  }
];
