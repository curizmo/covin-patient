import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  MINIMUM_YEAR,
  DATE_FORMAT,
  NEW_PATIENT_PAGES,
  COVID_BEFORE,
} from "../constants/constants";
import * as patientService from "../services/patient";
import "../App.css";
import "./home.css";
import { getRandomKey } from "../utils";
import { SubmitButton } from "../components/common/SubmitButton";

const moment = require("moment");
const maxDate = moment().format(DATE_FORMAT.yyyymmdd);

const CovidHistory = ({
  covidHistory,
  setIntakeState,
  intakeState,
  patientDetails,
  setProgressedPage,
  hash,
  setPage,
  page,
}) => {
  const [isDiagnosed, setDiagnosed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [diagnosisClass, setDiagnosisClass] = useState("");
  const [dosesClass, setDosesClass] = useState({
    dateOfDose1Vaccination: '',
    dateOfDose2Vaccination: '',
  });
  const [state, setChecked] = useState();
  const dosesRefs = {
    dateOfDose1Vaccination: useRef(null),
    dateOfDose2Vaccination: useRef(null),
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name: item, value } = e.target;
    setIntakeState(intakeState => ({ ...intakeState, [item]: value }));
  }, [setIntakeState]);

  useEffect(() => {
    if (intakeState.covidPositiveEverBefore) {
      setChecked(COVID_BEFORE.yes);
      setDiagnosed(true);
    } else {
      setChecked(COVID_BEFORE.no);
      setDiagnosed(false);
    }
  }, [intakeState.covidPositiveEverBefore]);

  useEffect(() => {
    setDiagnosisClass(intakeState.dateCovidBefore ? "has-value" : "");
    setDosesClass({
      dateOfDose1Vaccination: intakeState.dateOfDose1Vaccination ? "has-value" : "",
      dateOfDose2Vaccination: intakeState.dateOfDose2Vaccination ? "has-value" : ""
    });
  }, [
    intakeState.dateOfDose2Vaccination,
    intakeState.dateOfDose1Vaccination,
    intakeState.dateCovidBefore,
  ]);

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    const item = event.target.name;
    setIntakeState({ ...intakeState, [item]: isChecked });
    if (isChecked) {
      dosesRefs[item === 'covidVaccinationDose1Taken' ? 'dateOfDose1Vaccination' : 'dateOfDose2Vaccination'].current.focus();
    }
  };

  const onNext = async () => {
    setIsLoading(true);
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
      setIsLoading(false);
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
    setIsLoading(false);
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
    if (value === COVID_BEFORE.yes) {
      setIntakeState({ ...intakeState, covidPositiveEverBefore: true });
    } else if (value === COVID_BEFORE.no) {
      setIntakeState({ ...intakeState, covidPositiveEverBefore: false });
    }
  };

  return (
    <div className="form-content-wrapper">
      <div className="covid-diagnosed">
        <div className="covid-tittle">
          Have you ever been diagnosed positive for COVID?
        </div>
        <div className="covid-buttons">
          <span className="yes-diagnosed">
            <input
              className="covid-button"
              type="radio"
              name="yes"
              value="yes"
              onClick={yesDiagnosed}
              checked={
                intakeState.covidPositiveEverBefore
                  ? state === COVID_BEFORE.yes
                  : null
              }
              onChange={() => handleRadioButton(1)}
            />
            <label htmlFor="yes">Yes</label>
          </span>
          <span className="not-diagnosed">
            <input
              className="covid-button"
              type="radio"
              name="no"
              value="no"
              onClick={notDiagnosed}
              checked={
                !intakeState.covidPositiveEverBefore
                  ? state === COVID_BEFORE.no
                  : null
              }
              onChange={() => handleRadioButton(2)}
            />
            <label htmlFor="no">No</label>
          </span>
        </div>
        {isDiagnosed && (
          <div className="date-diagnosed date-input">
            <label>Date of diagnosis</label>
            <input
              name="dateCovidBefore"
              className={`date-of-diagnosis ${diagnosisClass}`}
              type="date"
              placeholder={DATE_FORMAT.mmddyyyy}
              max={maxDate}
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
            <>
              {history.field !== "dateCovidBefore" && (
                <div
                  className={
                    `${history.type}` === "Boolean"
                      ? "history-list-content"
                      : "input-history"
                  }
                  key={getRandomKey()}
                >
                  {history.type === "Text" && <label>{history.title}</label>}
                  {history.type === "Text" ? (
                    <div className="date-input">
                      <input
                        ref={dosesRefs[history.field]}
                        name={history.field}
                        className={`date-of-vaccination ${dosesClass[history.field]}`}
                        type="date"
                        placeholder={DATE_FORMAT.mmddyyyy}
                        max={maxDate}
                        disabled={!(history.field === "dateOfDose1Vaccination" ? intakeState.covidVaccinationDose1Taken : intakeState.covidVaccinationDose2Taken)}
                        value={moment(intakeState[history.field]).format(
                          DATE_FORMAT.yyyymmdd
                        )}
                        onChange={handleInputChange}
                      />
                    </div>
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
                    <label htmlFor={history.field}>{history.title}</label>
                  )}
                </div>
              )}
            </>
          );
        })}
      </div>
      <SubmitButton onClick={onNext} isLoading={isLoading} />
    </div>
  );
};

export default CovidHistory;
