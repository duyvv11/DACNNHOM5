import React, { createContext, useEffect, useState } from "react";

export const AdminDataContext = createContext();

export const AdminDataProvider = ({ children }) => {
  const [hospitals, setHospitals] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async () => {
    try {
      const [hRes, sRes] = await Promise.all([
        fetch("http://localhost:5000/api/hospitals"),
        fetch("http://localhost:5000/api/specializations"),
      ]);
      const [hData, sData] = await Promise.all([hRes.json(), sRes.json()]);
      setHospitals(hData);
      setSpecializations(sData);
    } catch (err) {
      console.error("Lỗi fetch admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <AdminDataContext.Provider
      value={{ hospitals ,setHospitals, specializations,setSpecializations, loading }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};
