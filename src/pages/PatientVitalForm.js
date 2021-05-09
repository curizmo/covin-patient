import React from "react";
import "../App.css";

const PatientVitalForm = () => {
  return (
    <div className="form-content-wrapper">
      <div className="input-vitals">
        <label>Temperature</label>
        <input type="text" name="Temperature" />
      </div>
      <div className="input-vitals">
        <label>Oxygen Level</label>
        <input type="text" name="OxygenLevel" />
      </div>
      <div className="input-vitals">
        <label>Pulse rate</label>
        <input type="text" name="Pulserate" />
      </div>
      <div className="input-vitals">
        <label>Blood Pressure</label>
        <div className="blood-pressure">
          <input className="bp" type="text" name="BloodPressureHigh" />
          <input className="bp" type="text" name="BloodPressureLow" />
        </div>
      </div>
    </div>
  );
};

export default PatientVitalForm;
