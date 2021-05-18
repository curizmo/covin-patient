import {
  MINIMUM_YEAR,
  DATE_FORMAT,
  NEW_PATIENT_PAGES,
} from "../constants/constants";
import React, { useState } from "react";
import * as patientService from "../services/patient";
import "../App.css";
import "./home.css";

const moment = require("moment");

const CovidHistory = ({
  covidHistory,
  setIntakeState,
  intakeState,
  patientDetails,
  progressedPage,
  setProgressedPage,
  hash,
  setPage,
  page,
}) => {
  const [checkedOne, setCheckedOne] = useState(false);
  const [checkedTwo, setCheckedTwo] = useState(false);
  const [isDiagnosed, setDiagnosed] = useState(false);
  const [state, setChecked] = useState();

  const handleInputChange = (e) => {
    const item = e.target.name;
    setIntakeState({ ...intakeState, [item]: e.target.value });
  };

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    const item = event.target.name;
    item === "none"
      ? setIntakeState({ ...intakeState, [item]: !isChecked })
      : setIntakeState({ ...intakeState, [item]: isChecked });

    if (item === "covidVaccinationDose1Taken") {
      setCheckedOne(isChecked);
    } else if (item === "covidVaccinationDose2Taken") {
      setCheckedTwo(isChecked);
    }
  };

  const onNext = async () => {
    const currentYear = parseInt(moment().year());
    const minimumYear = currentYear - MINIMUM_YEAR;
    const dose1Year = parseInt(
      moment(intakeState.dateOfDose1Vaccination).year()
    );
    const dose2Year = parseInt(
      moment(intakeState.dateOfDose2Vaccination).year()
    );

    if (
      dose1Year > currentYear ||
      dose2Year > currentYear ||
      dose1Year < minimumYear ||
      dose2Year < minimumYear
    ) {
      return;
    }

    await Promise.all([
      patientService.createPatientIntake({
        form: {
          ...intakeState,
          covidPositiveEverBefore: intakeState.covidPositiveEverBefore,
          covidVaccinationDose1Taken: intakeState.covidVaccinationDose1Taken,
          dateOfDose1Vaccination: intakeState.dateOfDose1Vaccination,
          covidVaccinationDose2Taken: intakeState.covidVaccinationDose2Taken,
          dateOfDose2Vaccination: intakeState.dateOfDose2Vaccination,
        },
        patientId: patientDetails.patientId,
      }),
      patientService.createFormProgress({
        hashKey: hash,
        patientId: patientDetails.patientId,
        pagenum: NEW_PATIENT_PAGES.covidHistory,
      }),
    ]);

    setProgressedPage(NEW_PATIENT_PAGES.preExistingCondition);
    setPage(page + 1);
  };

  const yesDiagnosed = () => {
    setDiagnosed(true);
  };

  const notDiagnosed = () => {
    setDiagnosed(false);
  };

  const handleRadioButton = (value) => {
    setChecked(value);
    console.log(value);
    if (value === 1) {
      setIntakeState({ ...intakeState, covidPositiveEverBefore: true });
    } else if (value === 2) {
      setIntakeState({ ...intakeState, covidPositiveEverBefore: false });
    }
  };
  const onBackButtonClick = () => {
    setProgressedPage(NEW_PATIENT_PAGES.patientInfo);
  };

  const getValue = (field) => {
    if (field === "dateOfDose1Vaccination") {
      return moment(intakeState.dateOfDose1Vaccination).format(
        DATE_FORMAT.yyyymmdd
      );
    } else if (field === "dateOfDose2Vaccination") {
      return moment(intakeState.dateOfDose2Vaccination).format(
        DATE_FORMAT.yyyymmdd
      );
    } else if (field === "dateCovidBefore") {
      return moment(intakeState.dateCovidBefore).format(DATE_FORMAT.yyyymmdd);
    }
  };

  return (
    <div className="form-content-wrapper">
      <div className="covid-diagnosed">
        <div className="covid-tittle">
          Have you ever been diagnosed positive for COVID?
        </div>
        <div className="covid-buttons">
          <span>
            <input
              className="covid-button"
              type="radio"
              name="yes"
              value="yes"
              onClick={yesDiagnosed}
              checked={state === 1}
              onChange={() => handleRadioButton(1)}
            />
            <label for="yes">Yes</label>
          </span>
          <span>
            <input
              className="covid-button"
              type="radio"
              name="no"
              value="no"
              onClick={notDiagnosed}
              checked={state === 2}
              onChange={() => handleRadioButton(2)}
            />
            <label for="no">No</label>
          </span>
        </div>
        {isDiagnosed && (
          <div className="date-diagnosed">
            <label>Date of diagnosis</label>
            <input
              name="dateCovidBefore"
              className="date-of-diagnosis"
              type="date"
              placeholder="Select date of diagnosis"
              max={moment().format(DATE_FORMAT.yyyymmdd)}
              value={moment(intakeState.dateCovidBefore).format(
                DATE_FORMAT.yyyymmdd
              )}
              onChange={handleInputChange}
            />
          </div>
        )}
      </div>
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
                  max={moment().format(DATE_FORMAT.yyyymmdd)}
                  disabled={
                    `${history.field}` === "dateOfDose1Vaccination"
                      ? !intakeState.covidVaccinationDose1Taken
                      : `${history.field}` === "dateOfDose2Vaccination"
                      ? !intakeState.covidVaccinationDose2Taken
                      : `${history.field}` === "dateCovidBefore"
                      ? !intakeState.covidPositiveEverBefore
                      : null
                  }
                  value={getValue(history.field)}
                />
              ) : (
                <input
                  className="symptoms-checkbox"
                  type="checkbox"
                  id={indx}
                  name={history.field}
                  value={history.field}
                  onChange={handleCheckboxChange}
                  checked={intakeState[history.field]}
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
