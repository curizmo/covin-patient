import React, { useState, useEffect } from "react";
import "../App.css";
import * as patientService from "../services/patient";
import "./home.css";

const PatientChecklist = ({ state, setState, setPage, page }) => {
  const [symptoms, setSymptoms] = useState([]);
  const [symptomsError, setSymptomsError] = useState(false);
  const [isSymptomChecked, setIsSymptomChecked] = useState(false);
  const [isSymptomLoad, setIsSymptomLoad] = useState(true);

  useEffect(() => {
    getSymptoms();
  }, []);

  const handleOnSynptomClick = (item) => {
    if (isSymptomChecked) {
      setSymptomsError(false);
    }
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
      setState({ ...state, [item]: isSymptomChecked, none: false });
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
    setIsSymptomLoad(false)
  };

  return (
    <div className="form-content-wrapper">
      <div>Are you currently having any of the following symptoms?</div>
      <div className="health-checklist no-select">
        {symptoms.map((symptom, indx) => {
          return (
            <div
              className="list-content symptoms-list"
              key={indx}
              onClick={() => {
                setIsSymptomChecked(!isSymptomChecked);
                handleOnSynptomClick(symptom.field);
              }}
            >
              <input
                className="symptoms-checkbox"
                type="checkbox"
                id={indx}
                name={symptom.field}
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
      <button
        className="submit-button submit-btn"
        onClick={onNext}
        disabled={isSymptomLoad}
      >
        NEXT
      </button>
    </div>
  );
};

export default PatientChecklist;
