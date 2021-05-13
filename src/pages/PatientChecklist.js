import React, { useState, useEffect } from "react";
import "../App.css";
import * as patientService from "../services/patient";
import "./home.css";

const PatientChecklist = ({ state, setState, setPage, page }) => {
  const [symptoms, setSymptoms] = useState([]);
  const [symptomsError, setSymptomsError] = useState(false);

  useEffect(() => {
    getSymptoms();
  }, []);

  const handleOnChange = (event) => {
    const isChecked = event.target.checked;
    const item = event.target.name;
    if (item === "none") {
      setState({
        feverOrChills: false,
        cough: false,
        difficultyBreathing: false,
        fatigueMuscleOrBodyAches: false,
        headache: false,
        newlossOfTasteOrSmell: false,
        soreThroat: false,
        congestionOrRunnyNose: false,
        nauseaOrVomiting: false,
        diarrhea: false,
        none: true,
      });
    } else {
      setState({ ...state, [`${item}`]: isChecked, none: false });
    }
  };

  const validateForm = () => {
    const isAnyTrue = Object.keys(state)
      .map((key) => state[key])
      .some((v) => v === true);

    setSymptomsError(!isAnyTrue);

    return isAnyTrue;
  };

  const onNext = () => {
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    setPage(page + 1);
  };

  const getSymptoms = async () => {
    const response = await patientService.getPatientSymtoms();
    setSymptoms(response.symptomsTemplate);
  };
  return (
    <div className="form-content-wrapper">
      <div>Are you currently having any of the following symptoms?</div>
      <div className="health-checklist">
        {symptoms.map((symptom, indx) => {
          return (
            <div className="list-content symptoms-list" key={indx}>
              <input
                className="symptoms-checkbox"
                type="checkbox"
                id={indx}
                name={symptom.field}
                onChange={handleOnChange}
                checked={state[symptom.field]}
              />
              <label key={indx}>{symptom.title}</label>
            </div>
          );
        })}
      </div>
      {symptomsError ? (
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

export default PatientChecklist;
