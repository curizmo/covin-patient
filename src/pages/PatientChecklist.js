import React, { useState, useEffect } from "react";
import "../App.css";
import * as patientService from "../services/patient";
import "./home.css";

const PatientChecklist = ({ state, setState, setSymptomsDuration }) => {
  const [symptoms, setSymptoms] = useState([]);

  useEffect(() => {
    getSymptoms();
  }, []);

  const handleOnChange = (event) => {
    const isChecked = event.target.checked;
    const item = event.target.value;
    item == "none"
      ? setState({ ...state, [`${item}`]: !isChecked })
      : setState({ ...state, [`${item}`]: isChecked });
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
