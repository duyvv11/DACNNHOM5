import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BaseLayout from './layouts/BaseLayout';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dùng BaseLayout làm layout cơ sở */}
        <Route element={<BaseLayout />}>
          <Route path="/" element={<HomePage />} />
          {/* Thêm các trang khác */}
          {/* <Route path="/doctors" element={<DoctorListPage />} /> */}
          {/* <Route path="/specializations" element={<SpecializationPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
