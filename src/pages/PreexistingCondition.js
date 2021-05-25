import React, { useState, useEffect, useCallback } from "react";
import * as patientService from "../services/patient";
import "../App.css";
import "./home.css";

import {
  NO_PRE_EXISTING_CONDITION,
  NEW_PATIENT_PAGES,
} from "../constants/constants";
import { getRandomKey } from "../utils";

const PeexistingCondition = ({
  preexistingCondition,
  setIntakeState,
  intakeState,
  patientDetails,
  setProgressedPage,
  hash,
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

  const handleDivSelect = useCallback((item) => () => {
    const newIntakeState = item === NO_PRE_EXISTING_CONDITION && !intakeState[NO_PRE_EXISTING_CONDITION]
    ? {
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
      }
    : { ...intakeState, [NO_PRE_EXISTING_CONDITION]: false, [item]: !intakeState[item] };
    const isConditionChecked = Object.values(newIntakeState).some((s) => s);
    setConditionError(!isConditionChecked);
    setIntakeState(newIntakeState);
  }, [intakeState]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateForm = () => {
    const isAnyTrue = Object.keys(preExistingCondition).some(
      (key) => preExistingCondition[key]
    );

    setConditionError(!isAnyTrue);

    return isAnyTrue;
  };

  const onNext = async () => {
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    await Promise.all([
      patientService.createPatientIntake({
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
      }),
      patientService.createFormProgress({
        hashKey: hash,
        patientId: patientDetails.patientId,
        pagenum: NEW_PATIENT_PAGES.preExistingCondition,
      }),
    ]);

    setProgressedPage(NEW_PATIENT_PAGES.allergy);
    setPage(page + 1);
  };

  const onBackButtonClick = ()=>{
    setProgressedPage(NEW_PATIENT_PAGES.covidHistory);
  }

  return (
    <div className="form-content-wrapper">
      
      <div>Pre-existing Conditions</div>
      <div className="health-checklist no-select">
        {preexistingCondition.map((history, indx) => {
          return (
            <div
              className={
                `${history.type}` === "Boolean"
                  ? "preexisting-list-content"
                  : "input-history"
              }
              key={getRandomKey()}
              onClick={
                `${history.type}` === "Boolean"
                  ? handleDivSelect(history.field)
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
                  value={intakeState[history.field]}
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
