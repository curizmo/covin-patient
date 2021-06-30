import { postData, getData, putData } from "./fetch";
import config from "../config/index";

export const getPatientDetails = (hashKey) => {
  return getData(`/register-patient-intake/${hashKey}`);
};

export const getPatientSymtoms = () => {
  return getData("/symptoms-template");
};

export const getPatientIntake = (patientId) => {
  return getData(`/patient-intake-form/intake/${patientId}`);
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

export const getAppointmentDetailsByPatientId = (patientId) => {
  return getData(`/appointment/appointment-booking/${patientId}`);
};

export const fetchJWT = (patientId) => {
  return getData(`/jitsi/jwt/${patientId}`);
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

export const uploadLabResult = async(patientId, appointmentId, labResults) => {
  const formData = new FormData();
  
  formData.append("form", JSON.stringify({}));

  labResults.forEach((labResult) => {
    formData.append("labImages", labResult);
  });

  const options = {
    method: "PUT",
    body: formData,
  };
  
  const response = await fetch(
    `${config.apiURL}/patient-labs/patient-lab-files/${patientId}/appointment/${appointmentId}`,
    options
  );

  return response.json();
};

export const deleteLabResult = async(appointmentId, labResults) => {
  const options = {
    method: "PUT",
    body: labResults,
  };

  const response = await fetch(
    `${config.apiURL}/patient-labs/patient-lab-files/appointment/${appointmentId}/delete`,
    options
  );

  return response.json(); 
};

export const UpdateMessageStatus = (hashKey) => {
  return putData(`/register-patient-intake/message-status/${hashKey}`);
};

export const updateAppointmentStatus = (appointmentId, patientId) => {
  return putData(`/appointment/${appointmentId}/check-in/${patientId}`);
};

export async function uploadMedicationImages({
  intakeForm,
  medicationImages,
  patientId,
}) {
  const form = new FormData();

  form.append("form", JSON.stringify(intakeForm));

  for (let i = 0; i < medicationImages.length; i++) {
    form.append("medicationImages", medicationImages[i]);
  }

  const options = {
    method: "POST",
    body: form,
  };

  const response = await fetch(
    `${config.apiURL}/patient-intake-form/medication/${patientId}`,
    options
  );

  return response.json();
}

export async function uploadLabImages({
  intakeForm,
  labImages,
  patientId,
  messageHash,
}) {
  const form = new FormData();

  form.append("form", JSON.stringify(intakeForm));

  for (let i = 0; i < labImages.length; i++) {
    form.append("labImages", labImages[i]);
  }

  const options = {
    method: "POST",
    body: form,
  };

  const response = await fetch(
    `${config.apiURL}/patient-labs/lab/patient/${patientId}/patient-message/${messageHash}`,
    options
  );

  return response.json();
}
