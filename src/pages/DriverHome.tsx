import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  PreviewBooking,
  acceptBooking,
  declineBooking,
  getBookings,
} from '@/services/bookingPreviewStore.ts';
import {
  AvailabilityStatus,
  DriverLocation,
  DRIVER_SESSION_KEY,
  availabilityLabels,
  getDrivers,
  locationLabels,
  updateStoredDriver,
} from '@/services/driverPreviewStore.ts';

const DriverHome: React.FC = () => {
  const navigate = useNavigate();
  const sessionId = typeof window !== 'undefined' ? window.localStorage.getItem(DRIVER_SESSION_KEY) : null;
  const initialDriver = useMemo(() => getDrivers().find((driver) => driver.id === sessionId) || null, [sessionId]);
  const [driver, setDriver] = useState(initialDriver);
  const [trips, setTrips] = useState<PreviewBooking[]>(() =>
    sessionId ? getBookings().filter((booking) => booking.assignedDriverId === sessionId) : []
  );
  const [message, setMessage] = useState('');

  const refreshTrips = () => {
    if (!sessionId) return;
    const latestDriver = getDrivers().find((item) => item.id === sessionId) || null;
    setDriver(latestDriver);
    setTrips(getBookings().filter((booking) => booking.assignedDriverId === sessionId));
  };

  useEffect(() => {
    const handleRefresh = () => refreshTrips();
    window.addEventListener('storage', handleRefresh);
    window.addEventListener('focus', handleRefresh);
    window.addEventListener('markapur-preview-bookings-changed', handleRefresh);
    window.addEventListener('markapur-preview-drivers-changed', handleRefresh);
    return () => {
      window.removeEventListener('storage', handleRefresh);
      window.removeEventListener('focus', handleRefresh);
      window.removeEventListener('markapur-preview-bookings-changed', handleRefresh);
      window.removeEventListener('markapur-preview-drivers-changed', handleRefresh);
    };
  }, [sessionId]);

  if (!driver) {
    return (
      <div className="min-h-screen bg-gray-100 px-4 py-10">
        <div className="mx-auto max-w-md rounded-3xl bg-white p-7 text-center shadow-lg">
          <h1 className="text-2xl font-black">Driver Login Required</h1>
          <p className="mt-3 text-sm text-gray-500">Please sign in with your driver username and password.</p>
          <Link to="/driver-login" className="mt-6 inline-block rounded-2xl bg-yellow-400 px-6 py-3 font-black text-black">Go to Driver Login</Link>
        </div>
      </div>
    );
  }

  const updateLocation = (location: DriverLocation) => {
    const updated = updateStoredDriver(driver.id, { location });
    if (updated) setDriver(updated);
  };

  const updateAvailability = (availability: AvailabilityStatus) => {
    const updated = updateStoredDriver(driver.id, { availability });
    if (updated) setDriver(updated);
  };

  const acceptTrip = (booking: PreviewBooking) => {
    const updated = acceptBooking(booking.id, driver.id);
    if (!updated) {
      setMessage('This trip is no longer available for acceptance. Please refresh.');
      refreshTrips();
      return;
    }
    setMessage(`${booking.id} accepted. Admin can now see that you accepted the trip.`);
    refreshTrips();
  };

  const declineTrip = (booking: PreviewBooking) => {
    const updated = declineBooking(booking.id, driver.id);
    if (!updated) {
      setMessage('This trip is no longer assigned to you. Please refresh.');
      refreshTrips();
      return;
    }
    setMessage(`${booking.id} marked Not Available and returned to Admin for reassignment.`);
    refreshTrips();
  };

  const logout = () => {
    window.localStorage.removeItem(DRIVER_SESSION_KEY);
    navigate('/driver-login');
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-3xl bg-black p-7 text-white shadow-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-400">Driver Home</p>
              <h1 className="mt-2 text-3xl font-black">Welcome, {driver.name}</h1>
              <p className="mt-2 text-sm text-gray-300">{driver.vehicle} • {driver.vehicleNumber}</p>
            </div>
            <button onClick={logout} className="rounded-xl bg-white/10 px-4 py-2 text-sm font-bold text-white">Logout</button>
          </div>
        </div>

        {driver.status !== 'active' && (
          <div className="mt-6 rounded-3xl border border-red-200 bg-red-50 p-5 text-red-700">
            <div className="font-black">Driver access disabled</div>
            <p className="mt-1 text-sm">Please contact Admin.</p>
          </div>
        )}

        {message && (
          <div className="mt-6 rounded-2xl border border-yellow-200 bg-yellow-50 px-5 py-4 text-sm font-semibold text-gray-800">
            {message}
          </div>
        )}

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Current Location</p>
            <div className="mt-2 text-2xl font-black">📍 {locationLabels[driver.location]}</div>
            <select
              value={driver.location}
              onChange={(e) => updateLocation(e.target.value as DriverLocation)}
              className="mt-4 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 font-semibold outline-none focus:border-yellow-400"
            >
              {Object.entries(locationLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Availability</p>
            <div className="mt-2 text-2xl font-black">{availabilityLabels[driver.availability]}</div>
            <select
              value={driver.availability}
              onChange={(e) => updateAvailability(e.target.value as AvailabilityStatus)}
              className="mt-4 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 font-semibold outline-none focus:border-yellow-400"
            >
              {Object.entries(availabilityLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-6 rounded-3xl bg-white p-6 shadow-lg">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Assigned Trips</p>
              <h2 className="mt-1 text-2xl font-black">My Trips</h2>
            </div>
            <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-bold text-gray-600">{trips.length} {trips.length === 1 ? 'trip' : 'trips'}</span>
          </div>

          {trips.length === 0 ? (
            <div className="mt-6 rounded-3xl border-2 border-dashed border-gray-200 px-6 py-10 text-center">
              <div className="text-4xl">🚕</div>
              <p className="mt-4 font-bold text-gray-700">No trips assigned yet</p>
              <p className="mt-2 text-sm text-gray-500">Only bookings assigned by Admin will appear here.</p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {trips.map((booking) => (
                <div key={booking.id} className="rounded-3xl border border-gray-200 p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-xl font-black">{booking.id}</h3>
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${booking.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-800'}`}>
                          {booking.status === 'accepted' ? 'Accepted' : 'New Trip'}
                        </span>
                      </div>
                      <p className="mt-2 text-lg font-black">{booking.directionLabel}</p>
                      <p className="mt-1 text-sm text-gray-500">{booking.tripLabel} • {booking.vehicleName}</p>
                    </div>
                    <div className="rounded-2xl bg-gray-100 px-4 py-3 text-sm">
                      <div className="text-xs font-bold uppercase text-gray-400">Pickup</div>
                      <div className="mt-1 font-black">{booking.travelDate} • {booking.pickupTime}</div>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-gray-50 p-4"><div className="text-xs font-bold uppercase text-gray-400">Pickup Location</div><div className="mt-1 font-bold">{booking.pickupPoint}</div></div>
                    <div className="rounded-2xl bg-gray-50 p-4"><div className="text-xs font-bold uppercase text-gray-400">Drop Location</div><div className="mt-1 font-bold">{booking.dropPoint}</div></div>
                  </div>

                  {booking.tripType === 'round-trip' && (
                    <div className="mt-3 rounded-2xl bg-gray-50 p-4 text-sm"><span className="font-bold text-gray-500">Return:</span> <span className="font-black">{booking.returnDate} • {booking.returnTime}</span></div>
                  )}

                  {booking.notes && <div className="mt-3 rounded-2xl bg-gray-50 p-4 text-sm"><span className="font-bold text-gray-500">Trip Notes:</span> {booking.notes}</div>}

                  {booking.status === 'assigned' && driver.status === 'active' && (
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <button onClick={() => acceptTrip(booking)} className="rounded-2xl bg-green-600 px-5 py-4 font-black text-white">Accept Trip</button>
                      <button onClick={() => declineTrip(booking)} className="rounded-2xl border border-gray-300 bg-white px-5 py-4 font-black text-gray-800">Not Available</button>
                    </div>
                  )}

                  {booking.status === 'accepted' && (
                    <div className="mt-5 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-800">You accepted this trip. Admin can see your confirmation.</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="mt-5 text-center text-xs text-gray-400">Preview only. Real multi-device booking assignment will be connected when we add the backend.</p>
      </div>
    </div>
  );
};

export default DriverHome;
