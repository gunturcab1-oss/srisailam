import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
            <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-bold text-gray-600">0 trips</span>
          </div>
          <div className="mt-6 rounded-3xl border-2 border-dashed border-gray-200 px-6 py-10 text-center">
            <div className="text-4xl">🚕</div>
            <p className="mt-4 font-bold text-gray-700">No trips assigned yet</p>
            <p className="mt-2 text-sm text-gray-500">Only bookings assigned by Admin will appear here.</p>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-gray-400">Preview only. Real booking assignment will be connected in the next backend phase.</p>
      </div>
    </div>
  );
};

export default DriverHome;
