import React, { useState, useEffect } from "react";
import "../App.css";
import * as patientService from "../services/patient";
import "./home.css";

const SocialHistory = ({ socialHistory, setIntakeState, intakeState }) => {
  const handleInputChange = (e) => {
    const item = e.target.name;
    setIntakeState({ ...intakeState, [item]: e.target.value });
  };

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    const item = event.target.value;
    item == "none"
      ? setIntakeState({ ...intakeState, [item]: !isChecked })
      : setIntakeState({ ...intakeState, [item]: isChecked });
  };

  return (
    <div className="form-content-wrapper">
      <div className="page-title">Social History</div>
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
    </div>
  );
};

export default SocialHistory;
