package com.medmate.api.service;

import com.medmate.api.model.Doctor;
import com.medmate.api.model.Patient;
import com.medmate.api.repository.PatientRepository;
import com.medmate.api.util.SymptomSpecialtyMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorService doctorService;

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Patient savePatient(Patient patient) {
        return patientRepository.save(patient);
    }

    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }

    public Optional<Patient> getPatientById(Long id) {
        return patientRepository.findById(id);
    }

    public String suggestDoctor(Long patientId) {
        Optional<Patient> patientOpt = patientRepository.findById(patientId);
        
        if (patientOpt.isEmpty()) {
            return "Patient not found";
        }
        
        Patient patient = patientOpt.get();
        String city = patient.getCity();
        String symptoms = patient.getSymptoms();
        
        // Check if location is supported
        if (!isSupportedLocation(city)) {
            return "We are still waiting to expand to your location";
        }
        
        // Get specialty needed based on symptoms
        String neededSpecialty = SymptomSpecialtyMapper.getSpecialtyFromSymptom(symptoms);
        
        if (neededSpecialty == null) {
            return "We couldn't determine the medical specialty for this symptom";
        }
        
        // Find doctors matching specialty and city
        List<Doctor> matchedDoctors = doctorService.findDoctorsBySpecialtyAndCity(neededSpecialty, city);
        
        if (matchedDoctors.isEmpty()) {
            return "There isn't any doctor present at your location for your symptom";
        }
        
        // Update patient with suggested doctor
        Doctor matchedDoctor = matchedDoctors.get(0);
        patient.setSuggestedDoctor(matchedDoctor.getName());
        patientRepository.save(patient);
        
        return matchedDoctor.getName();
    }
    
    private boolean isSupportedLocation(String city) {
        if (city == null) return false;
        String lowerCity = city.toLowerCase();
        return lowerCity.equals("delhi") || lowerCity.equals("noida") || lowerCity.equals("faridabad");
    }
}
