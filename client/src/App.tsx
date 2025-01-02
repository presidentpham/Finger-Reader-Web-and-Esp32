import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Attendance from './components/Attendance';
import AddFingerprint from './components/AddFingerprint';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/add-fingerprint" element={<AddFingerprint />} />
      </Routes>
    </Router>
  );
};

export default App;
