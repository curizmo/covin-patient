import React, { useState } from "react";
import "../App.css";
import "./home.css"

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
      <div className="name-container">
        <span className="main-text" >Hi Amit Shah!</span>
        <span className="dull-text">+919845667233</span>
      </div>
      <div className="initial-page-content">
        <div className="page-alert">
          <input className="page-checkbox" type="checkbox" onChange={handleOnChange} />
          <label> I agree to the terms and conditins of the usage this system</label>
        </div>
      </div>
        <button className="initial-page-content submit-btn" onClick={handleOnClick} disabled={!isChecked}>
          I AGREE
        </button>
    </div>
  );
};

export default TermsAndCondition;
