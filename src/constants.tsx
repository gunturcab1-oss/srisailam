
import { Car, Place, SEOPageData } from './types.ts';

export const FLEET_DATA: Car[] = [
  {
    id: 'dzire',
    name: 'Swift Dzire',
    type: 'Sedan',
    capacity: '4+1 Seater',
    image: 'https://raw.githubusercontent.com/gunturcab1-oss/srisailam/main/public/images/swift%20dzire.jpeg',
    description: 'Perfect for small families and budget-friendly travel.'
  },
  {
    id: 'innova',
    name: 'Toyota Innova',
    type: 'SUV',
    capacity: '6+1 Seater',
    image: 'https://raw.githubusercontent.com/gunturcab1-oss/srisailam/main/public/images/toyota%20innova.jpeg',
    description: 'Classic comfort for family groups with ample luggage space.'
  },
  {
    id: 'crysta',
    name: 'Innova Crysta',
    type: 'Premium SUV',
    capacity: '7+1 Seater',
    image: 'https://raw.githubusercontent.com/gunturcab1-oss/srisailam/main/public/images/crysta%20innova.jpeg',
    description: 'Luxury travel experience with premium interiors and ride quality.'
  },
  {
    id: 'xylo',
    name: 'Mahindra Xylo',
    type: 'MUV',
    capacity: '7+1 Seater',
    image: 'https://raw.githubusercontent.com/gunturcab1-oss/srisailam/main/public/images/mahindra%20xylo.jpeg',
    description: 'Spacious and robust, ideal for group travel on ghat roads.'
  },
  {
    id: 'toofan',
    name: 'Force Toofan',
    type: 'Multi-Utility Van',
    capacity: '12+1 Seater',
    image: 'https://raw.githubusercontent.com/gunturcab1-oss/srisailam/main/public/images/force%20toofan.jpeg',
    description: 'Best for large groups and pilgrimage parties.'
  }
];

export const TOURIST_PLACES: Place[] = [
  {
    id: 'mallikarjuna',
    name: 'Mallikarjuna Swamy Temple',
    description: 'One of the twelve Jyotirlingas, this ancient temple is the main attraction of Srisailam.',
    image: 'https://raw.githubusercontent.com/gunturcab1-oss/srisailam/main/public/images/srisailam%20temple.jpeg'
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
    content: "Markapur Road (MRK) is the closest railway station to Srisailam, making it the most preferred choice for pilgrims arriving from Guntur, Vijayawada, or Hyderabad by train. We provide dedicated taxi services for pilgrims arriving by train, ensuring that your transition from the railway platform to our comfortable cabs is seamless and stress-free.\n\nOur drivers wait at the station exit with a personalized name board if requested. The 90km journey through the Nallamala forest is scenic and safe with our experienced drivers who are well-versed with the ghat road sections. We offer a variety of vehicles including Swift Dzire, Toyota Innova, and Innova Crysta to suit your family's needs. Our service is available 24/7, so even if your train arrives late at night or early in the morning, you can count on us for a safe ride to the temple town."
  },
  {
    topic: "Guntur to Srisailam Taxi",
    url: "guntur-to-srisailam-taxi",
    seoTitle: "Guntur to Srisailam Taxi Service | Professional Drivers",
    metaDescription: "Hire Guntur to Srisailam taxi service with professional drivers and comfortable vehicles for a safe and hassle-free temple trip.",
    content: "Traveling from Guntur to Srisailam is a popular pilgrimage route for many devotees in the coastal Andhra region. We offer reliable taxi services from Guntur city directly to Srisailam temple. The journey typically takes about 5-6 hours depending on traffic and road conditions.\n\nWhether you're traveling with family or in a large group, our fleet of Sedans, SUVs, and Tempo Travelers are at your service. Our drivers are professional, courteous, and highly experienced in handling the long-distance drive and the challenging ghat roads of the Nallamala forest. We provide both one-way drops and round-trip packages that include local sightseeing in Srisailam, ensuring you have a complete and satisfying pilgrimage experience without any transport worries."
  },
  {
    topic: "Hyderabad to Srisailam Taxi",
    url: "hyderabad-to-srisailam-taxi",
    seoTitle: "Hyderabad to Srisailam Taxi | Easy Online Booking",
    metaDescription: "Book Hyderabad to Srisailam taxi for a smooth journey with experienced drivers, transparent pricing, and easy booking options.",
    content: "Traveling from the bustling city of Hyderabad to the serene hills of Srisailam is a journey of approximately 220 km. Our taxi service provides the most comfortable and reliable way to cover this distance, typically taking around 4.5 to 5.5 hours depending on the traffic and the time spent at the forest checkposts.\n\nWe offer a wide range of vehicles from compact sedans for small families to spacious SUVs like Innova for larger groups. Our professional chauffeurs are well-acquainted with the Hyderabad-Srisailam highway and the winding ghat roads of the Nallamala forest. We provide door-to-door pickup from any location in Hyderabad, including the airport and major railway stations, ensuring a stress-free pilgrimage for you and your loved ones."
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
    content: "Planning your spiritual journey requires knowing the latest Srisailam temple darshan timings to ensure you don't miss the sacred rituals. Generally, the temple opens at 4:30 AM with the Suprabhata Seva and closes at 10:00 PM after the Pavalimpu Seva. \n\nThere are specific slots for Sarva Darshan (free darshan) and Special Darshan. During festival days like Maha Shivaratri or during the Karthika Masam, the timings might change and the queues can be quite long. We recommend checking the official temple website for any temporary changes. Our taxi service can help you reach the temple early in the morning for the first darshan or drop you off for the evening rituals, providing a flexible schedule that matches the temple's daily routine."
  },
  {
    topic: "Visiting Places in Srisailam",
    url: "visiting-places-in-srisailam",
    seoTitle: "Top Visiting Places in Srisailam | Sightseeing Guide",
    metaDescription: "Explore the best visiting places in Srisailam including temples, viewpoints, and scenic spots for a memorable trip.",
    content: "Srisailam is not just about the main Mallikarjuna Swamy Temple; it's a treasure trove of spiritual and natural attractions. Beyond the primary shrine, you must visit the Bhramaramba Devi Temple, one of the 18 Shakti Peethas. For nature lovers, the Srisailam Dam offers a breathtaking view, especially during the monsoon when the gates are open.\n\nOther must-visit spots include Patala Ganga, where you can take a holy dip or enjoy a ropeway ride, and the Akka Mahadevi Caves, accessible by a scenic boat ride. The Srisailam Tiger Reserve provides a glimpse into the rich biodiversity of the Nallamala forest. Our local sightseeing packages are carefully designed to cover all these significant landmarks comfortably, with our drivers serving as knowledgeable guides to enrich your travel experience."
  },
  {
    topic: "Bus Timings from Markapur to Srisailam",
    url: "markapur-to-srisailam-bus-timings",
    seoTitle: "Markapur to Srisailam Bus Timings | Travel Duration",
    metaDescription: "Check Markapur to Srisailam bus timings, travel duration, and tips for a comfortable journey.",
    content: "While APSRTC operates several buses from Markapur to Srisailam, the timings can be irregular and the buses are often crowded, especially during weekends and festival seasons. The journey by bus typically takes longer due to multiple stops and the slow pace on the ghat roads.\n\nFor pilgrims arriving at Markapur Road railway station with family, elderly members, or heavy luggage, our private taxi service offers a far superior alternative. Unlike the fixed bus schedule, our taxis are available 24/7 for immediate pickup. You can enjoy the comfort of an air-conditioned vehicle, the flexibility to stop for breaks, and a faster, more direct journey to the temple town, all at very competitive and transparent rates."
  },
  {
    topic: "How to Reach Srisailam from Markapur",
    url: "how-to-reach-srisailam-from-markapur",
    seoTitle: "How to Reach Srisailam from Markapur | Travel Tips",
    metaDescription: "Learn the best ways to reach Srisailam from Markapur by taxi, bus, or private vehicle with travel tips.",
    content: "Markapur Road (MRK) is widely recognized as the most convenient railway station for reaching Srisailam, as it is only about 90 km away. The most efficient way to complete this final leg of your journey is by hiring a private taxi directly from the station exit. The route takes you through the town of Dornala and then into the dense, beautiful Nallamala forest.\n\nTravelers should be aware that the forest checkposts at Dornala and Srisailam are closed from 9:00 PM to 6:00 AM for private vehicles, though our experienced drivers can often help you plan your arrival to minimize wait times. Whether you're coming from Guntur, Vijayawada, or Hubli, Markapur is your best gateway, and our reliable taxi service is your best partner for a safe and smooth arrival at the holy abode of Lord Shiva."
  },
  {
    topic: "Home Made Food in Markapur",
    url: "home-made-food-in-markapur",
    seoTitle: "Home Made Food in Markapur | Fresh & Hygienic",
    metaDescription: "Find home made food options in Markapur offering fresh, hygienic, and tasty meals for travelers and pilgrims.",
    content: "When you're on a long pilgrimage, there's nothing more comforting than a fresh, hygienic, and simple home-cooked meal. Markapur has several local families and small-scale kitchens that specialize in providing traditional Andhra meals to travelers and pilgrims. These meals are prepared with high-quality ingredients and the same care you'd find in your own home.\n\nOur taxi service can recommend and even drop you off at these local spots where you can enjoy a wholesome 'Bhojanam' that is easy on the stomach and rich in flavor. Whether you're looking for a quick lunch during your transit or a packed meal for your journey into the Nallamala forest, we can help you find the best home-made food options in Markapur to keep you energized for your spiritual journey."
  },
  {
    topic: "North Indian Food in Markapur",
    url: "north-indian-food-in-markapur",
    seoTitle: "North Indian Food in Markapur | Best Restaurants",
    metaDescription: "Discover the best North Indian food in Markapur including popular restaurants and tasty meal options for visitors.",
    content: "Markapur is a major transit point for pilgrims from all over India, including many from the northern states. To cater to their diverse palates, several restaurants in Markapur have specialized in serving authentic North Indian cuisine. From soft Rotis and Phulkas to rich Paneer curries and Dal Tadka, you can find a variety of dishes that will make you feel right at home.\n\nWe understand that after a long train journey, you might crave the familiar flavors of North Indian food. Our drivers are well-acquainted with the best restaurants in town that maintain high standards of hygiene and taste. We can recommend the top-rated spots where you can enjoy a satisfying North Indian meal before you embark on your 3-hour drive to Srisailam, ensuring you have a comfortable and pleasant start to your pilgrimage."
  }
];
