import { Doctor } from "@/types/patientTypes";

const API_URL = "http://localhost:8081/api";

export const fetchDoctors = async (): Promise<Doctor[]> => {
  try {
    const response = await fetch(`${API_URL}/doctors`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
};

export const addDoctor = async (
  doctor: Omit<Doctor, "id">,
): Promise<Doctor | null> => {
  try {
    const response = await fetch(`${API_URL}/doctors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doctor),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding doctor:", error);
    return null;
  }
};

export const deleteDoctor = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/doctors/${id}`, {
      method: "DELETE",
    });
    return response.ok;
  } catch (error) {
    console.error("Error deleting doctor:", error);
    return false;
  }
};
