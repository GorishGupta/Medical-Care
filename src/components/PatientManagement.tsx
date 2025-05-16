
import React, { useState } from 'react';
import { toast } from "@/hooks/use-toast";
import PatientForm from './patient/PatientForm';
import PatientList from './patient/PatientList';
import { doctors } from "@/data/doctorsData";
import { Patient } from "@/types/patientTypes";
import { getSpecialtyFromSymptom } from "@/utils/patientUtils";

const PatientManagement = () => {
  const [patients, setPatients] = useState<Patient[]>([
  { id: '1', name: 'Pawan', city: 'Delhi', email: 'pawan@gmail.com', phone: '9876543210', symptoms: 'Arthritis' },
    { id: '2', name: 'Raju', city: 'Mumbai', email: 'raju@gmail.com', phone: '9876543210', symptoms: 'Skin infection' }
  ]);

  const handleAddPatient = (newPatient: Patient) => {
    setPatients([...patients, newPatient]);
  };

  const handleDeletePatient = (id: string) => {
    setPatients(patients.filter(patient => patient.id !== id));
    toast({
      title: "Patient Removed",
      description: "Patient has been successfully removed",
    });
  };

  // Function to match patients with doctors based on symptoms and location
  const handleSuggestDoctor = (id: string) => {
    const patient = patients.find(p => p.id === id);
    if (!patient) return;

    // Get specialty needed based on symptoms
    const neededSpecialty = getSpecialtyFromSymptom(patient.symptoms);
    
    if (!neededSpecialty) {
      toast({
        title: "Unknown Symptom",
        description: "We couldn't determine the medical specialty for this symptom.",
        variant: "destructive",
      });
      return;
    }
    
    // Check if location is supported (Delhi, Noida, Faridabad)
    const supportedLocations = ['delhi', 'noida', 'faridabad'];
    if (!supportedLocations.includes(patient.city.toLowerCase())) {
      toast({
        title: "Location Not Supported",
        description: "We are still waiting to expand to your location",
        variant: "destructive",
      });
      return;
    }
    
    // Find doctors matching specialty and city
    const matchedDoctors = doctors.filter(d => 
      d.specialty === neededSpecialty && 
      d.city.toLowerCase() === patient.city.toLowerCase()
    );
    
    if (matchedDoctors.length === 0) {
      toast({
        title: "No Specialist Available",
        description: "There isn't any doctor present at your location for your symptom",
        variant: "destructive",
      });
      return;
    }
    
    // Update the patient with the suggested doctor (choosing first match)
    const matchedDoctor = matchedDoctors[0];
    const updatedPatients = patients.map(p => {
      if (p.id === id) {
        return { ...p, suggestedDoctor: matchedDoctor.name };
      }
      return p;
    });
    
    setPatients(updatedPatients);
    toast({
      title: "Doctor Suggested",
      description: `${matchedDoctor.name} (${matchedDoctor.specialty}) has been recommended for ${patient.name}`,
    });
  };

  return (
    <div className="bg-white rounded-md shadow p-4">
      <h2 className="text-lg font-medium mb-4 flex items-center">
        <span className="text-medmate-blue mr-2">🔍</span>
        Manage Patients
      </h2>

      <PatientForm onAddPatient={handleAddPatient} />
      
      <PatientList 
        patients={patients}
        onDeletePatient={handleDeletePatient}
        onSuggestDoctor={handleSuggestDoctor}
      />
    </div>
  );
};

export default PatientManagement;
