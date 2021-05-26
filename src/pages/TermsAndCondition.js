import React, { useState } from "react";
import * as patientService from "../services/patient";
import "../App.css";
import "./home.css";
import patient_profile from "../assets/images/icon_userprofile.svg";
import { SubmitButton } from "../components/common/SubmitButton";

const TermsAndCondition = ({ setIsAgreed, name, phone, patientId }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleOnClick = async () => {
    setIsLoading(true);
    setIsAgreed(true);

    await patientService.createPatientAgreement({
      patientId,
      isAgreed: isChecked ? 1 : 0,
    });
    setIsLoading(false);
  };

  return (
    <div className="initial-page-wrapper page-hero">
      <div className="name-container">
        <span className="main-text">Hello {name}!</span>
        <span className="dull-text">{phone}</span>
      </div>
      <div className="thanks-message">
        <span className="thanks-text">Thank you for giving us the opportunity to serve you.</span>
      </div>
      <div className="initial-page-content">
        <div className="page-alert">
          <input
            className="page-checkbox"
            type="checkbox"
            onChange={handleOnChange}
          />
          <label>
            I agree to the<span> </span>
            <a href="https://drive.google.com/file/d/1WTSvbfnI3BDjeoAfn-HVyHrqcm3AiiXR/view?usp=sharing" className="link-text">
              terms and conditions
            </a> of the usage this system
          </label>
          <span className="checkmark"></span>
        </div>
      </div>
      <SubmitButton
        className="initial-page-content submit-btn"
        isLoading={isLoading}
        onClick={handleOnClick}
        disabled={!isChecked}
        text='I AGREE' />
    </div>
  );
};

export default TermsAndCondition;
