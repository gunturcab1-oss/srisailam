import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type ResponseState = 'pending' | 'accepted' | 'declined';

const DriverRequest: React.FC = () => {
  const [response, setResponse] = useState<ResponseState>('pending');

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-gray-950 text-white">
        <div className="max-w-3xl mx-auto px-4 py-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-yellow-400 text-xs font-black uppercase tracking-[0.2em]">Markapur Taxi Driver</p>
            <h1 className="text-2xl md:text-3xl font-black">New Trip Request</h1>
          </div>
          <Link to="/" className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 font-bold transition-colors">
            Home
          </Link>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        <div className="mb-5 p-4 rounded-2xl bg-blue-50 border border-blue-100 text-blue-900 text-sm font-semibold">
          Driver preview only. Live customer bookings are not connected to this screen yet.
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-gray-100">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-gray-400">Trip Request #MT-1001</p>
                <h2 className="text-3xl font-black mt-1">Markapur → Srisailam</h2>
              </div>
              <span className="px-4 py-2 rounded-full bg-green-50 text-green-700 font-black text-sm">One Way</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-gray-50">
                <span className="block text-xs text-gray-500 font-bold uppercase tracking-wider">Pickup</span>
                <strong className="block mt-1">Markapur Road Railway Station</strong>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50">
                <span className="block text-xs text-gray-500 font-bold uppercase tracking-wider">Drop</span>
                <strong className="block mt-1">Srisailam Temple</strong>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50">
                <span className="block text-xs text-gray-500 font-bold uppercase tracking-wider">Pickup date</span>
                <strong className="block mt-1">28 Aug 2026</strong>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50">
                <span className="block text-xs text-gray-500 font-bold uppercase tracking-wider">Pickup time</span>
                <strong className="block mt-1">4:30 AM</strong>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50">
                <span className="block text-xs text-gray-500 font-bold uppercase tracking-wider">Vehicle needed</span>
                <strong className="block mt-1">Swift Dzire</strong>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50">
                <span className="block text-xs text-gray-500 font-bold uppercase tracking-wider">Passengers</span>
                <strong className="block mt-1">4 passengers</strong>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8 bg-yellow-50 border-b border-yellow-100">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-yellow-700">Return Trip Opportunity</p>
            <h3 className="text-xl font-black mt-2">Possible Srisailam → Markapur trip after arrival</h3>
            <p className="text-sm text-gray-700 mt-2">This helps drivers avoid returning empty. The system can show matching return requests when they become available.</p>
          </div>

          <div className="p-6 md:p-8">
            {response === 'pending' && (
              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setResponse('accepted')}
                  className="w-full py-4 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-black text-lg transition-colors"
                >
                  Accept Trip
                </button>
                <button
                  type="button"
                  onClick={() => setResponse('declined')}
                  className="w-full py-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-black text-lg transition-colors"
                >
                  Not Available
                </button>
              </div>
            )}

            {response === 'accepted' && (
              <div className="p-5 rounded-2xl bg-green-50 border border-green-200 text-green-800">
                <h3 className="text-xl font-black">Trip Accepted</h3>
                <p className="mt-2 font-semibold">This trip is reserved for you. In the live version, the customer and admin will be notified immediately.</p>
                <button type="button" onClick={() => setResponse('pending')} className="mt-4 underline font-bold">Reset preview</button>
              </div>
            )}

            {response === 'declined' && (
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 text-gray-800">
                <h3 className="text-xl font-black">Marked Not Available</h3>
                <p className="mt-2 font-semibold">In the live version, the request will automatically move to the next available driver.</p>
                <button type="button" onClick={() => setResponse('pending')} className="mt-4 underline font-bold">Reset preview</button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default DriverRequest;
