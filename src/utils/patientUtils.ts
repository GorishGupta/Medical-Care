
// Valid symptom categories mapped to specialties
export const symptomToSpecialty: Record<string, string> = {
  'arthritis': 'Orthopedic',
  'back pain': 'Orthopedic',
  'tissue injuries': 'Orthopedic',
  'dysmenorrhea': 'Gynecology',
  'skin infection': 'Dermatology',
  'skin burn': 'Dermatology',
  'ear pain': 'ENT',
  'eye pain': 'ENT'
};

// Validation functions
export const validateName = (name: string) => name.length >= 3;
export const validateCity = (city: string) => city.length > 0 && city.length <= 20;
export const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
export const validatePhone = (phone: string) => /^\d{10,}$/.test(phone);

// Determine specialty based on symptom
export const getSpecialtyFromSymptom = (symptomText: string): string | null => {
  const lowerSymptom = symptomText.toLowerCase();
  
  for (const [symptom, specialty] of Object.entries(symptomToSpecialty)) {
    if (lowerSymptom.includes(symptom)) {
      return specialty;
    }
  }
  return null;
};
