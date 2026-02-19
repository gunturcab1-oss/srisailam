
import { Car, Place } from './types';

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
