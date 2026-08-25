import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

type Direction = 'markapur-srisailam' | 'srisailam-markapur';
type TripType = 'one-way' | 'round-trip';

type Vehicle = {
  id: string;
  name: string;
  capacity: string;
};

const VEHICLES: Vehicle[] = [
  { id: 'dzire', name: 'Swift Dzire', capacity: '4+1 Seater' },
  { id: 'innova', name: 'Toyota Innova', capacity: '6+1 Seater' },
  { id: 'xylo', name: 'Mahindra Xylo', capacity: '7+1 Seater' },
  { id: 'crysta', name: 'Innova Crysta', capacity: '7+1 Seater' },
  { id: 'toofan', name: 'Force Toofan', capacity: '12+1 Seater' },
];

const MARKAPUR_POINTS = [
  'Markapur Road Railway Station',
  'Markapur Bus Stand',
  'Markapur Hotel',
  'Other Markapur Location',
];

const SRISAILAM_POINTS = [
  'Srisailam Temple',
  'Srisailam Bus Stand',
  'Srisailam Hotel',
  'Other Srisailam Location',
];

const getLocalDate = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getEarliestBookingDate = (now: Date) => {
  const earliest = new Date(now);
  if (now.getHours() >= 18) {
    earliest.setDate(earliest.getDate() + 1);
  }
  return earliest;
};

const roundUpToNext15Minutes = (date: Date) => {
  const rounded = new Date(date);
  rounded.setSeconds(0, 0);
  const remainder = rounded.getMinutes() % 15;
  if (remainder !== 0) {
    rounded.setMinutes(rounded.getMinutes() + (15 - remainder));
  }
  return `${`${rounded.getHours()}`.padStart(2, '0')}:${`${rounded.getMinutes()}`.padStart(2, '0')}`;
};

const getMinimumPickupTime = (travelDate: string, now: Date) => {
  if (travelDate !== getLocalDate(now)) return '04:00';
  if (now.getHours() < 4) return '04:00';
  return roundUpToNext15Minutes(now);
};

const getDefaultPickupTime = (travelDate: string, now: Date) => {
  if (travelDate !== getLocalDate(now)) return '04:30';
  if (now.getHours() < 4) return '04:30';
  const minimum = getMinimumPickupTime(travelDate, now);
  return minimum <= '18:00' ? minimum : '04:30';
};

const Booking: React.FC = () => {
  const pageOpenedAt = useMemo(() => new Date(), []);
  const earliestBookingDate = useMemo(() => getEarliestBookingDate(pageOpenedAt), [pageOpenedAt]);
  const maxBookingDate = useMemo(() => {
    const max = new Date(pageOpenedAt);
    max.setDate(max.getDate() + 30);
    return max;
  }, [pageOpenedAt]);

  const initialTravelDate = getLocalDate(earliestBookingDate);

  const [direction, setDirection] = useState<Direction>('markapur-srisailam');
  const [tripType, setTripType] = useState<TripType>('one-way');
  const [pickupPoint, setPickupPoint] = useState(MARKAPUR_POINTS[0]);
  const [dropPoint, setDropPoint] = useState(SRISAILAM_POINTS[0]);
  const [travelDate, setTravelDate] = useState(initialTravelDate);
  const [pickupTime, setPickupTime] = useState(getDefaultPickupTime(initialTravelDate, pageOpenedAt));
  const [vehicleId, setVehicleId] = useState('dzire');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comingFrom, setComingFrom] = useState('');
  const [pincode, setPincode] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const selectedVehicle = VEHICLES.find((vehicle) => vehicle.id === vehicleId) || VEHICLES[0];

  const directionLabel = direction === 'markapur-srisailam'
    ? 'Markapur → Srisailam'
    : 'Srisailam → Markapur';

  const tripLabel = tripType === 'one-way' ? 'One Way' : 'Round Trip';

  const switchDirection = (nextDirection: Direction) => {
    setDirection(nextDirection);
    if (nextDirection === 'markapur-srisailam') {
      setPickupPoint(MARKAPUR_POINTS[0]);
      setDropPoint(SRISAILAM_POINTS[0]);
    } else {
      setPickupPoint(SRISAILAM_POINTS[0]);
      setDropPoint(MARKAPUR_POINTS[0]);
    }
  };

  const handleTravelDateChange = (nextDate: string) => {
    setTravelDate(nextDate);
    const now = new Date();
    const minimumTime = getMinimumPickupTime(nextDate, now);
    if (nextDate === getLocalDate(now) && pickupTime < minimumTime) {
      setPickupTime(getDefaultPickupTime(nextDate, now));
    }
  };

  const validate = () => {
    const digits = phone.replace(/\D/g, '');
    const now = new Date();
    const minimumDate = getLocalDate(getEarliestBookingDate(now));
    const maximumDate = getLocalDate(maxBookingDate);

    if (!name.trim()) return 'Please enter passenger name.';
    if (digits.length !== 10) return 'Please enter a valid 10-digit mobile number.';
    if (!comingFrom.trim()) return 'Please enter where you are coming from.';
    if (!/^\d{6}$/.test(pincode)) return 'Please enter a valid 6-digit pincode.';
    if (!travelDate) return 'Please select a travel date.';
    if (travelDate < minimumDate) return 'Past dates are not available for booking. Please select an available future date.';
    if (travelDate > maximumDate) return 'Advance booking is available only up to 30 days.';
    if (pickupTime < '04:00' || pickupTime > '18:00') return 'Pickup time must be between 4:00 AM and 6:00 PM.';

    if (travelDate === getLocalDate(now)) {
      const minimumTime = getMinimumPickupTime(travelDate, now);
      if (pickupTime < minimumTime) return 'Please select a future pickup time.';
    }

    return '';
  };

  const handleWhatsAppBooking = () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    const message = [
      'Hello Markapur Taxi, I want to book a cab.',
      '',
      `Route: ${directionLabel}`,
      `Trip: ${tripLabel}`,
      `Pickup: ${pickupPoint}`,
      `Drop: ${dropPoint}`,
      `Date: ${travelDate}`,
      `Pickup Time: ${pickupTime}`,
      `Vehicle: ${selectedVehicle.name} (${selectedVehicle.capacity})`,
      '',
      `Passenger Name: ${name.trim()}`,
      `Mobile: ${phone.replace(/\D/g, '')}`,
      `Coming From: ${comingFrom.trim()}`,
      `Pincode: ${pincode}`,
      notes.trim() ? `Notes: ${notes.trim()}` : '',
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/919491320241?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const pickupOptions = direction === 'markapur-srisailam' ? MARKAPUR_POINTS : SRISAILAM_POINTS;
  const dropOptions = direction === 'markapur-srisailam' ? SRISAILAM_POINTS : MARKAPUR_POINTS;
  const minimumPickupTime = getMinimumPickupTime(travelDate, new Date());

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <div className="bg-gray-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-yellow-400 text-xs font-black uppercase tracking-[0.2em]">Markapur Taxi</p>
            <h1 className="text-2xl md:text-3xl font-black">Book Markapur ↔ Srisailam Cab</h1>
          </div>
          <Link to="/" className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 font-bold transition-colors">
            Back Home
          </Link>
        </div>
      </div>

      <section className="max-w-6xl mx-auto px-4 py-10 md:py-16">
        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-5 md:p-8 space-y-8">
            <div>
              <h2 className="text-2xl font-black mb-4">1. Plan Your Trip</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => switchDirection('markapur-srisailam')}
                  className={`p-4 rounded-2xl border-2 text-left font-bold transition-all ${direction === 'markapur-srisailam' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'}`}
                >
                  Markapur → Srisailam
                </button>
                <button
                  type="button"
                  onClick={() => switchDirection('srisailam-markapur')}
                  className={`p-4 rounded-2xl border-2 text-left font-bold transition-all ${direction === 'srisailam-markapur' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'}`}
                >
                  Srisailam → Markapur
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mt-4">
                {([
                  ['one-way', 'One Way'],
                  ['round-trip', 'Round Trip'],
                ] as const).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setTripType(value)}
                    className={`p-4 rounded-2xl border-2 font-bold transition-all ${tripType === value ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <label className="block">
                <span className="block text-sm font-bold mb-2">Pickup location</span>
                <select value={pickupPoint} onChange={(e) => setPickupPoint(e.target.value)} className="w-full p-4 rounded-2xl border border-gray-300 bg-white">
                  {pickupOptions.map((point) => <option key={point}>{point}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="block text-sm font-bold mb-2">Drop location</span>
                <select value={dropPoint} onChange={(e) => setDropPoint(e.target.value)} className="w-full p-4 rounded-2xl border border-gray-300 bg-white">
                  {dropOptions.map((point) => <option key={point}>{point}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="block text-sm font-bold mb-2">Travel date</span>
                <input
                  type="date"
                  min={getLocalDate(earliestBookingDate)}
                  max={getLocalDate(maxBookingDate)}
                  value={travelDate}
                  onChange={(e) => handleTravelDateChange(e.target.value)}
                  className="w-full p-4 rounded-2xl border border-gray-300"
                />
                <span className="block text-xs text-gray-500 mt-1">Past dates are blocked. Advance booking is available up to 30 days.</span>
              </label>
              <label className="block">
                <span className="block text-sm font-bold mb-2">Pickup time</span>
                <input
                  type="time"
                  min={minimumPickupTime}
                  max="18:00"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full p-4 rounded-2xl border border-gray-300"
                />
                <span className="block text-xs text-gray-500 mt-1">Available pickup window: 4:00 AM to 6:00 PM. Past times are blocked for same-day bookings.</span>
              </label>
            </div>

            <div>
              <h2 className="text-2xl font-black mb-4">2. Choose Vehicle</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {VEHICLES.map((vehicle) => (
                  <button
                    key={vehicle.id}
                    type="button"
                    onClick={() => setVehicleId(vehicle.id)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${vehicleId === vehicle.id ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'}`}
                  >
                    <div className="font-black text-lg">{vehicle.name}</div>
                    <div className="text-sm text-gray-500">{vehicle.capacity}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black mb-4">3. Passenger Details</h2>
              <div className="grid md:grid-cols-2 gap-5">
                <label className="block">
                  <span className="block text-sm font-bold mb-2">Passenger name *</span>
                  <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-4 rounded-2xl border border-gray-300" placeholder="Your name" />
                </label>
                <label className="block">
                  <span className="block text-sm font-bold mb-2">Mobile number *</span>
                  <input inputMode="numeric" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))} className="w-full p-4 rounded-2xl border border-gray-300" placeholder="10-digit mobile number" />
                </label>
                <label className="block">
                  <span className="block text-sm font-bold mb-2">Place coming from *</span>
                  <input value={comingFrom} onChange={(e) => setComingFrom(e.target.value)} className="w-full p-4 rounded-2xl border border-gray-300" placeholder="Example: Guntur" />
                </label>
                <label className="block">
                  <span className="block text-sm font-bold mb-2">Pincode *</span>
                  <input inputMode="numeric" value={pincode} onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))} className="w-full p-4 rounded-2xl border border-gray-300" placeholder="6-digit pincode" />
                </label>
                <label className="block md:col-span-2">
                  <span className="block text-sm font-bold mb-2">Notes</span>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="w-full p-4 rounded-2xl border border-gray-300" placeholder="Train number, hotel name, luggage, children, or other information" />
                </label>
              </div>
            </div>

            {error && <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 font-bold">{error}</div>}

            <button
              type="button"
              onClick={handleWhatsAppBooking}
              className="w-full py-5 rounded-2xl bg-green-600 hover:bg-green-700 text-white text-lg font-black transition-colors shadow-lg"
            >
              Continue Booking on WhatsApp
            </button>
            <p className="text-xs text-gray-500 text-center">Your booking is confirmed only after the taxi team verifies vehicle availability.</p>
          </div>

          <aside className="bg-gray-950 text-white rounded-3xl p-6 md:p-7 shadow-xl lg:sticky lg:top-6">
            <p className="text-yellow-400 text-xs font-black uppercase tracking-[0.2em] mb-3">Booking Summary</p>
            <h2 className="text-2xl font-black mb-6">{directionLabel}</h2>
            <div className="space-y-4 text-sm">
              <div><span className="text-gray-400 block">Trip</span><strong>{tripLabel}</strong></div>
              <div><span className="text-gray-400 block">Pickup</span><strong>{pickupPoint}</strong></div>
              <div><span className="text-gray-400 block">Drop</span><strong>{dropPoint}</strong></div>
              <div><span className="text-gray-400 block">Date & time</span><strong>{travelDate} · {pickupTime}</strong></div>
              <div><span className="text-gray-400 block">Vehicle</span><strong>{selectedVehicle.name}</strong></div>
            </div>
            <div className="border-t border-white/10 mt-6 pt-6">
              <p className="text-sm text-gray-300">Our taxi team will verify vehicle availability and confirm your booking details directly with you.</p>
            </div>
            <a href="tel:+919491320241" className="block text-center mt-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 font-bold transition-colors">
              Call 9491320241
            </a>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default Booking;
