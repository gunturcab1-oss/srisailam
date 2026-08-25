import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home.tsx';
import Booking from '@/pages/Booking.tsx';
import SEOPage from '@/components/SEOPage.tsx';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book" element={<Booking />} />
      <Route path="/:url" element={<SEOPage />} />
    </Routes>
  );
};

export default App;
