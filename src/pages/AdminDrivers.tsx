import React, { useMemo, useState } from 'react';
import { FLEET_DATA } from '@/constants.tsx';

type DriverStatus = 'active' | 'disabled';
type DriverLocation = 'markapur' | 'srisailam' | 'on-trip-srisailam' | 'on-trip-markapur' | 'offline';
type AvailabilityStatus = 'available' | 'busy' | 'not-available';

type Driver = {
  id: string;
  name: string;
  username: string;
  mobile: string;
  vehicle: string;
  vehicleNumber: string;
  status: DriverStatus;
  location: DriverLocation;
  availability: AvailabilityStatus;
};

const locationLabels: Record<DriverLocation, string> = {
  markapur: 'Markapur',
  srisailam: 'Srisailam',
  'on-trip-srisailam': 'On Trip → Srisailam',
  'on-trip-markapur': 'On Trip → Markapur',
  offline: 'Offline / Unknown',
};

const availabilityLabels: Record<AvailabilityStatus, string> = {
  available: 'Available',
  busy: 'Busy',
  'not-available': 'Not Available',
};

const emptyForm = {
  name: '',
  username: '',
  password: '',
  mobile: '',
  vehicle: FLEET_DATA[0]?.name || '',
  vehicleNumber: '',
  status: 'active' as DriverStatus,
  location: 'markapur' as DriverLocation,
  availability: 'available' as AvailabilityStatus,
};

const AdminDrivers: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState('');

  const nextDriverId = useMemo(
    () => `DRV-${String(drivers.length + 1).padStart(3, '0')}`,
    [drivers.length]
  );

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.name.trim() || !form.username.trim() || !form.password.trim() || !form.mobile.trim() || !form.vehicleNumber.trim()) {
      setMessage('Please complete all required driver details.');
      return;
    }

    if (!/^\d{10}$/.test(form.mobile.trim())) {
      setMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (drivers.some((driver) => driver.username.toLowerCase() === form.username.trim().toLowerCase())) {
      setMessage('That username is already used. Please choose another username.');
      return;
    }

    const newDriver: Driver = {
      id: nextDriverId,
      name: form.name.trim(),
      username: form.username.trim(),
      mobile: form.mobile.trim(),
      vehicle: form.vehicle,
      vehicleNumber: form.vehicleNumber.trim().toUpperCase(),
      status: form.status,
      location: form.location,
      availability: form.availability,
    };

    setDrivers((current) => [...current, newDriver]);
    setMessage(`Driver ${newDriver.name} created for this preview. Username: ${newDriver.username}`);
    setForm(emptyForm);
  };

  const toggleStatus = (driverId: string) => {
    setDrivers((current) =>
      current.map((driver) =>
        driver.id === driverId
          ? { ...driver, status: driver.status === 'active' ? 'disabled' : 'active' }
          : driver
      )
    );
  };

  const updateDriverLocation = (driverId: string, location: DriverLocation) => {
    setDrivers((current) =>
      current.map((driver) => driver.id === driverId ? { ...driver, location } : driver)
    );
  };

  const updateDriverAvailability = (driverId: string, availability: AvailabilityStatus) => {
    setDrivers((current) =>
      current.map((driver) => driver.id === driverId ? { ...driver, availability } : driver)
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-3xl bg-black p-7 text-white shadow-xl md:p-9">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-yellow-400">Admin Control</p>
              <h1 className="text-3xl font-black md:text-5xl">Driver Management</h1>
              <p className="mt-3 max-w-2xl text-gray-300">
                Admin creates driver login access, tracks driver position and controls which bookings each driver can see.
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 px-5 py-4 text-sm">
              <div className="font-bold text-yellow-400">Phase 1 Rule</div>
              <div className="mt-1 text-gray-200">Admin-assigned bookings only</div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-lg md:p-8">
            <div className="mb-6">
              <p className="text-sm font-bold uppercase tracking-wider text-gray-400">Create Driver</p>
              <h2 className="mt-1 text-2xl font-black">Driver Login & Vehicle Details</h2>
              <p className="mt-2 text-sm text-gray-500">Driver ID for this preview: {nextDriverId}</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-gray-700">Driver Name *</span>
                <input
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-yellow-400 focus:bg-white"
                  placeholder="Driver full name"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-gray-700">Mobile Number *</span>
                <input
                  value={form.mobile}
                  onChange={(e) => updateField('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                  inputMode="numeric"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-yellow-400 focus:bg-white"
                  placeholder="10-digit mobile"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-gray-700">Username *</span>
                <input
                  value={form.username}
                  onChange={(e) => updateField('username', e.target.value)}
                  autoCapitalize="none"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-yellow-400 focus:bg-white"
                  placeholder="Driver username"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-gray-700">Password *</span>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => updateField('password', e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-yellow-400 focus:bg-white"
                  placeholder="Driver password"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-gray-700">Vehicle *</span>
                <select
                  value={form.vehicle}
                  onChange={(e) => updateField('vehicle', e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-yellow-400 focus:bg-white"
                >
                  {FLEET_DATA.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.name}>{vehicle.name}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-gray-700">Vehicle Number *</span>
                <input
                  value={form.vehicleNumber}
                  onChange={(e) => updateField('vehicleNumber', e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 uppercase outline-none focus:border-yellow-400 focus:bg-white"
                  placeholder="AP XX AB 1234"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-gray-700">Current Location</span>
                <select
                  value={form.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-yellow-400 focus:bg-white"
                >
                  {Object.entries(locationLabels).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-gray-700">Availability Status</span>
                <select
                  value={form.availability}
                  onChange={(e) => updateField('availability', e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-yellow-400 focus:bg-white"
                >
                  {Object.entries(availabilityLabels).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </label>

              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-bold text-gray-700">Driver Access Status</span>
                <select
                  value={form.status}
                  onChange={(e) => updateField('status', e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-yellow-400 focus:bg-white"
                >
                  <option value="active">Active</option>
                  <option value="disabled">Disabled</option>
                </select>
              </label>
            </div>

            {message && (
              <div className="mt-6 rounded-2xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm font-semibold text-gray-800">
                {message}
              </div>
            )}

            <button
              type="submit"
              className="mt-6 w-full rounded-2xl bg-yellow-400 px-6 py-4 text-lg font-black text-black transition hover:bg-yellow-500"
            >
              Create Driver
            </button>

            <p className="mt-4 text-xs leading-relaxed text-gray-400">
              Preview only: data entered here is stored only in this browser session and is not yet saved to a backend database.
            </p>
          </form>

          <div className="rounded-3xl bg-white p-6 shadow-lg md:p-8">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-gray-400">Driver Access</p>
                <h2 className="mt-1 text-2xl font-black">Created Drivers</h2>
              </div>
              <div className="rounded-full bg-gray-100 px-4 py-2 text-sm font-bold text-gray-600">
                {drivers.length} {drivers.length === 1 ? 'driver' : 'drivers'}
              </div>
            </div>

            {drivers.length === 0 ? (
              <div className="rounded-3xl border-2 border-dashed border-gray-200 px-6 py-12 text-center">
                <div className="text-4xl">🚕</div>
                <p className="mt-4 font-bold text-gray-700">No drivers created yet</p>
                <p className="mt-2 text-sm text-gray-500">Create a driver using the form. The driver will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {drivers.map((driver) => (
                  <div key={driver.id} className="rounded-3xl border border-gray-100 bg-gray-50 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-lg font-black text-gray-900">{driver.name}</h3>
                          <span className={`rounded-full px-3 py-1 text-xs font-bold ${driver.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {driver.status === 'active' ? 'Active' : 'Disabled'}
                          </span>
                          <span className={`rounded-full px-3 py-1 text-xs font-bold ${driver.availability === 'available' ? 'bg-blue-100 text-blue-700' : driver.availability === 'busy' ? 'bg-orange-100 text-orange-700' : 'bg-gray-200 text-gray-700'}`}>
                            {availabilityLabels[driver.availability]}
                          </span>
                        </div>
                        <p className="mt-1 text-xs font-bold uppercase tracking-wider text-gray-400">{driver.id}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleStatus(driver.id)}
                        className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-gray-700"
                      >
                        {driver.status === 'active' ? 'Disable' : 'Enable'}
                      </button>
                    </div>

                    <div className="mt-4 rounded-2xl border border-yellow-200 bg-yellow-50 p-4">
                      <div className="text-xs font-bold uppercase tracking-wider text-yellow-700">Current Driver Position</div>
                      <div className="mt-1 text-lg font-black text-gray-900">📍 {locationLabels[driver.location]}</div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-2xl bg-white p-3">
                        <div className="text-xs font-bold uppercase text-gray-400">Username</div>
                        <div className="mt-1 font-semibold text-gray-800">{driver.username}</div>
                      </div>
                      <div className="rounded-2xl bg-white p-3">
                        <div className="text-xs font-bold uppercase text-gray-400">Mobile</div>
                        <div className="mt-1 font-semibold text-gray-800">{driver.mobile}</div>
                      </div>
                      <div className="rounded-2xl bg-white p-3">
                        <div className="text-xs font-bold uppercase text-gray-400">Vehicle</div>
                        <div className="mt-1 font-semibold text-gray-800">{driver.vehicle}</div>
                      </div>
                      <div className="rounded-2xl bg-white p-3">
                        <div className="text-xs font-bold uppercase text-gray-400">Vehicle No.</div>
                        <div className="mt-1 font-semibold text-gray-800">{driver.vehicleNumber}</div>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-xs font-bold uppercase text-gray-500">Update Location</span>
                        <select
                          value={driver.location}
                          onChange={(e) => updateDriverLocation(driver.id, e.target.value as DriverLocation)}
                          className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-yellow-400"
                        >
                          {Object.entries(locationLabels).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                          ))}
                        </select>
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-xs font-bold uppercase text-gray-500">Update Availability</span>
                        <select
                          value={driver.availability}
                          onChange={(e) => updateDriverAvailability(driver.id, e.target.value as AvailabilityStatus)}
                          className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-yellow-400"
                        >
                          {Object.entries(availabilityLabels).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <div className="mt-4 rounded-2xl bg-black px-4 py-3 text-sm text-white">
                      Booking access: <span className="font-bold text-yellow-400">Admin-assigned trips only</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDrivers;
