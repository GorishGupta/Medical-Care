
import React from 'react';
import { X } from 'lucide-react';
import { Patient } from "@/types/patientTypes";

type PatientListProps = {
  patients: Patient[];
  onDeletePatient: (id: string) => void;
  onSuggestDoctor: (id: string) => void;
};

const PatientList: React.FC<PatientListProps> = ({ 
  patients, 
  onDeletePatient,
  onSuggestDoctor 
}) => {
  return (
    <div className="mt-8">
      <h3 className="font-medium border-b pb-2 mb-2">Current Patients ({patients.length})</h3>
      
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left">
            <th className="pb-2">Name</th>
            <th className="pb-2">City</th>
            <th className="pb-2">Email</th>
            <th className="pb-2">Phone</th>
            <th className="pb-2">Symptoms</th>
            <th className="pb-2">Suggested Doctor</th>
            <th className="pb-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id} className="border-b">
              <td className="py-2">{patient.name}</td>
              <td className="py-2">{patient.city}</td>
              <td className="py-2">{patient.email}</td>
              <td className="py-2">{patient.phone}</td>
              <td className="py-2">{patient.symptoms}</td>
              <td className="py-2">{patient.suggestedDoctor || "-"}</td>
              <td className="py-2 flex">
                <button 
                  className="text-medmate-blue mr-2 text-xs"
                  onClick={() => onSuggestDoctor(patient.id)}
                >
                  Suggest Doctor
                </button>
                <button 
                  className="text-red-500"
                  onClick={() => onDeletePatient(patient.id)}
                >
                  <X size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
