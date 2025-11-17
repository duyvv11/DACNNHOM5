import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BaseLayout from './layouts/BaseLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BookingPage from './pages/BookingPage';
import SpecializationPage from './pages/SpecializationPage';
import HospitalDetailPage from './pages/HospitalDetailPage';
import ProfilePage from './pages/ProfilePage';
import SpecializationListPage from './pages/SpecializationsListPage';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import DoctorListPage from './pages/DoctorListPage';
import HospitalListPage from './pages/HostpitalListPage';
import AppointmentPage from './pages/AppointmentPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer position='top-right' />
        <Routes>
          <Route element={<BaseLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/booking/:doctorId" element={<BookingPage />} />
            <Route path="/specialization/:id" element={<SpecializationPage />} />
            <Route path="/hospital/:id" element={<HospitalDetailPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/doctors" element={<DoctorListPage />} />
            <Route path="/specializations" element={<SpecializationListPage />} />
            <Route path="/hospitals" element={<HospitalListPage />} />
            <Route path="/my-appointments" element={<AppointmentPage />} />

          </Route>
        </Routes>

      </AuthProvider>

    </BrowserRouter>
  );
}

export default App;
