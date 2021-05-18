import React, { useState, useEffect } from "react";
import * as patientService from "../services/patient";
import { NEW_PATIENT_PAGES } from "../constants/constants";
import "../App.css";
import "./home.css";

const SocialHistory = ({
  socialHistory,
  setIntakeState,
  intakeState,
  patientDetails,
  progressedPage,
  setProgressedPage,
  hash,
  setPage,
  page,
}) => {
  const handleInputChange = (e) => {
    const item = e.target.name;
    setIntakeState({ ...intakeState, [item]: e.target.value });
  };

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    const item = event.target.value;
    item === "none"
      ? setIntakeState({ ...intakeState, [item]: !isChecked })
      : setIntakeState({ ...intakeState, [item]: isChecked });
  };

  const onNext = async () => {
    await Promise.all([
      patientService.createPatientIntake({
        form: {
          ...intakeState,
          food: intakeState.food,
          medications: intakeState.medications,
          otherAllergies: intakeState.otherAllergies,
        },
        patientId: patientDetails.patientId,
      }),
      patientService.createFormProgress({
        hashKey: hash,
        patientId: patientDetails.patientId,
        pagenum: NEW_PATIENT_PAGES.allergy,
      }),
    ]);

    setProgressedPage(NEW_PATIENT_PAGES.medication);
    setPage(page + 1);
  };

  return (
    <div className="form-content-wrapper">
      <div className="page-title">Allergy</div>
      <div className="health-checklist">
        {socialHistory.map((history, indx) => {
          return (
            <div
              className={
                `${history.type}` === "Boolean"
                  ? "list-content"
                  : "input-history"
              }
              key={indx}
            >
              {history.type === "Text" && <label>{history.title}</label>}
              {history.type === "Boolean" ? (
                <input
                  className="symptoms-checkbox"
                  type="checkbox"
                  id={indx}
                  value={history.field}
                  onChange={handleCheckboxChange}
                />
              ) : (
                <input
                  type="text"
                  id={indx}
                  name={history.field}
                  onChange={handleInputChange}
                />
              )}
              {history.type === "Boolean" && <label>{history.title}</label>}
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

export default SocialHistory;
