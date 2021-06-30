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
  dailyStatus: 1,
  symptoms: 2,
  vital: 3,
  lab: 4,
  submission: 5,
};

export const EXISTING_PATIENT_VITAL_PAGES = {
  vital: 1,
  lab: 2,
  submission: 3,
};

export const HEIGHT_MEASUREMENT = {
  feet: "feet",
  inch: "inch",
};

export const DAILY_STATUS = {
  same: "same",
  better: "better",
  worse: "worse",
};

export const EMAIL_TYPE_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const NUMBER_TYPE_REGEX = /^[+-]?\d*(?:[.,]\d*)?$/;

export const NO_PRE_EXISTING_CONDITION = "noPrexistingCondition";

export const DECIMAL_REGEX = /^\d*(\.\d{0,1})?$/;

export const PHONE_REGEX = {
  content: /^(\+[1-9]{1,4}[-]?)(\(?[0-9]{2,4}\)?[-]?)*$/,
  countryCode: /^(\+[1-9]{1,4}[-]?)/,
};

export const DEFAULT_COUNTRY_CODE = "+91";

export const COUNTRY_CODE ={
  india: "+91",
  northAmerica: "+1"
}

export const MESSAGE_TYPES = {
  newPatient: "newPatient",
  dailyScreening: "dailyScreening",
  vitalsUpdate: "vitalsUpdate",
  webMeeting: "webMeeting",
};

export const MESSAGE_STATUS = {
  sent: "SENT",
  processed: "PROCESSED",
};

export const LAB_INPUT_TYPE = {
  picture: "picture",
  type: "type",
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
  mmddyyyy: "mm/dd/yyyy",
  yyyymmddhms:'YYYY-MM-DD HH:mm:ss',
};

export const ALLERGY = {
  food: "food",
  medication: "medications",
  other: "otherAllergies",
};

export const COVID_BEFORE = {
  yes: 1,
  no: 2,
};

export const BOOKING_STATUS = {
  checkedIn: 'CheckedIn',
  confirmed: 'Confirmed',
  cancelled: 'Cancelled',
  completed: 'Completed',
  inProgress: 'InProgress',
};

export const ENTER = 'Enter';
