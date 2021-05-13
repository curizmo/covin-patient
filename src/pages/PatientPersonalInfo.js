import { useState, useEffect } from "react";
import "../App.css";
import "./home.css";
import {
  GENDERS,
  HEIGHT,
  EMAIL_TYPE_REGEX,
  NUMBER_TYPE_REGEX,
} from "../constants/constants";

const PatientPersonalInfo = ({
  personalInfo,
  setIntakeState,
  intakeState,
  setPage,
  page,
}) => {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [inchHeight, setInchHeight] = useState(0);
  const [feetHeight, setFeetHeight] = useState(0);
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

  const handleValidateNumbers = (e) => {
    const item = e.target.name;
    if (e.target.value.match(NUMBER_TYPE_REGEX)) {
      handleHeightInput(e);
    }
  };

  const handleHeightInput = (e) => {
    if (e.target.id === "feet") {
      setFeetHeight(e.target.value);
    }
    if (e.target.id === "inch") {
      setInchHeight(e.target.value);
    }
  };

  useEffect(() => {
    setIntakeState({
      ...intakeState,
      height: `${feetHeight}ft ${inchHeight}in`,
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
                  onChange={handleInputChange}
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
                <>
                  <div className="height-wrapper">
                    {HEIGHT.map((height) => {
                      <label>{info.title}</label>;
                      return (
                        <>
                          <input
                            className="bp"
                            type="text"
                            name={info.field}
                            id={height}
                            placeholder={height === "feet" ? "Ft." : "In"}
                            onChange={handleValidateNumbers}
                          />
                        </>
                      );
                    })}
                  </div>
                </>
              ) : (
                <input
                  type="text"
                  id={indx}
                  name={info.field}
                  value={
                    info.field === "firstName"
                      ? intakeState.firstName
                      : info.field === "lastName"
                      ? intakeState.lastName
                      : null
                  }
                  onChange={
                    info.field === "weight"
                      ? handleValidateNumbers
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
