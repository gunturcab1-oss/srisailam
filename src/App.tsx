import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import SEOPage from '@/components/SEOPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:url" element={<SEOPage />} />
    </Routes>
  );
};

export default App;
