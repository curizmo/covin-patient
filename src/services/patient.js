import { postData } from "./fetch";

export const createPatientIntake = (payload) => {
  return postData("/patient-intake-form", payload);
};

export const createPatientVitals = (payload) => {
  return postData("/vitals", payload);
};
