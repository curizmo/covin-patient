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

export const createPatientIntake = (payload) => {
  return postData("/patient-intake-form", payload);
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
