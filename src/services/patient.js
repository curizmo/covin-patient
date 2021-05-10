import { postData, getData } from "./fetch";

export const getPatientDetails = (hashKey) => {
  return getData(`/register-patient-intake/${hashKey}`);
};

export const createPatientIntake = (payload) => {
  return postData("/patient-intake-form", payload);
};

export const createPatientVitals = (payload) => {
  return postData("/vitals", payload);
};
