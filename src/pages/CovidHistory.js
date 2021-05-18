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

  const onBackButtonClick = () => {
    setProgressedPage(NEW_PATIENT_PAGES.patientInfo);
  };

  return (
    <div className="form-content-wrapper">
      <div onClick={onBackButtonClick}>back</div>
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
                  value={
                    `${history.field}` === "dateOfDose1Vaccination"
                      ? moment(intakeState.dateOfDose1Vaccination).format(
                          DATE_FORMAT.yyyymmdd
                        )
                      : `${history.field}` === "dateOfDose2Vaccination"
                      ? moment(intakeState.dateOfDose2Vaccination).format(
                          DATE_FORMAT.yyyymmdd
                        )
                      : `${history.field}` === "dateCovidBefore"
                      ? moment(intakeState.dateCovidBefore).format(
                          DATE_FORMAT.yyyymmdd
                        )
                      : null
                  }
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
