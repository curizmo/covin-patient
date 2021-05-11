import React, { useState, useEffect } from "react";
import "../App.css";
import * as patientService from "../services/patient";

const camelcaseKeys = require("camelcase-keys");

const PatientVitalForm = ({
  setTemperature,
  setOxygenLevel,
  setPulseRate,
  setBpUpperRange,
  setBpLowerRange,
  setRespiratoryRate,
}) => {
  const [vitals, setVitals] = useState([]);

  useEffect(() => {
    getVitals();
  }, []);

  const getVitals = async () => {
    const response = await patientService.getPatientVitals();
    setVitals(response.vitalsTemplate);
  };

  return (
    <div className="form-content-wrapper">
      <div className="input-vitals">
        <label>Temperature</label>
        <input
          type="text"
          name="Temperature"
          onChange={(e) => setTemperature(e.target.value)}
        />
      </div>
      <div className="input-vitals">
        <label>Oxygen Level</label>
        <input
          type="text"
          name="OxygenLevel"
          onChange={(e) => setOxygenLevel(e.target.value)}
        />
      </div>
      <div className="input-vitals">
        <label>Pulse rate</label>
        <input
          type="text"
          name="Pulserate"
          onChange={(e) => setPulseRate(e.target.value)}
        />
      </div>
      <div className="input-vitals">
        <label>Blood Pressure</label>
        <div className="blood-pressure">
          <input
            className="bp"
            type="text"
            name="BloodPressureHigh"
            onChange={(e) => setBpUpperRange(e.target.value)}
          />
          <input
            className="bp"
            type="text"
            name="BloodPressureLow"
            onChange={(e) => setBpLowerRange(e.target.value)}
          />
        </div>
      </div>
      <div className="input-vitals">
        <label>Respiratory rate</label>
        <input
          type="text"
          name="Respiratoryrate"
          onChange={(e) => setRespiratoryRate(e.target.value)}
        />
      </div>
    </div>
  );
};

export default PatientVitalForm;
