
import React, { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { validateName, validateCity, validateEmail, validatePhone } from "@/utils/patientUtils";
import { Patient, PatientFormErrors } from "@/types/patientTypes";

type PatientFormProps = {
  onAddPatient: (patient: Patient) => void;
};

const PatientForm: React.FC<PatientFormProps> = ({ onAddPatient }) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [symptoms, setSymptoms] = useState('');
  
  // Form validation errors
  const [errors, setErrors] = useState<PatientFormErrors>({
    name: '',
    city: '',
    email: '',
    phone: '',
    symptoms: ''
  });

  const validateForm = () => {
    const newErrors = {
      name: !validateName(name) ? 'Name should be at least 3 characters' : '',
      city: !validateCity(city) ? 'City should be at most 20 characters' : '',
      email: !validateEmail(email) ? 'Please enter a valid email address' : '',
      phone: !validatePhone(phone) ? 'Phone number should be at least 10 digits' : '',
      symptoms: symptoms.trim() === '' ? 'Please enter symptoms' : ''
    };
    
    setErrors(newErrors);
    
    // Return true if no errors
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleAddPatient = () => {
    if (validateForm()) {
      const newPatient: Patient = {
        id: Date.now().toString(),
        name,
        city,
        email,
        phone,
        symptoms
      };
      
      onAddPatient(newPatient);
      setName('');
      setCity('');
      setEmail('');
      setPhone('');
      setSymptoms('');
      
      toast({
        title: "Patient Added",
        description: `${name} has been successfully added`,
      });
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm mb-1">Patient Name*</label>
          <input 
            type="text" 
            placeholder="e.g. Jane Doe" 
            className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded text-sm`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">City*</label>
          <input 
            type="text" 
            placeholder="e.g. Delhi, Noida, Faridabad"
            className={`w-full p-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded text-sm`}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm mb-1">Email*</label>
          <input 
            type="email" 
            placeholder="e.g. janedoe@example.com" 
            className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded text-sm`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm mb-1">Phone Number*</label>
          <input 
            type="text" 
            placeholder="e.g. 9876543210" 
            className={`w-full p-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded text-sm`}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm mb-1">Symptoms*</label>
        <select
          className={`w-full p-2 border ${errors.symptoms ? 'border-red-500' : 'border-gray-300'} rounded text-sm`}
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        >
          <option value="">Select symptom</option>
          <option value="Arthritis">Arthritis</option>
          <option value="Back Pain">Back Pain</option>
          <option value="Tissue injuries">Tissue injuries</option>
          <option value="Dysmenorrhea">Dysmenorrhea</option>
          <option value="Skin infection">Skin infection</option>
          <option value="Skin burn">Skin burn</option>
          <option value="Ear pain">Ear pain</option>
          <option value="Eye pain">Eye pain</option>
        </select>
        {errors.symptoms && <p className="text-red-500 text-xs mt-1">{errors.symptoms}</p>}
      </div>

      <div>
        <button 
          className="bg-medmate-blue text-white px-3 py-1 rounded text-sm flex items-center"
          onClick={handleAddPatient}
        >
          <span className="mr-1">+</span> Add Patient
        </button>
      </div>
    </>
  );
};

export default PatientForm;
