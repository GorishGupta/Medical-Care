
import React from 'react';
import Header from '../components/Header';
import DoctorManagement from '../components/DoctorManagement';
import PatientManagement from '../components/PatientManagement';

const Index = () => {
  return (
    <div className="min-h-screen bg-medmate-lightBlue">
      <Header />
      <div className="container mx-auto p-4">
        <DoctorManagement />
        <PatientManagement />
      </div>
    </div>
  );
};

export default Index;
