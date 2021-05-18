import { postData, getData, putData } from "./fetch";

export const getPatientDetails = (hashKey) => {
  return getData(`/register-patient-intake/${hashKey}`);
};

export const getPatientSymtoms = () => {
  return getData("/symptoms-template");
};

export const getPatientVitals = () => {
  return getData("/vitals-template");
};

export const getPatientHealthIntake = () => {
  return getData("/patients-intake-template");
};

export const getFormProgress = (hashKey) => {
  return getData(`/patient-intake-form/form-progress/${hashKey}`);
};

export const getPatientAgreement = (patientId) => {
  return getData(`/patient-intake-form/agreement/${patientId}`);
};

export const getSymptomsByPatientId = (patientId) => {
  return getData(`/vitals/symptoms/${patientId}`);
};

export const createPatientIntake = (payload) => {
  return postData("/patient-intake-form", payload);
};

export const createFormProgress = (payload) => {
  return postData("/patient-intake-form/form-progress", payload);
};

export const createPatientAgreement = (payload) => {
  return postData("/patient-intake-form/agreement", payload);
};

export const createPatientVitals = (payload) => {
  return postData("/vitals", payload);
};

export const UpdateMessageStatus = (hashKey) => {
  return putData(`/register-patient-intake/message-status/${hashKey}`);
};
