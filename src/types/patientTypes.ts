
export type Patient = {
  id: string;
  name: string;
  city: string;
  email: string;
  phone: string;
  symptoms: string;
  suggestedDoctor?: string;
};

export type Doctor = {
  id: string;
  name: string;
  city: string;
  specialty: string;
};

export type PatientFormErrors = {
  name: string;
  city: string;
  email: string;
  phone: string;
  symptoms: string;
};
