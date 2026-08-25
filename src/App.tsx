import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home.tsx';
import Booking from '@/pages/Booking.tsx';
import DriverRequest from '@/pages/DriverRequest.tsx';
import AdminDrivers from '@/pages/AdminDrivers.tsx';
import DriverLogin from '@/pages/DriverLogin.tsx';
import DriverHome from '@/pages/DriverHome.tsx';
import SEOPage from '@/components/SEOPage.tsx';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book" element={<Booking />} />
      <Route path="/driver-preview" element={<DriverRequest />} />
      <Route path="/admin-drivers" element={<AdminDrivers />} />
      <Route path="/driver-login" element={<DriverLogin />} />
      <Route path="/driver-home" element={<DriverHome />} />
      <Route path="/:url" element={<SEOPage />} />
    </Routes>
  );
};

export default App;
