import { useState, useEffect } from "react";
import "../App.css";
import "./home.css";
import {
  GENDERS,
  HEIGHT,
  EMAIL_TYPE_REGEX,
  NUMBER_TYPE_REGEX,
  HEIGHT_MEASUREMENT,
} from "../constants/constants";
const moment = require("moment");

const PatientPersonalInfo = ({
  personalInfo,
  setIntakeState,
  intakeState,
  setPage,
  page,
}) => {
  const heightInFeet =
    (intakeState.height &&
      intakeState.height.split(`'`)[0].replace(/[^0-9]/g, "")) ||
    0;
  const heightInInch =
    (intakeState.height &&
      intakeState.height.split(`'`)[1].replace(/[^0-9]/g, "")) ||
    0;

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [inchHeight, setInchHeight] = useState(heightInInch);
  const [feetHeight, setFeetHeight] = useState(heightInFeet);
  const [personalInfoError, setPersonalInfoError] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    height: "",
    weight: "",
    emailId: "",
  });

  const handleInputChange = (e) => {
    const item = e.target.name;
    setIntakeState({ ...intakeState, [item]: e.target.value });
  };

  const handleDateChange = (e) => {
    const item = e.target.name;
    setIntakeState({ ...intakeState, [item]: moment(e.target.value).format() });
  };

  const handleCheckboxChange = (e) => {
    const item = e.target.name;
    setIntakeState({ ...intakeState, [item]: e.target.value });
  };

  const handleEmailChange = (e) => {
    const item = e.target.name;
    setIntakeState({ ...intakeState, [item]: e.target.value });
  };

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

  const onNext = () => {
    const isValid = validatePatientPersonalForm();
    if (!isValid) {
      return;
    }

    if (!intakeState.emailId.match(EMAIL_TYPE_REGEX)) {
      return;
    }

    setPage(page + 1);
  };

  console.log(intakeState);

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
              ) : (
                <label>{info.title}</label>
              )}

              {info.type === "Boolean" ? (
                GENDERS.map((gender, index) => {
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
                  name={info.field}
                  onChange={handleDateChange}
                  placeholder="dd-mon-yyyy"
                  value={moment(intakeState.dateOfBirth).format("YYYY-MM-DD")}
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
                <input
                  type={info.field === "weight" ? "number" : "text"}
                  id={indx}
                  name={info.field}
                  value={
                    info.field === "firstName"
                      ? intakeState.firstName
                      : info.field === "lastName"
                      ? intakeState.lastName
                      : info.field === "weight"
                      ? intakeState.weight
                      : null
                  }
                  onChange={
                    info.field === "weight"
                      ? handleValidateWeight
                      : handleInputChange
                  }
                  placeholder={info.field === "weight" ? "Kg." : ""}
                />
              )}
            </div>
          );
        })}
      </div>
      <button className="submit-button submit-btn" onClick={onNext}>
        NEXT
      </button>
    </div>
  );
};
export default PatientPersonalInfo;
