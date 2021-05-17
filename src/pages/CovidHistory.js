import React, { useState } from "react";
import "../App.css";
import "./home.css";
const moment = require("moment");

const CovidHistory = ({
  covidHistory,
  setIntakeState,
  intakeState,
  setPage,
  page,
}) => {
  const [checkedOne, setCheckedOne] = useState(false);
  const [checkedTwo, setCheckedTwo] = useState(false);

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

    if (item === "covidVaccinationDose1Taken") {
      setCheckedOne(isChecked);
    } else if (item === "covidVaccinationDose2Taken") {
      setCheckedTwo(isChecked);
    }
  };

  const onNext = () => {
    setPage(page + 1);
  };

  return (
    <div className="form-content-wrapper">
      <div className="page-title">Covid History</div>
      <div className="health-checklist">
        {covidHistory.map((history, indx) => {
          return (
            <div
              className={
                `${history.type}` === "Boolean"
                  ? "history-list-content"
                  : "input-history"
              }
              key={indx}
            >
              {history.type === "Text" && <label>{history.title}</label>}
              {history.type === "Text" ? (
                <input
                  type="date"
                  id={indx}
                  name={history.field}
                  onChange={handleInputChange}
                  max={moment().format("YYYY-MM-DD")}
                  disabled={
                    `${history.field}` === "dateOfDose1Vaccination"
                      ? !checkedOne
                      : !checkedTwo
                  }
                />
              ) : (
                <input
                  className="symptoms-checkbox"
                  type="checkbox"
                  id={indx}
                  value={history.field}
                  onChange={handleCheckboxChange}
                />
              )}
              {history.type === "Boolean" && (
                <label for={history.field}>{history.title}</label>
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

export default CovidHistory;
