package com.medmate.api.service;

import com.medmate.api.model.Doctor;
import com.medmate.api.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }

    public List<Doctor> findDoctorsBySpecialtyAndCity(String specialty, String city) {
        return doctorRepository.findBySpecialtyAndCityIgnoreCase(specialty, city);
    }
}
