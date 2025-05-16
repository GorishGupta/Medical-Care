# MedMate API

This is the Spring Boot backend for the MedMate Medical Management System.

## Features

- Doctor management API
- Patient management API
- Doctor suggestion based on patient symptoms and location
- Swagger API documentation

## Technologies

- Spring Boot 3.x
- Spring Data JPA with Hibernate
- H2 Database (in-memory)
- Swagger/OpenAPI for API documentation
- Lombok for reducing boilerplate code

## Getting Started

### Prerequisites

- Java 17 or higher
- Maven

### Running the Application

```bash
# Navigate to the backend directory
cd backend

# Build the application
mvn clean install

# Run the application
mvn spring-boot:run
```

The application will start on port 8081.

## API Documentation

Swagger UI is available at: http://localhost:8081/swagger-ui.html

## Key APIs

### Doctor Management
- GET /api/doctors - Get all doctors
- POST /api/doctors - Add a new doctor
- DELETE /api/doctors/{id} - Delete a doctor

### Patient Management
- GET /api/patients - Get all patients
- POST /api/patients - Add a new patient
- DELETE /api/patients/{id} - Delete a patient
- GET /api/patients/{id} - Get patient by ID

### Doctor Suggestion
- GET /api/patients/{id}/suggest-doctor - Suggest a doctor for a patient based on symptoms and location

## Database

H2 Console is available at: http://localhost:8081/h2-console
- JDBC URL: jdbc:h2:mem:medmatedb
- Username: sa
- Password: (leave empty)
