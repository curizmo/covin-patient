import React, { useState } from "react";
import "../App.css";
import "./home.css"
import patient_profile from '../assets/images/icon_userprofile.svg'

const TermsAndCondition = ({ setIsAgreed }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleOnClick = () => {
    setIsAgreed(true);
  };

  return (
    <div className="initial-page-wrapper page-hero">
        <div className="header">COVIN</div>
        <div className="name-container">
          <img src={patient_profile} alt="user-profile"/>
          <span className="main-text" >Hello Amit!</span>
          <span className="dull-text">+919845667233</span>
        </div>
        <div className="footer">
          <div className="initial-page-content">
            <div className="page-alert">
              <input className="page-checkbox" type="checkbox" onChange={handleOnChange} />
              <label> I agree to the <a href="#" className="link-text">terms and conditins</a> of the usage this system</label>
              <span className="checkmark"></span>
            </div>
          </div>
          <button className="initial-page-content submit-btn" onClick={handleOnClick} disabled={!isChecked}>
            I AGREE
          </button>
        </div>
    </div>
  );
};

export default TermsAndCondition;
