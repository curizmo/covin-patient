import React, { useState, useEffect } from "react";
import "../App.css";
import * as patientService from "../services/patient";
import "./home.css";

const PatientPersonalInfo = ({ personalInfo, setIntakeState, intakeState }) => {
  const handleInputChange = (e) => {
    const item = e.target.name;
    setIntakeState({ ...intakeState, [item]: e.target.value });
  };

  return (
    <div className="form-content-wrapper">
      <div className="page-title">Personal Information</div>
      <div className="health-checklist">
        {personalInfo.map((history, indx) => {
          return (
            // <div className="input-wrap">
            //   <div
            //     className={
            //       `${history.type}` === "Boolean"
            //         ? "list-content"
            //         : "input-history"
            //     }
            //     key={indx}
            //   >
            //     {history.type === "Text" && <label>{history.title}</label>}

            //     <input
            //       type="text"
            //       id={indx}
            //       name={history.field}
            //       onChange={handleInputChange}
            //     />
            //   </div>
            // </div>
            <div className="input-vitals">
              <label>{history.title}</label>
              <div className="input-wrap" key={indx}>
                <input
                  className="patient-intake-info"
                  type="text"
                  name={history.field}
                  onChange={handleInputChange}
                />
                <div className="icon">
                  {history.field === "height" ? "in feet": history.field === "weight"? "in kg" : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default PatientPersonalInfo;
