import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DRIVER_SESSION_KEY, getDrivers } from '@/services/driverPreviewStore.ts';

const DriverLogin: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const drivers = getDrivers();
    const driver = drivers.find((item) => item.username.toLowerCase() === username.trim().toLowerCase());

    if (!driver || driver.password !== password) {
      setMessage('Invalid username or password.');
      return;
    }

    if (driver.status !== 'active') {
      setMessage('Your driver access is disabled. Please contact admin.');
      return;
    }

    window.localStorage.setItem(DRIVER_SESSION_KEY, driver.id);
    navigate('/driver-home');
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-md">
        <div className="rounded-3xl bg-black p-7 text-white shadow-xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-400">Markapur Taxi</p>
          <h1 className="mt-2 text-3xl font-black">Driver Login</h1>
          <p className="mt-3 text-sm text-gray-300">Use the username and password created by Admin.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 rounded-3xl bg-white p-6 shadow-lg">
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-gray-700">Username</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoCapitalize="none"
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-yellow-400 focus:bg-white"
              placeholder="Driver username"
            />
          </label>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-bold text-gray-700">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-yellow-400 focus:bg-white"
              placeholder="Driver password"
            />
          </label>

          {message && (
            <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{message}</div>
          )}

          <button type="submit" className="mt-6 w-full rounded-2xl bg-yellow-400 px-6 py-4 text-lg font-black text-black hover:bg-yellow-500">
            Login
          </button>

          <p className="mt-4 text-center text-xs text-gray-400">No self-registration. Contact Admin if you cannot access your account.</p>
        </form>
      </div>
    </div>
  );
};

export default DriverLogin;
