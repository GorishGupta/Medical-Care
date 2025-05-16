
import React, { useState } from 'react';
import { X } from 'lucide-react';

type Doctor = {
  id: string;
  name: string;
  city: string;
  email: string;
  phone: string;
  specialty: string;
};

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([
    { id: '1', name: 'Dr. Sarah Smith', city: 'Delhi', email: 'ss@gmail.com', phone: '9872654321', specialty: 'Orthopedic' },
    { id: '2', name: 'Dr. Muskan Sharma', city: 'Noida', email: 'MuskanSharma@gmail.com', phone: '9876543210', specialty: 'Dermatology' }
  ]);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialty, setSpecialty] = useState('');

  const handleAddDoctor = () => {
    if (name && city && email && phone) {
      const newDoctor: Doctor = {
        id: Date.now().toString(),
        name,
        city,
        email,
        phone,
        specialty,
      };
      
      setDoctors([...doctors, newDoctor]);
      setName('');
      setCity('');
      setEmail('');
      setPhone('');
      setSpecialty('');
    }
  };

  const handleDeleteDoctor = (id: string) => {
    setDoctors(doctors.filter(doctor => doctor.id !== id));
  };

  return (
    <div className="bg-white rounded-md shadow p-4 mb-6">
      <h2 className="text-lg font-medium mb-4 flex items-center">
        <span className="text-medmate-blue mr-2">🔍</span>
        Manage Doctors
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm mb-1">Doctor Name</label>
          <input 
            type="text" 
            placeholder="e.g. Dr. Gorish Gupta" 
            className="w-full p-2 border rounded text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">City</label>
          <select 
            className="w-full p-2 border rounded text-sm"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">Select City</option>
            <option value="Delhi">Delhi</option>
            <option value="Noida">Noida</option>
            <option value="Faridabad">Faridabad</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input 
            type="email" 
            placeholder="e.g. gorish@gmail.com" 
            className="w-full p-2 border rounded text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Phone Number</label>
          <input 
            type="text" 
            placeholder="e.g. 9876543210" 
            className="w-full p-2 border rounded text-sm"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm mb-1">Specialty</label>
        <select 
          className="w-full p-2 border rounded text-sm"
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
        >
          <option value="">Select specialty</option>
          <option value="Orthopedic">Orthopedic</option>
          <option value="Genecology">Genecology</option>
          <option value="Dermatology">Dermatology</option>
          <option value="ENT">ENT Specialist</option>
        </select>
      </div>

      <div>
        <button 
          className="bg-medmate-blue text-white px-3 py-1 rounded text-sm flex items-center"
          onClick={handleAddDoctor}
        >
          <span className="mr-1">+</span> Add Doctor
        </button>
      </div>

      {/* Current Doctors List */}
      <div className="mt-8">
        <h3 className="font-medium border-b pb-2 mb-2">Current Doctors ({doctors.length})</h3>
        
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left">
              <th className="pb-2">Name</th>
              <th className="pb-2">City</th>
              <th className="pb-2">Email</th>
              <th className="pb-2">Phone</th>
              <th className="pb-2">Specialty</th>
              <th className="pb-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id} className="border-b">
                <td className="py-2">{doctor.name}</td>
                <td className="py-2">{doctor.city}</td>
                <td className="py-2">{doctor.email}</td>
                <td className="py-2">{doctor.phone}</td>
                <td className="py-2">{doctor.specialty}</td>
                <td className="py-2">
                  <button 
                    className="text-red-500"
                    onClick={() => handleDeleteDoctor(doctor.id)}
                  >
                    <X size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorManagement;
