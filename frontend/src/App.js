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
import DoctorPage from './pages/doctor/DoctorPage';
import DoctorSchedulePage from './pages/doctor/DoctorSchedulePage';

// admin 
import AdminLayout from './pages/admin/AdminLayout';
import UsersManagementPage from './pages/admin/UsersManagementPage/UsersManagementPage';

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
            <Route path="/pagedoctor" element={<DoctorPage/>}/>
            <Route path="/doctorschedulepage" element={<DoctorSchedulePage/>}/>

            {/* admin */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="/admin/users" element={<UsersManagementPage/>}/>
            
            </Route>

          </Route>
        </Routes>

      </AuthProvider>

    </BrowserRouter>
  );
}

export default App;
