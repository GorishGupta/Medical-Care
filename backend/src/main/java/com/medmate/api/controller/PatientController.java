package com.medmate.api.controller;

import com.medmate.api.model.Patient;
import com.medmate.api.service.PatientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/patients")
@Tag(name = "Patient Management", description = "APIs for managing patients")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @GetMapping
    @Operation(summary = "Get all patients", description = "Returns a list of all patients in the system")
    public ResponseEntity<List<Patient>> getAllPatients() {
        return new ResponseEntity<>(patientService.getAllPatients(), HttpStatus.OK);
    }

    @PostMapping
    @Operation(summary = "Add a new patient", description = "Creates a new patient in the system")
    public ResponseEntity<Patient> addPatient(@RequestBody Patient patient) {
        return new ResponseEntity<>(patientService.savePatient(patient), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a patient", description = "Deletes a patient by ID")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get patient by ID", description = "Returns a patient by ID")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        Optional<Patient> patient = patientService.getPatientById(id);
        return patient.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/{id}/suggest-doctor")
    @Operation(
        summary = "Suggest doctor for patient", 
        description = "Suggests a doctor based on patient's symptoms and location"
    )
    public ResponseEntity<String> suggestDoctor(@PathVariable Long id) {
        String result = patientService.suggestDoctor(id);
        
        if (result.equals("Patient not found")) {
            return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
        }
        
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
