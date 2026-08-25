import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PreviewBooking,
  assignBookingToDriver,
  getBookings,
  returnBookingToAdmin,
} from '@/services/bookingPreviewStore.ts';
import {
  PreviewDriver,
  availabilityLabels,
  getDrivers,
  locationLabels,
} from '@/services/driverPreviewStore.ts';

const statusLabel: Record<PreviewBooking['status'], string> = {
  'waiting-admin': 'Waiting for Admin Assignment',
  assigned: 'Waiting for Driver Response',
  accepted: 'Accepted by Driver',
};

const statusClass: Record<PreviewBooking['status'], string> = {
  'waiting-admin': 'bg-yellow-100 text-yellow-800',
  assigned: 'bg-blue-100 text-blue-800',
  accepted: 'bg-green-100 text-green-800',
};

const getDriverScore = (driver: PreviewDriver, booking: PreviewBooking) => {
  const pickupLocation = booking.direction === 'markapur-srisailam' ? 'markapur' : 'srisailam';
  let score = 0;
  if (driver.location === pickupLocation) score += 4;
  if (driver.availability === 'available') score += 3;
  if (driver.vehicle === booking.vehicleName) score += 2;
  return score;
};

const AdminBookings: React.FC = () => {
  const [bookings, setBookings] = useState<PreviewBooking[]>(() => getBookings());
  const [drivers, setDrivers] = useState<PreviewDriver[]>(() => getDrivers());
  const [selectedDrivers, setSelectedDrivers] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');

  const refresh = () => {
    setBookings(getBookings());
    setDrivers(getDrivers());
  };

  useEffect(() => {
    const handleStorage = () => refresh();
    window.addEventListener('storage', handleStorage);
    window.addEventListener('focus', handleStorage);
    window.addEventListener('markapur-preview-bookings-changed', handleStorage);
    window.addEventListener('markapur-preview-drivers-changed', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('focus', handleStorage);
      window.removeEventListener('markapur-preview-bookings-changed', handleStorage);
      window.removeEventListener('markapur-preview-drivers-changed', handleStorage);
    };
  }, []);

  const activeDrivers = useMemo(
    () => drivers.filter((driver) => driver.status === 'active'),
    [drivers]
  );

  const findDriver = (driverId: string | null) => drivers.find((driver) => driver.id === driverId) || null;

  const assign = (booking: PreviewBooking) => {
    const driverId = selectedDrivers[booking.id];
    if (!driverId) {
      setMessage(`Select a driver for ${booking.id}.`);
      return;
    }
    const driver = findDriver(driverId);
    if (!driver) {
      setMessage('That driver is no longer available in the preview.');
      return;
    }
    assignBookingToDriver(booking.id, driverId);
    refresh();
    setMessage(`${booking.id} assigned to ${driver.name}. The trip will now appear in that driver's My Trips.`);
  };

  const reassign = (booking: PreviewBooking) => {
    returnBookingToAdmin(booking.id);
    refresh();
    setSelectedDrivers((current) => ({ ...current, [booking.id]: '' }));
    setMessage(`${booking.id} returned to Admin for reassignment.`);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-black p-7 text-white shadow-xl md:p-9">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-400">Admin Control</p>
              <h1 className="mt-2 text-3xl font-black md:text-5xl">Booking Assignment</h1>
              <p className="mt-3 max-w-2xl text-gray-300">Review customer requests, choose the most suitable driver, and track the driver's response.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/admin-drivers" className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold hover:bg-white/20">Driver Management</Link>
              <button onClick={refresh} className="rounded-2xl bg-yellow-400 px-4 py-3 text-sm font-black text-black">Refresh</button>
            </div>
          </div>
        </div>

        {message && (
          <div className="mt-6 rounded-2xl border border-yellow-200 bg-yellow-50 px-5 py-4 text-sm font-semibold text-gray-800">
            {message}
          </div>
        )}

        <div className="mt-6 flex items-center justify-between gap-4 rounded-3xl bg-white p-5 shadow-lg">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Customer Requests</p>
            <h2 className="mt-1 text-2xl font-black">Bookings</h2>
          </div>
          <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-bold text-gray-600">{bookings.length} {bookings.length === 1 ? 'booking' : 'bookings'}</span>
        </div>

        {bookings.length === 0 ? (
          <div className="mt-6 rounded-3xl border-2 border-dashed border-gray-300 bg-white px-6 py-14 text-center">
            <div className="text-4xl">📋</div>
            <p className="mt-4 font-black text-gray-800">No customer bookings yet</p>
            <p className="mt-2 text-sm text-gray-500">Submit a booking from the customer booking page. It will appear here automatically.</p>
            <Link to="/book" className="mt-5 inline-block rounded-2xl bg-yellow-400 px-5 py-3 font-black text-black">Open Customer Booking</Link>
          </div>
        ) : (
          <div className="mt-6 space-y-5">
            {bookings.map((booking) => {
              const assignedDriver = findDriver(booking.assignedDriverId);
              const declinedDriver = findDriver(booking.lastDeclinedDriverId);
              const sortedDrivers = [...activeDrivers].sort((a, b) => getDriverScore(b, booking) - getDriverScore(a, booking));
              const selectedDriver = findDriver(selectedDrivers[booking.id] || null);
              const pickupLocation = booking.direction === 'markapur-srisailam' ? 'markapur' : 'srisailam';
              const selectedIsRecommended = selectedDriver
                ? selectedDriver.location === pickupLocation && selectedDriver.availability === 'available' && selectedDriver.vehicle === booking.vehicleName
                : false;
              const vehicleMismatch = selectedDriver && selectedDriver.vehicle !== booking.vehicleName;

              return (
                <div key={booking.id} className="rounded-3xl bg-white p-6 shadow-lg md:p-7">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-2xl font-black text-gray-900">{booking.id}</h3>
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${statusClass[booking.status]}`}>{statusLabel[booking.status]}</span>
                      </div>
                      <p className="mt-2 text-lg font-black">{booking.directionLabel}</p>
                      <p className="mt-1 text-sm text-gray-500">{booking.tripLabel} • {booking.vehicleName} • {booking.vehicleCapacity}</p>
                    </div>
                    <div className="rounded-2xl bg-gray-100 px-4 py-3 text-sm">
                      <div className="text-xs font-bold uppercase text-gray-400">Pickup</div>
                      <div className="mt-1 font-black">{booking.travelDate} • {booking.pickupTime}</div>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-2xl bg-gray-50 p-4"><div className="text-xs font-bold uppercase text-gray-400">Pickup Location</div><div className="mt-1 font-bold">{booking.pickupPoint}</div></div>
                    <div className="rounded-2xl bg-gray-50 p-4"><div className="text-xs font-bold uppercase text-gray-400">Drop Location</div><div className="mt-1 font-bold">{booking.dropPoint}</div></div>
                    <div className="rounded-2xl bg-gray-50 p-4"><div className="text-xs font-bold uppercase text-gray-400">Passenger</div><div className="mt-1 font-bold">{booking.passengerName}</div><div className="text-sm text-gray-500">{booking.mobile}</div></div>
                    <div className="rounded-2xl bg-gray-50 p-4"><div className="text-xs font-bold uppercase text-gray-400">Coming From</div><div className="mt-1 font-bold">{booking.comingFrom}</div><div className="text-sm text-gray-500">PIN {booking.pincode}</div></div>
                  </div>

                  {booking.tripType === 'round-trip' && (
                    <div className="mt-3 rounded-2xl border border-gray-200 p-4 text-sm">
                      <span className="font-bold text-gray-500">Return:</span> <span className="font-black">{booking.returnDate} • {booking.returnTime}</span>
                    </div>
                  )}

                  {booking.notes && <div className="mt-3 rounded-2xl border border-gray-200 p-4 text-sm"><span className="font-bold text-gray-500">Notes:</span> {booking.notes}</div>}

                  {declinedDriver && booking.status === 'waiting-admin' && (
                    <div className="mt-4 rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-semibold text-orange-800">
                      {declinedDriver.name} marked this trip as Not Available. Please assign another driver.
                    </div>
                  )}

                  {booking.status === 'waiting-admin' && (
                    <div className="mt-5 rounded-3xl border border-gray-200 p-5">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Assign Driver</p>
                          <h4 className="mt-1 text-lg font-black">Choose nearest suitable driver</h4>
                        </div>
                        <span className="text-xs font-semibold text-gray-500">Active drivers only</span>
                      </div>

                      {sortedDrivers.length === 0 ? (
                        <div className="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">No active drivers available. Create or enable a driver first.</div>
                      ) : (
                        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto]">
                          <select
                            value={selectedDrivers[booking.id] || ''}
                            onChange={(e) => setSelectedDrivers((current) => ({ ...current, [booking.id]: e.target.value }))}
                            className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 font-semibold outline-none focus:border-yellow-400"
                          >
                            <option value="">Select driver</option>
                            {sortedDrivers.map((driver) => {
                              const recommended = driver.location === pickupLocation && driver.availability === 'available' && driver.vehicle === booking.vehicleName;
                              return (
                                <option key={driver.id} value={driver.id}>
                                  {recommended ? '★ ' : ''}{driver.name} • {locationLabels[driver.location]} • {availabilityLabels[driver.availability]} • {driver.vehicle}
                                </option>
                              );
                            })}
                          </select>
                          <button onClick={() => assign(booking)} className="rounded-2xl bg-yellow-400 px-6 py-3 font-black text-black">Assign Driver</button>
                        </div>
                      )}

                      {selectedDriver && (
                        <div className={`mt-3 rounded-2xl px-4 py-3 text-sm font-semibold ${selectedIsRecommended ? 'bg-green-50 text-green-800' : vehicleMismatch ? 'bg-orange-50 text-orange-800' : 'bg-blue-50 text-blue-800'}`}>
                          {selectedIsRecommended
                            ? `Recommended: ${selectedDriver.name} is available in the pickup location with the requested ${booking.vehicleName}.`
                            : vehicleMismatch
                              ? `Check vehicle: customer requested ${booking.vehicleName}, but ${selectedDriver.name} is assigned to ${selectedDriver.vehicle}. Admin can still assign if an alternate vehicle is agreed.`
                              : `${selectedDriver.name}: ${locationLabels[selectedDriver.location]} • ${availabilityLabels[selectedDriver.availability]}.`}
                        </div>
                      )}
                    </div>
                  )}

                  {booking.status === 'assigned' && assignedDriver && (
                    <div className="mt-5 flex flex-col gap-4 rounded-3xl border border-blue-200 bg-blue-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-blue-500">Assigned Driver</p>
                        <div className="mt-1 text-xl font-black text-gray-900">{assignedDriver.name}</div>
                        <div className="mt-1 text-sm text-gray-600">{locationLabels[assignedDriver.location]} • {availabilityLabels[assignedDriver.availability]} • {assignedDriver.vehicle}</div>
                        <p className="mt-2 text-sm font-semibold text-blue-800">Waiting for driver to Accept Trip or choose Not Available.</p>
                      </div>
                      <button onClick={() => reassign(booking)} className="rounded-2xl border border-blue-200 bg-white px-5 py-3 text-sm font-black text-blue-800">Reassign</button>
                    </div>
                  )}

                  {booking.status === 'accepted' && assignedDriver && (
                    <div className="mt-5 rounded-3xl border border-green-200 bg-green-50 p-5">
                      <p className="text-xs font-bold uppercase tracking-wider text-green-600">Trip Confirmed with Driver</p>
                      <div className="mt-1 text-xl font-black text-gray-900">Accepted by {assignedDriver.name}</div>
                      <div className="mt-2 text-sm text-gray-600">{assignedDriver.vehicle} • {assignedDriver.vehicleNumber}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <p className="mt-6 text-center text-xs text-gray-400">Preview only. Booking, driver and assignment data are stored in this browser until the real backend is connected.</p>
      </div>
    </div>
  );
};

export default AdminBookings;
