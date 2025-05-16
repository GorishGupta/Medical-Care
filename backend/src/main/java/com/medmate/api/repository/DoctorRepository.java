package com.medmate.api.repository;

import com.medmate.api.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    List<Doctor> findBySpecialtyAndCityIgnoreCase(String specialty, String city);
    List<Doctor> findByCity(String city);
}
