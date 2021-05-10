import React from "react";
import "../App.css";

const PatientVitalForm = ({
  setTemperature,
  setOxygenLevel,
  setPulseRate,
  setBpUpperRange,
  setBpLowerRange,
}) => {
  return (
    <div className="form-content-wrapper">
      <div className="input-vitals">
        <label>Temperature</label>
        <input
          type="text"
          name="Temperature"
          onChange={(e) => setTemperature(e.target.value)}
          required="required" 
        />
      </div>
      <div className="input-vitals">
        <label>Oxygen Level</label>
        <input
          type="text"
          name="OxygenLevel"
          onChange={(e) => setOxygenLevel(e.target.value)}
          required="required" 
        />
      </div>
      <div className="input-vitals">
        <label>Pulse rate</label>
        <input
          type="text"
          name="Pulserate"
          onChange={(e) => setPulseRate(e.target.value)}
          required="required" 
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
            required="required" 
          />
          <input
            className="bp"
            type="text"
            name="BloodPressureLow"
            onChange={(e) => setBpLowerRange(e.target.value)}
            required="required" 
          />
        </div>
      </div>
    </div>
  );
};

export default PatientVitalForm;
