import React, { useState } from "react";
import * as patientService from "../services/patient";
import "../App.css";

const TermsAndCondition = ({ setIsAgreed, name, phone, patientId }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleOnClick = async () => {
    setIsAgreed(true);

    await patientService.createPatientAgreement({
      patientId,
      isAgreed: isChecked ? 0 : 1,
    });
  };

  return (
    <div className="initial-page-wrapper">
      <div className="name-container">
        <span>Hi {name}!</span>
        <span>{phone}</span>
      </div>
      <div className="initial-page-content">
        <div>
          <input type="checkbox" onChange={handleOnChange} />
          <label> I agree to the terms and conditions</label>
        </div>

        <button onClick={handleOnClick} disabled={!isChecked}>
          I Agree
        </button>
      </div>
    </div>
  );
};

export default TermsAndCondition;
