import React from "react";
import "../App.css";
import "./home.css"

const Submission = () => {
  return (
    <div className="form-content-wrapper">
      <div className="text-greeting">
      <span className="bold-text">Thank you</span> for completing the questionnaire. Our experts will evaluate
        your condition and get back to you soon.<span className="block-text">Important:</span> Please make sure
        that your phone is accessible for our medical staff to reach you over
        messages/call
      </div>
    </div>
  );
};

export default Submission;
