import React, { useState, useEffect, useCallback } from "react";
import "../App.css";
import * as patientService from "../services/patient";
import "./home.css";
import { NEW_PATIENT_PAGES, MESSAGE_TYPES } from "../constants/constants";
import { getRandomKey } from "../utils";
import { SubmitButton } from "../components/common/SubmitButton";

const PatientChecklist = ({
  state,
  setState,
  setPage,
  page,
  setProgressedPage,
  messageType,
  hash,
  patientDetails,
}) => {
  const [symptoms, setSymptoms] = useState([]);
  const [symptomsError, setSymptomsError] = useState(false);
  const [isSymptomLoad, setIsSymptomLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getSymptoms();
  }, []);

  const handleOnSynptomClick = useCallback((item) => () => {
    const newState = item === "none" && !state["none"]
      ? {
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
          statusToday: state.statusToday
        }
      : { ...state, none: false, [item]: !state[item] };
    const isSymptomChecked = Object.values(newState).some((s) => s);
    setState(newState);
    setSymptomsError(!isSymptomChecked);
  }, [state]);

  const validateForm = () => {
    const isAnyTrue = Object.keys(state)
      .map((key) => state[key])
      .some((v) => v === true);

    setSymptomsError(!isAnyTrue);

    return isAnyTrue;
  };

  const onNext = async () => {
    setIsLoading(true);
    const isValid = validateForm();
    if (!isValid) {
      setIsLoading(false);
      return;
    }

    if (messageType === MESSAGE_TYPES.newPatient) {
      await patientService.createFormProgress({
        hashKey: hash,
        patientId: patientDetails.patientId,
        pagenum: NEW_PATIENT_PAGES.medication,
      });

      setProgressedPage(NEW_PATIENT_PAGES.vitals);
    }
    setIsLoading(false);
    setPage(page + 1);
  };

  const getSymptoms = async () => {
    const response = await patientService.getPatientSymtoms();
    setSymptoms(response.symptomsTemplate);
    setIsSymptomLoad(false);
  };

  return (
    <div className="form-content-wrapper">
      <div>Are you currently having any of the following symptoms?</div>
      <div className="health-checklist no-select">
        {symptoms.map((symptom, indx) => {
          return (
            <div
              className="list-content symptoms-list"
              key={getRandomKey()}
              onClick={handleOnSynptomClick(symptom.field)}
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
        <SubmitButton disabled={isSymptomLoad} onClick={onNext} isLoading={isLoading} disabled={isSymptomLoad} />
    </div>
  );
};

export default PatientChecklist;
