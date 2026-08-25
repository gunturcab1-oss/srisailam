import React, { useEffect, useState } from 'react';
import Booking from '@/pages/Booking.tsx';
import { createBooking, getBookings, PreviewBooking } from '@/services/bookingPreviewStore.ts';

const getValue = (lines: string[], label: string) => {
  const line = lines.find((item) => item.startsWith(`${label}:`));
  return line ? line.slice(label.length + 1).trim() : '';
};

const parseVehicle = (value: string) => {
  const match = value.match(/^(.*) \((.*)\)$/);
  if (!match) return { name: value, capacity: '' };
  return { name: match[1], capacity: match[2] };
};

const getVehicleId = (name: string) => {
  const map: Record<string, string> = {
    'Swift Dzire': 'dzire',
    'Toyota Innova': 'innova',
    'Mahindra Xylo': 'xylo',
    'Innova Crysta': 'crysta',
    'Force Toofan': 'toofan',
  };
  return map[name] || name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
};

const BookingAssignmentPreview: React.FC = () => {
  const [savedBooking, setSavedBooking] = useState<PreviewBooking | null>(null);

  useEffect(() => {
    const originalOpen = window.open.bind(window);

    window.open = ((url?: string | URL, target?: string, features?: string) => {
      const urlString = typeof url === 'string' ? url : url?.toString() || '';

      if (urlString.includes('wa.me/919491320241') && urlString.includes('text=')) {
        try {
          const parsedUrl = new URL(urlString);
          const message = parsedUrl.searchParams.get('text') || '';
          const lines = message.split('\n').map((line) => line.trim()).filter(Boolean);
          const route = getValue(lines, 'Route');
          const trip = getValue(lines, 'Trip');
          const vehicle = parseVehicle(getValue(lines, 'Vehicle'));
          const mobile = getValue(lines, 'Mobile');
          const travelDate = getValue(lines, 'Pickup Date');
          const pickupTime = getValue(lines, 'Pickup Time');
          const pickupPoint = getValue(lines, 'Pickup');
          const dropPoint = getValue(lines, 'Drop');

          const recentDuplicate = getBookings().find((booking) => {
            const ageMs = Date.now() - new Date(booking.createdAt).getTime();
            return ageMs < 5 * 60 * 1000
              && booking.mobile === mobile
              && booking.travelDate === travelDate
              && booking.pickupTime === pickupTime
              && booking.pickupPoint === pickupPoint
              && booking.dropPoint === dropPoint
              && booking.vehicleName === vehicle.name;
          });

          const booking = recentDuplicate || createBooking({
            direction: route === 'Srisailam → Markapur' ? 'srisailam-markapur' : 'markapur-srisailam',
            directionLabel: route,
            tripType: trip === 'Round Trip' ? 'round-trip' : 'one-way',
            tripLabel: trip,
            pickupPoint,
            dropPoint,
            travelDate,
            pickupTime,
            returnDate: getValue(lines, 'Return Date') || null,
            returnTime: getValue(lines, 'Return Time') || null,
            vehicleId: getVehicleId(vehicle.name),
            vehicleName: vehicle.name,
            vehicleCapacity: vehicle.capacity,
            passengerName: getValue(lines, 'Passenger Name'),
            mobile,
            comingFrom: getValue(lines, 'Coming From'),
            pincode: getValue(lines, 'Pincode'),
            notes: getValue(lines, 'Notes'),
          });

          setSavedBooking(booking);

          if (!message.includes('Booking ID:')) {
            parsedUrl.searchParams.set('text', `${message}\n\nBooking ID: ${booking.id}\nStatus: Waiting for Admin Assignment`);
          }

          return originalOpen(parsedUrl.toString(), target, features);
        } catch {
          return originalOpen(urlString, target, features);
        }
      }

      return originalOpen(urlString, target, features);
    }) as typeof window.open;

    return () => {
      window.open = originalOpen as typeof window.open;
    };
  }, []);

  return (
    <>
      {savedBooking && (
        <div className="fixed left-1/2 top-4 z-[100] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 shadow-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-green-600">Booking Request Created</p>
              <p className="mt-1 text-lg font-black text-gray-900">{savedBooking.id}</p>
              <p className="mt-1 text-sm font-semibold text-green-800">Waiting for Admin Assignment</p>
            </div>
            <button onClick={() => setSavedBooking(null)} className="rounded-xl bg-white px-3 py-2 text-xs font-bold text-gray-600">Close</button>
          </div>
        </div>
      )}
      <Booking />
    </>
  );
};

export default BookingAssignmentPreview;
