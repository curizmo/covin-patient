import React from "react";
import "../App.css";
import "./home.css";
import success_image from "../assets/images/check-circle.svg"

const Submission = () => {
  return (
    <>
    <div className="form-content-wrapper success-page">
    <img className="thank-you-img" src={success_image} alt="success-image"/>
      <div className="text-greeting">
        <div>
          <span className="bold-text">Thank you</span> for completing the questionnaire. We get back to you soon.
        </div>
        <br/>
        <div>
          <span className="block-text">Important:</span> Please make sure
          that your phone is accessible for us to reach you over
          messages/call.
        </div>
      </div>
    </div>
    </>
  );
};

export default Submission;
