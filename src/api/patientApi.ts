import { Patient } from "@/types/patientTypes";

const API_URL = "http://localhost:8081/api";

export const fetchPatients = async (): Promise<Patient[]> => {
  try {
    const response = await fetch(`${API_URL}/patients`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching patients:", error);
    return [];
  }
};

export const addPatient = async (
  patient: Omit<Patient, "id">,
): Promise<Patient | null> => {
  try {
    const response = await fetch(`${API_URL}/patients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patient),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding patient:", error);
    return null;
  }
};

export const deletePatient = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/patients/${id}`, {
      method: "DELETE",
    });
    return response.ok;
  } catch (error) {
    console.error("Error deleting patient:", error);
    return false;
  }
};

export const suggestDoctor = async (id: string): Promise<string> => {
  try {
    const response = await fetch(`${API_URL}/patients/${id}/suggest-doctor`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.text();
  } catch (error) {
    console.error("Error suggesting doctor:", error);
    return "Error suggesting doctor";
  }
};
