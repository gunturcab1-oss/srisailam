
import { Car, Place } from './types';

export const FLEET_DATA: Car[] = [
  {
    id: 'dzire',
    name: 'Swift Dzire',
    type: 'Sedan',
    capacity: '4+1 Seater',
    image: '/image.png',
    description: 'Perfect for small families and budget-friendly travel.'
  },
  {
    id: 'innova',
    name: 'Toyota Innova',
    type: 'SUV',
    capacity: '6+1 Seater',
    image: '/Toyota-Innova-Crysta-GX-Variant-Front-Three-Quarters.jpeg',
    description: 'Classic comfort for family groups with ample luggage space.'
  },
  {
    id: 'crysta',
    name: 'Innova Crysta',
    type: 'Premium SUV',
    capacity: '7+1 Seater',
    image: '/inova images.jpg',
    description: 'Luxury travel experience with premium interiors and ride quality.'
  },
  {
    id: 'xylo',
    name: 'Mahindra Xylo',
    type: 'MUV',
    capacity: '7+1 Seater',
    image: '/DSC05193.JPG',
    description: 'Spacious and robust, ideal for group travel on ghat roads.'
  },
  {
    id: 'toofan',
    name: 'Force Toofan',
    type: 'Multi-Utility Van',
    capacity: '12+1 Seater',
    image: '/6660d8670e4025c6bac778f78848fa2d.jpg',
    description: 'Best for large groups and pilgrimage parties.'
  }
];

export const TOURIST_PLACES: Place[] = [
  {
    id: 'mallikarjuna',
    name: 'Mallikarjuna Swamy Temple',
    description: 'One of the twelve Jyotirlingas, this ancient temple is the main attraction of Srisailam.',
    image: '/srisaila-mallikarjuna-swamy-temple-mallikarjun-jyotirlinga-srisailam-tourism-entry-fee-timings-holidays-reviews-header.jpg'
  },
  {
    id: 'bhramaramba',
    name: 'Bhramaramba Devi Temple',
    description: 'One of the eighteen Shakti Peethas, located within the main temple complex.',
    image: '/temple_rEEq67u4_202408201723250.jpg'
  },
  {
    id: 'dam',
    name: 'Srisailam Dam',
    description: 'A massive dam built across the Krishna River, offering breathtaking views.',
    image: '/download.jpg'
  },
  {
    id: 'patala-ganga',
    name: 'Patala Ganga',
    description: 'A holy bathing place where pilgrims take a dip in the Krishna River.',
    image: '/download (1).jpg'
  }
];

export const PREDEFINED_ANSWERS = [
  {
    keywords: ["distance", "km", "how far"],
    answer: "The distance from Markapur Road Railway Station (MRK) to Srisailam is approximately 90 km.\nThe journey usually takes about 2.5 to 3 hours depending on traffic and road conditions.\nThe route passes through the beautiful Nallamala Forest via Dornala.\nPlease call this number for more information: 91-9491320241"
  },
  {
    keywords: ["fare", "price", "cost", "charge", "rate", "amount"],
    answer: "Our taxi fares are very competitive and depend on the vehicle type (Sedan, SUV, etc.).\nWe offer fixed rates for Markapur to Srisailam drops and round trips.\nSpecial discounts are available for early bookings and regular pilgrims.\nPlease call this number for more information: 91-9491320241"
  },
  {
    keywords: ["route", "map", "way", "how to reach", "directions"],
    answer: "The best route is Markapur -> Dornala -> Srisailam.\nIt is a well-maintained road that takes you through the scenic Nallamala forest checkpost.\nOur drivers are highly experienced with this ghat road section.\nPlease call this number for more information: 91-9491320241"
  },
  {
    keywords: ["darshan", "tickets", "seva", "temple timings", "pooja", "darshanam"],
    answer: "For darshan and accommodation related queries, please visit the official Srisailam Devasthanam website.\nWe provide timely drops to ensure you reach for your scheduled darshan slots.\nTemple usually opens early morning for Abhishekams.\nPlease call this number for more information: 91-9491320241"
  },
  {
    keywords: ["accommodation", "rooms", "cottages", "stay", "hotel", "lodge"],
    answer: "For darshan and accommodation related queries, please visit the official Srisailam Devasthanam website.\nThere are various choultries and private hotels available in Srisailam.\nWe can drop you directly at your pre-booked accommodation.\nPlease call this number for more information: 91-9491320241"
  },
  {
    keywords: ["station", "railway", "mrk", "markapur road"],
    answer: "Markapur Road (MRK) is the nearest railway station to Srisailam (90km).\nWe provide 24/7 pickup services directly from the station platforms.\nOur drivers will be waiting for you even if your train is delayed.\nPlease call this number for more information: 91-9491320241"
  },
  {
    keywords: ["time", "duration", "hours", "long"],
    answer: "The travel time from Markapur to Srisailam is approximately 3 hours.\nThe forest checkpost at Dornala has specific timings (usually 6 AM to 9 PM).\nPlease plan your journey according to your train arrival at Markapur.\nPlease call this number for more information: 91-9491320241"
  }
];
