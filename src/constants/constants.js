export const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const GENDERS = ["male", "female", "others"];

export const HEIGHT = ["feet", "inch"];

export const NEW_PATIENT_PAGES = {
  patientInfo: 1,
  covidHistory: 2,
  preExistingCondition: 3,
  allergy: 4,
  medication: 5,
  symptoms: 6,
  vitals: 7,
  submission: 8,
};

export const EXISTING_PATIENT_PAGES = {
  symptoms: 1,
  vital: 2,
  submission: 3,
};

export const EXISTING_PATIENT_VITAL_PAGES = {
  vital: 1,
  submission: 2,
};

export const HEIGHT_MEASUREMENT = {
  feet: "feet",
  inch: "inch",
};

export const EMAIL_TYPE_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const NUMBER_TYPE_REGEX = /^[+-]?\d*(?:[.,]\d*)?$/;

export const NO_PRE_EXISTING_CONDITION = "noPrexistingCondition";

export const MESSAGE_TYPES = {
  newPatient: "newPatient",
  dailyScreening: "dailyScreening",
  vitalsUpdate: "vitalsUpdate",
};

export const MINIMUM_YEAR = 150;

export const PERSONAL_INFO = {
  firstName: "firstName",
  lastName: "lastName",
  gender: "gender",
  dob: "dateOfBirth",
  weight: "weight",
  height: "height",
  email: "emailId",
};

export const DATE_FORMAT = {
  yyyymmdd: "YYYY-MM-DD",
};

export const ALLERGY = {
  food: "food",
  medication: "medications",
};

export const COVID_BEFORE = {
  yes: 1,
  no: 2,
};
