import { getData, postData } from "./fetch";

export const createPatient = (payload) => {
  return postData("/create-patient", payload);
};
