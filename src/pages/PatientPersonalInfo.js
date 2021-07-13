import { useState, useEffect, Fragment } from "react";
import { validate } from 'postal-codes-js';
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

import { SubmitButton } from "../components/common/SubmitButton";
import { SplittedDatePicker } from "../components/common/SplittedDatePicker";

import * as patientService from "../services/patient";
import {
  getAllCountries,
  getCitiesByCountryCodeAndStateCode,
  getStatesByCountryCode,
} from '../services/location';
import { getRandomKey } from "../utils";
import {
  GENDERS,
  EMAIL_TYPE_REGEX,
  NUMBER_TYPE_REGEX,
  PHONE_REGEX,
  HEIGHT_MEASUREMENT,
  MINIMUM_YEAR,
  PERSONAL_INFO,
  NEW_PATIENT_PAGES,
  DEFAULT_COUNTRY_CODE,
  DEFAULT_COUNTRY_PHONE_CODE,
  COUNTRY_CODE,
  COUNTRY,
} from "../constants/constants";
import "../App.css";
import "./home.css";

const useStyles = makeStyles(() => ({
  root: {
    "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
      transform: "translate(34px, 20px) scale(1);",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "none !important",
    },

    "& .MuiInput-underline:after": {
      borderBottom: "none !important",
    },

    "& .MuiInput-underline:before": {
      borderBottom: "none !important",
    },
    "& .MuiInputLabel-formControl": {
      top: "-4px !important",
      paddingLeft: "1rem !important",
      color: "#22335E !important",
    },
    "& .MuiFormControl-marginNormal": {
      marginTop: "0px !important",
    },

    "& .MuiInputLabel-shrink": {
      display: "none !important",
    },

    "& .MuiAutocomplete-inputRoot": {
      padding: "0px 1em !important",
    },

    "& .MuiSvgIcon-fontSizeSmall": {
      display: "none !important",
    },

    "& .MuiIconButton-label": {
      paddingRight: "1rem",
    },

    "& .MuiInputBase-input": {
      paddingTop: "0em !important",
      border: "none !important",
      boxShadow: "none !important",
      borderRadius: "none !important",
      marginTop: "0px !important",
    },
    "& .MuiPickersToolbar-toolbar": {
      background: "rgb(18,18,18) !important",
    },
    "& .MuiPickersDay-daySelected": {
      background: "rgb(18,18,18) !important",
    },
    "& .MuiPickersDay-daySelected:hover": {
      background: "rgb(18,18,18) !important",
    },
  },
  inputRoot: {
    color: "#22335E !important",
    fontSize: "1rem",
    paddingLeft: "1rem !important",
    fontWeight: "600 !important",
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
      paddingLeft: "1rem !important",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "green",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "red",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "purple",
    },
    "& .MuiFormControl-marginNormal": {
      marginTop: "0px !important",
    },
  },
}));

const moment = require("moment");

const PatientPersonalInfo = ({
  personalInfo,
  setIntakeState,
  intakeState,
  patientDetails,
  setProgressedPage,
  hash,
  setPage,
  page,
  phone,
}) => {
  const classes = useStyles();

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [inchHeight, setInchHeight] = useState("");
  const [feetHeight, setFeetHeight] = useState("");
  const [showDateError, setShowDateError] = useState(false);
  const [inputValueCountry, setInputValueCountry] = useState('');
  const [inputValueState, setInputValueState] = useState("");
  const [inputValueCity, setInputValueCity] = useState("");
  const [personalInfoError, setPersonalInfoError] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    height: "",
    weight: "",
  });
  const [phoneCheckMessage, setPhoneCheckMessage] = useState(false);
  const [phoneValidationError, setPhoneValidationError] = useState(false);
  const [countryCodeValidationError, setCountryCodeValidationError] =
    useState(false);
  const [phoneLengthValidationError, setPhoneLengthValidationError] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState({
    day: "",
    month: "",
    year: "",
  });
  const [countriesList, setCountriesList] = useState([]);
  const [statesList, setStatesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [postalCodeError, setPostalCodeError] = useState('');

  const getCountries = async () => {
    const countries = await getAllCountries();
    setCountriesList(countries);
  };


  const getStatesList = async (countryCode) => {
    try {
      const statesList = await getStatesByCountryCode(countryCode);
      setStatesList(statesList);
    } catch {
      setStatesList([]);
      // @toDo add error message
    }
  };

  const getCities = async (countryCode, stateCode) => {
    try {
      const cities = await getCitiesByCountryCodeAndStateCode(
        countryCode,
        stateCode,
      );
      setCitiesList(cities);
    } catch {
      setCitiesList([]);
      // @toDo add error message
    }
  };

  const initializeLocation = () => {
    getCountries();
  };

  const initializeDateOfBirth = () => {
    if (intakeState.dateOfBirth) {
      const date = new Date(intakeState.dateOfBirth);
      setDateOfBirth({
        day: `${date.getDate()}`,
        month: `${date.getMonth()}`,
        year: `${date.getFullYear()}`,
      });
    }
    window.scrollTo(0, 0);
  };

  const initializeHeight = () => {
    const heightInFeet =
      (intakeState.height &&
        intakeState.height.split(`'`)[0].replace(/[^0-9]/g, "")) ||
      "";
    const heightInInch =
      (intakeState.height &&
        intakeState.height.split(`'`)[1].replace(/[^0-9]/g, "")) ||
      "";

    if (intakeState?.state) {
      handleStateChange();
    }

    setFeetHeight(heightInFeet);
    setInchHeight(heightInInch);
  };

  useEffect(() => {
    initializeLocation();
    initializeDateOfBirth();
    initializeHeight();
  }, []);

  useEffect(() => {
    getStatesList(intakeState.countryCode || COUNTRY[DEFAULT_COUNTRY_CODE]);
    setCitiesList([]);
  }, [intakeState.countryCode]);

  useEffect(() => {
    if (!intakeState.pinCode) {
      setPostalCodeError('');
    } else {
      const validationResult = validate(intakeState.countryCode, intakeState.pinCode);
      setPostalCodeError(validationResult === true ? '' : validationResult);
    }
  }, [intakeState.countryCode, intakeState.pinCode]);

  useEffect(() => {
    const stateCode = statesList.find(s => s.name === intakeState.state)?.isoCode;
    if (intakeState.countryCode && stateCode) {
      getCities(intakeState.countryCode, stateCode);
    }
  }, [intakeState.countryCode, intakeState.state, statesList]);

  useEffect(() => {
    const year = dateOfBirth.year;
    const month = dateOfBirth.month;
    const day = dateOfBirth.day;
    if (year && month && day) {
      const dateOfBirth = new Date(
        `${year}-${month < 9 ? "0" : ""}${+month + 1}-${
          day < 10 ? "0" : ""
        }${day}`
      );
      setIntakeState((state) => ({ ...state, dateOfBirth }));
    }
    setPersonalInfoError((error) => ({
      ...error,
      dateOfBirth: false,
    }));
  }, [dateOfBirth, setIntakeState]);

  const handleAddressChange = (e) => {
    const item = e.target.name;
    setIntakeState({ ...intakeState, [item]: e.target.value });
  };

  const handlePhoneChange = (e) => {
    const item = e.target.name;
    const value = e.target.value
      .replace(/\(/g, "")
      .replace(/\)/g, "")
      .replace(/-/g, "");
    setIntakeState({
      ...intakeState,
      [item]: value === DEFAULT_COUNTRY_PHONE_CODE ? "" : value,
    });
  };

  const handleFieldChange = (e) => {
    const item = e.target.name;
    setIntakeState({ ...intakeState, [item]: e.target.value });
    setPersonalInfoError((error) => ({
      ...error,
      [item]: !e.target.value,
    }));
  };

  const handleCountryChange = (e) => {
    const countryName = e?.target?.outerText || intakeState?.country;
    const countryCode = countriesList.find(c => c.name === countryName)?.isoCode;

    setIntakeState({
      ...intakeState,
      countryCode,
      state: '',
      city: '',
    });
  };

  const handleStateChange = (e) => {
    const stateName = e?.target?.outerText || intakeState?.state;

    setIntakeState({
      ...intakeState,
      state: stateName,
      city: '',
    });
  };

  //city name not taking default
  const handleCityChange = (e) => {
    const cityName = e.target.outerText;
    setIntakeState({ ...intakeState, city: cityName });
  };

  useEffect(() => {
    setShowErrorMessage(
      intakeState.emailId
        ? !intakeState.emailId.match(EMAIL_TYPE_REGEX)?.[0]
        : false
    );
  }, [intakeState.emailId]);

  useEffect(() => {
    const phoneNumber = intakeState.secondaryContact.split(COUNTRY_CODE.US)[1];

    if (
      intakeState.secondaryContact !== "" &&
      !intakeState.secondaryContact.match(PHONE_REGEX.countryCode)
    ) {
      setCountryCodeValidationError(true);
      setPhoneLengthValidationError(false);
      setPhoneValidationError(false);
    } else if (
      intakeState.secondaryContact !== "" &&
      !intakeState.secondaryContact.match(PHONE_REGEX.content)
    ) {
      setPhoneValidationError(true);
      setPhoneLengthValidationError(false);
      setCountryCodeValidationError(false);
    } else if (
      intakeState.secondaryContact !== "" &&
      phoneNumber &&
      phoneNumber.length !== 10
    ) {
      setPhoneLengthValidationError(true);
      setCountryCodeValidationError(false);
      setPhoneValidationError(false);
    } else {
      setPhoneLengthValidationError(false);
      setCountryCodeValidationError(false);
      setPhoneValidationError(false);
    }

    setPhoneCheckMessage(intakeState.secondaryContact === phone ? true : false);
  }, [intakeState.secondaryContact]);

  const handleValidateWeight = (e) => {
    const item = e.target.name;
    if (e.target.value.match(NUMBER_TYPE_REGEX)) {
      setIntakeState({ ...intakeState, [item]: e.target.value });
      setPersonalInfoError((error) => ({
        ...error,
        [item]: !e.target.value,
      }));
    }
  };

  const handleValidateHeight = (e) => {
    let value = e.target.value;
    if (parseInt(value) < parseInt(e.target.min)) {
      value = e.target.min;
    }
    if (parseInt(value) > parseInt(e.target.max)) {
      value = e.target.max;
    }
    if (value.match(NUMBER_TYPE_REGEX)) {
      if (e.target.id === HEIGHT_MEASUREMENT.feet) {
        setFeetHeight(value);
      } else {
        setInchHeight(value);
      }
    }
  };

  useEffect(() => {
    if (feetHeight && inchHeight) {
      setIntakeState({
        ...intakeState,
        height: `${feetHeight}'${inchHeight}"`,
      });
    } else if (feetHeight && !inchHeight) {
      setIntakeState({
        ...intakeState,
        height: `${feetHeight}'`,
      });
    } else {
      setIntakeState({
        ...intakeState,
        height: "",
      });
    }
    setPersonalInfoError((error) => ({
      ...error,
      height: false,
    }));
  }, [feetHeight, inchHeight]);

  const validatePatientPersonalForm = () => {
    const personalInfoError = {
      firstName: !intakeState.firstName,
      lastName: !intakeState.lastName,
      gender: !intakeState.gender,
      dateOfBirth:
        !intakeState.dateOfBirth || isNaN(Date.parse(intakeState.dateOfBirth)),
      height: !feetHeight,
      weight: !intakeState.weight,
    };
    const isAnyTrue = Object.values(personalInfoError).some((v) => v);

    setPersonalInfoError(personalInfoError);

    return !isAnyTrue && !showErrorMessage;
  };

  const getValue = (field) => {
    switch (field) {
      case PERSONAL_INFO.firstName:
        return intakeState.firstName;
      case PERSONAL_INFO.lastName:
        return intakeState.lastName;
      case PERSONAL_INFO.weight:
        return intakeState.weight;
      default:
        return null;
    }
  };

  const onNext = async () => {
    setIsLoading(true);
    const isValid = validatePatientPersonalForm();

    if (!isValid) {
      window.scrollTo(0, 0);
      setIsLoading(false);
      return;
    }
    if (
      phoneValidationError ||
      phoneCheckMessage ||
      countryCodeValidationError ||
      phoneLengthValidationError
    ) {
      window.scrollTo(0, 0);
      setIsLoading(false);
      return;
    }

    const currentYear = parseInt(moment().year());
    const minimumYear = currentYear - MINIMUM_YEAR;
    const dateOfBirth = parseInt(moment(intakeState.dateOfBirth).year());
    if (dateOfBirth > currentYear || dateOfBirth < minimumYear) {
      setIsLoading(false);
      return;
    }

    await Promise.all([
      patientService.createPatientIntake({
        form: {
          ...intakeState,
          firstName: intakeState.firstName,
          lastName: intakeState.lastName,
          gender: intakeState.gender,
          dateOfBirth: intakeState.dateOfBirth,
          height: intakeState.height,
          weight: intakeState.weight,
          emailId: intakeState.emailId,
        },
        patientId: patientDetails.patientId,
      }),
      patientService.createFormProgress({
        hashKey: hash,
        patientId: patientDetails.patientId,
        pagenum: NEW_PATIENT_PAGES.patientInfo,
      }),
    ]);

    setProgressedPage(NEW_PATIENT_PAGES.covidHistory);
    setIsLoading(false);
    setPage(page + 1);
  };

  return (
    <div className="form-content-wrapper">
      <div className="page-title">Personal Information</div>

      <div className="health-checklist">
        <div className="input-history">
          <label className="label-header" htmlFor={"secondaryContact"}>
            Secondary Contact (Mobile)
          </label>
          <input
            type="text"
            name="secondaryContact"
            inputMode="tel"
            defaultValue={intakeState.secondaryContact || DEFAULT_COUNTRY_PHONE_CODE}
            onBlur={handlePhoneChange}
          />
          {phoneCheckMessage && (
            <span className="error-message">
              Secondary and primary number cannot be the same
            </span>
          )}
          {phoneValidationError && (
            <span className="error-message">
              Mobile Number Invalid: Only numbers, dashes and brackets accepted.
            </span>
          )}
          {countryCodeValidationError && (
            <span className="error-message">
              Country Code is required, example: {COUNTRY_CODE.US}
            </span>
          )}
          {phoneLengthValidationError && (
            <span className="error-message">
              Mobile Numbers must have 10 digits
            </span>
          )}
        </div>
        {personalInfo.map((info, indx) => {
          return (
            <div
              className={
                `${info.type}` === "Boolean" ? "list-content" : "input-history"
              }
              key={info.field}
            >
              {personalInfoError[`${info.field}`] ? (
                <label>
                  {info.title}{" "}
                  {`${info.field}` !== "emailId" && (
                    <span className="error-message">
                      (This field is required)
                    </span>
                  )}
                </label>
              ) : `${info.field}` === "emailId" && showErrorMessage ? (
                <label>
                  {info.title}{" "}
                  <span className="error-message">Invalid Email</span>
                </label>
              ) : `${info.field}` === PERSONAL_INFO.dob && showDateError ? (
                <label>
                  {info.title}{" "}
                  <span className="error-message">
                    Selected year cannot be greater than {moment().year()}
                  </span>
                </label>
              ) : (
                <label>{info.title}</label>
              )}

              {info.type === "Boolean" ? (
                GENDERS.map((gender) => {
                  return (
                    <Fragment key={getRandomKey()}>
                      <span className="gender-radio-span">
                        <input
                          className="gender-radio"
                          type="radio"
                          name={info.field}
                          defaultValue={gender}
                          onChange={handleFieldChange}
                          checked={intakeState.gender === gender}
                        />
                        <label className="gender-radio-label">{gender}</label>
                      </span>
                    </Fragment>
                  );
                })
              ) : info.type === "DateType" ? (
                <div>
                  <SplittedDatePicker
                    date={dateOfBirth}
                    setDate={setDateOfBirth}
                  />
                </div>
              ) : info.field === "emailId" ? (
                <input
                  type="email"
                  id={indx}
                  name={info.field}
                  onBlur={handleFieldChange}
                  defaultValue={intakeState.emailId}
                />
              ) : info.field === "height" ? (
                <div className="height-wrapper">
                  <label className="height-label" htmlFor={"feet"}>
                    ft
                  </label>
                  <input
                    className="bp"
                    type="number"
                    pattern="\d*"
                    name={info.field}
                    id={"feet"}
                    max={"7"}
                    defaultValue={feetHeight}
                    onBlur={handleValidateHeight}
                  />
                  <label className="height-label" htmlFor={"inch"}>
                    in
                  </label>
                  <input
                    className="bp"
                    type="number"
                    pattern="\d*"
                    name={info.field}
                    id={"inch"}
                    max={"11"}
                    defaultValue={inchHeight}
                    onBlur={handleValidateHeight}
                  />
                </div>
              ) : (
                <div className="weight-wrapper">
                  <input
                    type="text"
                    inputMode={
                      info.field === PERSONAL_INFO.weight ? "decimal" : ""
                    }
                    pattern={info.field === PERSONAL_INFO.weight ? "\\d*" : ""}
                    className="bp"
                    id={indx}
                    name={info.field}
                    defaultValue={getValue(info.field)}
                    onBlur={
                      info.field === PERSONAL_INFO.weight
                        ? handleValidateWeight
                        : handleFieldChange
                    }
                  />
                  {info.field === PERSONAL_INFO.weight && (
                    <label className="weight-label" htmlFor={"weight"}>
                      Kg.
                    </label>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="address-wrap">
        <div className="address">
          <label className="label-header" htmlFor={"address"}>
            Address
          </label>
          <input
            type="text"
            name="address"
            className="address-input"
            defaultValue={intakeState.address}
            onBlur={handleAddressChange}
          />
        </div>
        <div className="state">
          <label className="label-header" htmlFor={"country"}>
            Country
          </label>
          <div className="dropdown-selections">
            <Autocomplete
              id="country-drop"
              shrink={"false"}
              classes={classes}
              name="country"
              value={intakeState.country || COUNTRY[DEFAULT_COUNTRY_CODE]}
              onChange={handleCountryChange}
              inputValue={inputValueCountry}
              onInputChange={(_, newInputValue) => {
                setInputValueCountry(newInputValue);
              }}
              options={countriesList.map((item) => item.name)}
              style={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="Select country" />
              )}
            />
          </div>
        </div>
        <div className="state">
          <label className="label-header" htmlFor={"state"}>
            State
          </label>
          <div className="dropdown-selections">
            <Autocomplete
              id="state-drop"
              shrink={"false"}
              classes={classes}
              name="state"
              value={intakeState.state}
              onChange={handleStateChange}
              inputValue={inputValueState}
              onInputChange={(_, newInputValue) => {
                setInputValueState(newInputValue);
              }}
              options={statesList.map((item) => item.name)}
              style={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="Select State" />
              )}
            />
          </div>
        </div>
        <div className="city">
          <label className="label-header" htmlFor={"city"}>
            City
          </label>
          <div className="dropdown-selections">
            <Autocomplete
              id="city-drop"
              classes={classes}
              value={intakeState.city}
              onChange={handleCityChange}
              inputValue={inputValueCity}
              onInputChange={(_, newInputValue) => {
                setInputValueCity(newInputValue);
              }}
              options={citiesList?.map((item) => item.name)}
              disabled={intakeState?.state ? false : true}
              name="city"
              className="city-drop"
              renderInput={(params) => (
                <TextField {...params} label="Select City" />
              )}
            />
          </div>
        </div>
        <div className="pinCode">
          <label className="label-header" htmlFor={"pincode"}>
            Postal Code
          </label>
          <input
            type="number"
            pattern="\d*"
            name="pinCode"
            className="pin-input"
            defaultValue={intakeState.pinCode}
            onBlur={handleAddressChange}
          />
          <p className="pin-error">{postalCodeError}</p>
        </div>
      </div>
      <SubmitButton onClick={onNext} isLoading={isLoading} />
    </div>
  );
};
export default PatientPersonalInfo;
