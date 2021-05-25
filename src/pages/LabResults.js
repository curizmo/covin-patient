import React, { useState } from "react";
import LabIntakeUpload from "./LabIntakeUpload";
import LabIntakeInput from "./LabIntakeInput";
import "../App.css";
import "./home.css";

const LabResults = ({ labState, setLabState }) => {
  const [intakeType, setIntakeTpye] = useState("");

  const handleCheckboxChange = (e) => {
    setIntakeTpye(e.target.value);
  };

  const handleInputChange = (e) => {
    const item = e.target.name;
    setLabState({ ...labState, [item]: e.target.value });
  };

  return (
    <div className="form-content-wrapper">
      <div>Lab Results (if available)</div>
      <div className="health-checklist no-select"></div>
      <span className="gender-radio-span">
        <input
          className="gender-radio"
          type="radio"
          name="labIntakeOption"
          value="picture"
          onChange={handleCheckboxChange}
        />
        <label className="gender-radio-label">Take a Picture</label>
      </span>
      <span className="gender-radio-span">
        <input
          className="gender-radio"
          type="radio"
          name="labIntakeOption"
          value="type"
          onChange={handleCheckboxChange}
        />
        <label className="gender-radio-label">Type Results</label>
      </span>

      {intakeType === "picture" && <LabIntakeUpload />}

      {intakeType === "type" && <LabIntakeInput />}

      <div className="other-information-wrapper">
        <div className="other-information">
          Any other comments to share with Doctor?
        </div>
        <div className="text-area-container">
          <textarea
            name="otherLabResultsInfo"
            value={labState.otherLabResultsInfo}
            onChange={handleInputChange}
            className="txtArea"
          ></textarea>
        </div>
      </div>

      <button className="submit-button submit-btn">SUBMIT</button>
    </div>
  );
};

export default LabResults;
