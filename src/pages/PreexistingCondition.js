import React, { useState, useEffect } from "react";
import "../App.css";
import "./home.css";

const PeexistingCondition = ({
  preexistingCondition,
  setIntakeState,
  intakeState,
  setPage,
  page,
}) => {
  const [conditionError, setConditionError] = useState(false);
  const [preExistingCondition, setPreExistingCondition] = useState({
    heartDisease: intakeState.heartDisease,
    cancer: intakeState.cancer,
    highOrLowBloodPressure: intakeState.highOrLowBloodPressure,
    diabetes: intakeState.diabetes,
    asthma: intakeState.asthma,
    stroke: intakeState.stroke,
    highCholesterol: intakeState.highCholesterol,
    rash: intakeState.rash,
    headacheOrmigrain: intakeState.headacheOrmigrain,
    depression: intakeState.depression,
    noPrexistingCondition: intakeState.noPrexistingCondition,
  });

  const handleInputChange = (e) => {
    const item = e.target.name;
    setIntakeState({ ...intakeState, [item]: e.target.value });
  };

  console.log();

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    const item = event.target.value;
    item === "none"
      ? setIntakeState({ ...intakeState, [item]: !isChecked })
      : setIntakeState({ ...intakeState, [item]: isChecked });
  };

  const validateForm = () => {
    const isAnyTrue = Object.keys(preExistingCondition)
      .map((key) => preExistingCondition[key])
      .some((v) => v === true);

    setConditionError(!isAnyTrue);

    return isAnyTrue;
  };

  const onNext = () => {
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

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
