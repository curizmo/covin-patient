import { useState, useEffect } from "react";
import "../App.css";
import "./home.css";
import * as patientService from "../services/patient";
import csc from "country-state-city";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import {
  GENDERS,
  EMAIL_TYPE_REGEX,
  NUMBER_TYPE_REGEX,
  HEIGHT_MEASUREMENT,
  MINIMUM_YEAR,
  PERSONAL_INFO,
  DATE_FORMAT,
  NEW_PATIENT_PAGES,
} from "../constants/constants";

const moment = require("moment");

const states = csc.getStatesOfCountry("IN");
const stateList = [];
for (let i in states) {
  let state = {
    key : states[i].isoCode,
    text : states[i].name,
    value : states[i].name,
  }
  stateList.push(state);
}



const PatientPersonalInfo = ({
  personalInfo,
  setIntakeState,
  intakeState,
  patientDetails,
  progressedPage,
  setProgressedPage,
  hash,
  setPage,
  stateKey,
  page,
}) => {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [inchHeight, setInchHeight] = useState(0);
  const [feetHeight, setFeetHeight] = useState(0);
  const [showDateError, setShowDateError] = useState(false);
  const [birthDate, setBirthDate] = useState("1990-01-01");
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [cityArray, setCityArray] = useState();
  const [cityDisabled, setCityDisable] = useState(true);
  const [personalInfoError, setPersonalInfoError] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    height: "",
    weight: "",
    emailId: "",
  });

  useEffect(() => {
    const heightInFeet =
      (intakeState.height &&
        intakeState.height.split(`'`)[0].replace(/[^0-9]/g, "")) ||
      0;
    const heightInInch =
      (intakeState.height &&
        intakeState.height.split(`'`)[1].replace(/[^0-9]/g, "")) ||
      0;
    const dob =
      (intakeState.dateOfBirth &&
        moment(intakeState.dateOfBirth).format(DATE_FORMAT.yyyymmdd)) ||
      "1990-01-01";

    setFeetHeight(heightInFeet);
    setInchHeight(heightInInch);
    setBirthDate(dob);
  }, []);

  const handleInputChange = (e) => {
    const item = e.target.name;
    setIntakeState({ ...intakeState, [item]: e.target.value });
  };

  const handleDateChange = (e) => {
    const item = e.target.name;
    const year = moment(e.target.value).year();
    const currentYear = moment().year();
    if (year <= currentYear) {
      setIntakeState({
        ...intakeState,
        [item]: moment(e.target.value).format(),
      });
      setShowDateError(false);
    } else {
      setIntakeState({
        ...intakeState,
        [item]: moment(e.target.value).format(),
      });
      setShowDateError(true);
    }
  };

  const handleCheckboxChange = (e) => {
    const item = e.target.name;
    setIntakeState({ ...intakeState, [item]: e.target.value });
  };

  const handleEmailChange = (e) => {
    const item = e.target.name;
    setIntakeState({ ...intakeState, [item]: e.target.value });
  };

  const cityList = [];
  
  const handleStateChange = (e) => {
    const stateName = e.target.outerText;
    setState(stateName);
    for(let i in stateList){
      
      if(stateList[i].text === stateName){
        console.log(stateList[i])
        stateKey = stateList[i].key
      }
    }
    console.log(stateKey)
    
    const cities = csc.getCitiesOfState('IN',stateKey);
    for( let i in cities){
      let city = {
        key : cities[i].isoCode,
        text : cities[i].name,
        value : cities[i].name,
      }
      cityList.push(city);
    }
    setCityArray((cityList))
    console.log(cityList)
    setCityDisable(false);
  };




  const handleCityChange = (e) => {
    const cityName = e.target.outerText;
    setCity(cityName);
  }


  useEffect(() => {
    if (intakeState.emailId.match(EMAIL_TYPE_REGEX)) {
      setShowErrorMessage(false);
    } else {
      setShowErrorMessage(true);
    }
  }, [intakeState.emailId]);

  const handleValidateWeight = (e) => {
    const item = e.target.name;
    if (e.target.value.match(NUMBER_TYPE_REGEX)) {
      setIntakeState({ ...intakeState, [item]: e.target.value });
    }
  };

  const handleValidateHeight = (e) => {
    const value = e.target.value;
    if (value.match(NUMBER_TYPE_REGEX)) {
      if (e.target.id === HEIGHT_MEASUREMENT.feet) {
        setFeetHeight(value);
      } else {
        setInchHeight(value);
      }
    }
  };

  const handleAddressChange = (e) => {
    const item = e.target.value;
  };

  const handlePinCodeChange = (e) => {
    const item = e.target.value
  }

  useEffect(() => {
    setIntakeState({
      ...intakeState,
      height: `${feetHeight}'${inchHeight}"`,
    });
  }, [feetHeight, inchHeight]);

  const validatePatientPersonalForm = () => {
    const PaitientInfoError = {
      firstName: !intakeState.firstName,
      lastName: !intakeState.lastName,
      gender: !intakeState.gender,
      dateOfBirth: !intakeState.dateOfBirth,
      height: !intakeState.height,
      weight: !intakeState.weight,
      emailId: !intakeState.emailId,
    };
    const isAnyTrue = Object.keys(PaitientInfoError)
      .map((key) => PaitientInfoError[key])
      .some((v) => v === true);

    setPersonalInfoError(PaitientInfoError);

    return !isAnyTrue;
  };

  const getValue = (field) => {
    switch (field) {
      case PERSONAL_INFO.firstName:
        return intakeState.firstName;
        break;
      case PERSONAL_INFO.lastName:
        return intakeState.lastName;
        break;
      case PERSONAL_INFO.weight:
        return intakeState.weight;
        break;
      default:
        return null;
    }
  };

  const onNext = async () => {
    const isValid = validatePatientPersonalForm();
    if (!isValid) {
      return;
    }

    if (!intakeState.emailId.match(EMAIL_TYPE_REGEX)) {
      return;
    }

    const currentYear = parseInt(moment().year());
    const minimumYear = currentYear - MINIMUM_YEAR;
    const dateOfBirth = parseInt(moment(intakeState.dateOfBirth).year());
    if (dateOfBirth > currentYear || dateOfBirth < minimumYear) {
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
              key={indx}
            >
              {personalInfoError[`${info.field}`] ? (
                <label>
                  {info.title}{" "}
                  <span className="error-message">
                    (This field is required)
                  </span>
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
                    <>
                      <span className="gender-radio-span">
                        <input
                          className="gender-radio"
                          type="radio"
                          name={info.field}
                          value={gender}
                          onChange={handleCheckboxChange}
                          checked={intakeState.gender === gender}
                        />
                        <label className="gender-radio-label">{gender}</label>
                      </span>
                    </>
                  );
                })
              ) : info.type === "DateType" ? (
                <input
                  type="date"
                  id={indx}
                  className="date-state"
                  name={info.field}
                  onChange={handleDateChange}
                  placeholder="dd-mon-yyyy"
                  max={moment()
                    .subtract(1, "days")
                    .format(DATE_FORMAT.yyyymmdd)}
                  value={birthDate}
                />
              ) : info.field === "emailId" ? (
                <input
                  type="email"
                  id={indx}
                  name={info.field}
                  onChange={handleEmailChange}
                  value={intakeState.emailId}
                />
              ) : info.field === "height" ? (
                <div className="height-wrapper">
                  <label className="height-label" for={"feet"}>
                    ft
                  </label>
                  <input
                    className="bp"
                    type="number"
                    name={info.field}
                    id={"feet"}
                    value={feetHeight}
                    onChange={handleValidateHeight}
                  />
                  <label className="height-label" for={"inch"}>
                    in
                  </label>
                  <input
                    className="bp"
                    type="number"
                    name={info.field}
                    id={"inch"}
                    value={inchHeight}
                    onChange={handleValidateHeight}
                  />
                </div>
              ) : (
                <div className="weight-wrapper">
                  <input
                    type={
                      info.field === PERSONAL_INFO.weight ? "number" : "text"
                    }
                    className="bp"
                    id={indx}
                    name={info.field}
                    value={getValue(info.field)}
                    onChange={
                      info.field === PERSONAL_INFO.weight
                        ? handleValidateWeight
                        : handleInputChange
                    }
                    placeholder={
                      info.field === PERSONAL_INFO.weight ? "Kg." : ""
                    }
                  />
                  {info.field === PERSONAL_INFO.weight && (
                    <label className="weight-label" for={"weight"}>
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
          <label className="address-label" for={"address"}>
            Address
          </label>
          <input
            type="text"
            className="address-input"
            onChange={handleAddressChange}
          />
        </div>
        <div className="state">
          <label className="state-label" for={"state"}>
            State
          </label>
          <Autocomplete
            id="combo-box-demo"
            options={stateList}
            getOptionLabel={(option) => option.value}
            onChange={handleStateChange}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
          />
        </div>
        <div className="city">
          <label className="city-label" for={"city"}>
            City
          </label>
          <Autocomplete
            id="city-drop"
            options={cityArray}
            disabled={cityDisabled}
            className="city-drop"
            getOptionLabel={(option) => option.value}
            style={{ width: 327 }}
            renderInput={(params) => (
              <TextField {...params}  variant="outlined" />
            )}
          />
        </div>
        <div className="pinCode">
          <label className="pincode-label" for={"pincode"}>
            PIN Code
          </label>
          <input 
            type="number"
            className="pin-input"
            onChange={handlePinCodeChange}
          />
        </div>
      </div>
      <button className="submit-button submit-btn" onClick={onNext}>
        NEXT
      </button>
    </div>
  );
};
export default PatientPersonalInfo;
