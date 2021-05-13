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

export const HEIGHT = ["feet", "inch"]

export const NEW_PATIENT_PAGES = {
  patientInfo: 1,
  covidHistory: 2,
  preExistingCondition: 3,
  allergy: 4,
  medication: 5,
  symptoms: 6,
  vital: 7,
  submission: 8,
};

export const EXISTING_PATIENT_PAGES = {
  symptoms: 1,
  vital: 2,
  submission: 3,
};

export const EMAIL_TYPE_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const PHONE_TYPE_REGEX = /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})/;