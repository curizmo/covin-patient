import React, { useState, useEffect } from "react";
import * as patientService from "../services/patient";
import "../App.css";
import "./home.css";

import { PRE_EXISTING_CONDITION } from "../constants/constants";

const PeexistingCondition = ({
  preexistingCondition,
  setIntakeState,
  intakeState,
  patientDetails,
  setPage,
  page,
}) => {
  const [conditionError, setConditionError] = useState(false);
  const [isConditionChecked, setIsConditionChecked] = useState(false);
  const preExistingCondition = {
    heartDisease: intakeState.heartDisease,
    cancer: intakeState.cancer,
    highOrLowBloodPressure: intakeState.highOrLowBloodPressure,
    diabetes: intakeState.diabetes,
    asthma: intakeState.asthma,
    stroke: intakeState.stroke,
    highCholesterol: intakeState.highCholesterol,
    rash: intakeState.rash,
    headacheOrMigrain: intakeState.headacheOrMigrain,
    depression: intakeState.depression,
    noPrexistingCondition: intakeState.noPrexistingCondition,
  };

  const handleInputChange = (e) => {
    const item = e.target.name;
    setIntakeState({ ...intakeState, [item]: e.target.value });
  };

  const handleDivSelect = (field) => {
    setIsConditionChecked(!isConditionChecked);
    handleOnConditionClick(field);
  };

  const handleOnConditionClick = (item) => {
    if (isConditionChecked) {
      setIsConditionChecked(false);
    }
    if (isConditionChecked) {
      setConditionError(false);
    }

    if (item === PRE_EXISTING_CONDITION) {
      setIntakeState({
        ...intakeState,
        heartDisease: false,
        cancer: false,
        highOrLowBloodPressure: false,
        diabetes: false,
        asthma: false,
        stroke: false,
        highCholesterol: false,
        rash: false,
        headacheOrMigrain: false,
        depression: false,
        noPrexistingCondition: true,
      });
    } else {
      setIntakeState({
        ...intakeState,
        [item]: isConditionChecked,
        noPrexistingCondition: false,
      });
    }
  };

  const validateForm = () => {
    const isAnyTrue = Object.keys(preExistingCondition).some(
      (key) => preExistingCondition[key]
    );

    setConditionError(!isAnyTrue);

    return isAnyTrue;
  };

  const onNext = async() => {
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    await patientService.createPatientIntake({
      form: {
        ...intakeState,
        heartDisease: intakeState.heartDisease,
        cancer: intakeState.cancer,
        highOrLowBloodPressure: intakeState.highOrLowBloodPressure,
        diabetes: intakeState.diabetes,
        asthma: intakeState.asthma,
        stroke: intakeState.stroke,
        highCholesterol: intakeState.highCholesterol,
        rash: intakeState.rash,
        headacheOrMigrain: intakeState.headacheOrMigrain,
        depression: intakeState.depression,
        others: intakeState.others,
        noPrexistingCondition: intakeState.noPrexistingCondition,
      },
      patientId: patientDetails.patientId,
    });

    setPage(page + 1);
  };

  return (
    <div className="form-content-wrapper">
      <div>Pre-existing Conditions</div>
      <div className="health-checklist">
        {preexistingCondition.map((history, indx) => {
          return (
            <div
              className={
                `${history.type}` === "Boolean"
                  ? "preexisting-list-content"
                  : "input-history"
              }
              key={indx}
              onClick={
                `${history.type}` === "Boolean"
                  ? () => handleDivSelect(history.field)
                  : null
              }
            >
              {history.type === "Text" && <label>{history.title}</label>}
              {history.type === "Boolean" ? (
                <input
                  className="symptoms-checkbox"
                  type="checkbox"
                  id={indx}
                  name={history.field}
                  checked={intakeState[history.field]}
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
      {conditionError ? (
        <span className="error-message">
          At least one field must be selected
        </span>
      ) : null}
      <button className="submit-button submit-btn" onClick={onNext}>
        NEXT
      </button>
    </div>
  );
};

export default PeexistingCondition;
