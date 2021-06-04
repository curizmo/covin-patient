import { useState, useEffect, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

import { SubmitButton } from "../components/common/SubmitButton";
import { SplittedDatePicker } from "../components/common/SplittedDatePicker";

import csc from "../third-party/country-state-city";
import * as patientService from "../services/patient";
import { getRandomKey } from "../utils";
import {
  GENDERS,
  EMAIL_TYPE_REGEX,
  NUMBER_TYPE_REGEX,
  HEIGHT_MEASUREMENT,
  MINIMUM_YEAR,
  PERSONAL_INFO,
  NEW_PATIENT_PAGES,
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
const states = csc.getStatesOfCountry("IN");
const stateList = [];

for (let i in states) {
  let state = {
    key: states[i].isoCode,
    text: states[i].name,
    value: states[i].name,
  };
  stateList.push(state);
}

const PatientPersonalInfo = ({
  personalInfo,
  setIntakeState,
  intakeState,
  patientDetails,
  setProgressedPage,
  hash,
  setPage,
  stateKey,
  page,
}) => {
  const classes = useStyles();

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [inchHeight, setInchHeight] = useState("");
  const [feetHeight, setFeetHeight] = useState("");
  const [showDateError, setShowDateError] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputValueCity, setInputValueCity] = useState("");
  const [cityArray, setCityArray] = useState([]);
  const [personalInfoError, setPersonalInfoError] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    height: "",
    weight: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState({
    day: '',
    month: '',
    year: '',
  });

  useEffect(() => {
    if (intakeState.dateOfBirth) {
      const date = new Date(intakeState.dateOfBirth);
      setDateOfBirth({ 
        day: `${date.getDate()}`,
        month: `${date.getMonth()}`,
        year: `${date.getFullYear()}`
      });
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const year = dateOfBirth.year;
    const month = dateOfBirth.month;
    const day = dateOfBirth.day;
    if (year && month && day) {
      const dateOfBirth = new Date(`${year}-${month < 9 ? '0' : ''}${+month + 1}-${day < 10 ? '0' : ''}${day}`);
      setIntakeState(state => ({ ...state, dateOfBirth }));
    }
    setPersonalInfoError(error => ({
      ...error,
      dateOfBirth: false
    })); 
 }, [dateOfBirth, setIntakeState]);

  useEffect(() => {
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
  }, []);

  const handleAddressChange = (e) => {
    const item = e.target.name;
    setIntakeState({ ...intakeState, [item]: e.target.value });
  };

  const handleFieldChange = (e) => {
    const item = e.target.name;
    setIntakeState({ ...intakeState, [item]: e.target.value });
    setPersonalInfoError(error => ({
      ...error,
      [item]: !e.target.value
    }));
  };

  const cityList = [];

  const handleStateChange = (e) => {
    const stateName = e?.target?.outerText || intakeState?.state;
    for (let i in stateList) {
      if (stateList[i].text === stateName) {
        stateKey = stateList[i].key;
      }
    }

    const cities = csc.getCitiesOfState("IN", stateKey);
    for (let i in cities) {
      let city = {
        key: i,
        text: cities[i].name,
        value: cities[i].name,
      };
      cityList.push(city);
    }

    setIntakeState({
      ...intakeState,
      state: stateName,
      city: "",
    });
    setCityArray(cityList);
  };

  //city name not taking default
  const handleCityChange = (e) => {
    const cityName = e.target.outerText;
    setIntakeState({ ...intakeState, city: cityName });
  };

  useEffect(() => {
    setShowErrorMessage(intakeState.emailId ? !intakeState.emailId.match(EMAIL_TYPE_REGEX)?.[0] : false);
  }, [intakeState.emailId]);

  const handleValidateWeight = (e) => {
    const item = e.target.name;
    if (e.target.value.match(NUMBER_TYPE_REGEX)) {
      setIntakeState({ ...intakeState, [item]: e.target.value });
      setPersonalInfoError(error => ({
        ...error,
        [item]: !e.target.value
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
    setPersonalInfoError(error => ({
      ...error,
      height: false
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
    const isAnyTrue = Object.values(personalInfoError)
      .some((v) => v);

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
                  {`${info.field}` !== "emailId" && <span className="error-message">
                    (This field is required)
                  </span>}
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
                  <SplittedDatePicker date={dateOfBirth} setDate={setDateOfBirth} />
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
          <label className="label-header" htmlFor={"state"}>
            State
          </label>
          <div className="dropdown-selections">
            <Autocomplete
              id="state-drop"
              shrink={'false'}
              classes={classes}
              name="state"
              value={intakeState.state}
              onChange={handleStateChange}
              inputValue={inputValue}
              onInputChange={(_, newInputValue) => {
                setInputValue(newInputValue);
              }}
              options={stateList.map((item) => item.value)}
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
              options={cityArray?.map((item) => item.value)}
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
        </div>
      </div>
      <SubmitButton onClick={onNext} isLoading={isLoading} />
    </div>
  );
};
export default PatientPersonalInfo;
