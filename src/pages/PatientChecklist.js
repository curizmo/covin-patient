import React, { useState, useEffect } from "react";
import "../App.css";
import * as patientService from "../services/patient";

const PatientChecklist = ({ state, setState, setSymptomsDuration }) => {
  const [symptoms, setSymptoms] = useState([]);
  const checkList = {
    "Fever or Chills": "feverOrChills",
    Cough: "cough",
    "Difficulty Breathing": "difficultyBreathing",
    "Fatigue, Muscle or body aches": "fatigueMuscleOrBodyAches",
    Headache: "headache",
    "New loss of taste or smell": "newlossOfTasteOrSmell",
    "Sore throat": "soreThroat",
    "Congestion or runny nose": "congestionOrRunnyNose",
    "Nausea or Vomiting": "nauseaOrVomiting",
    Diarrhea: "diarrhea",
    "None of the above": "none",
  };

  useEffect(() => {
    getSymptoms();
  }, []);

  const handleOnChange = (event) => {
    const isChecked = event.target.checked;
    const item = event.target.value;
    setState({ ...state, [`${item}`]: isChecked });
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
            <div className="list-content" key={indx}>
              <input
                type={"checkbox"}
                id={indx}
                value={symptom.field}
                onChange={handleOnChange}
              />
              <label key={indx}>{symptom.title}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PatientChecklist;
