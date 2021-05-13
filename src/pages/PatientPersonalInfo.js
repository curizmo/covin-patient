import { useState } from "react";
import "../App.css";
import "./home.css";
import { GENDERS, HEIGHT } from "../constants/constants";

const PatientPersonalInfo = ({
  personalInfo,
  setIntakeState,
  intakeState,
  personalInfoError,
}) => {
  const handleInputChange = (e) => {
    const item = e.target.name;

    setIntakeState({ ...intakeState, [item]: e.target.value });
  };
  const handleCheckboxChange = (e) => {
    const item = e.target.name;
    setIntakeState({ ...intakeState, [item]: e.target.value });
  };

  console.log(intakeState)
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
                            placeholder={height === "feet" ? "Ft." : "In"}
                            onChange={handleInputChange}
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
                  onChange={handleInputChange}
                  placeholder={info.field === "weight" ? "Kg." : ""}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default PatientPersonalInfo;
