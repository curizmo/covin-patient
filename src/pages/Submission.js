import React from "react";
import "../App.css";
import "./home.css";
import success_image from "../assets/images/img_thank_you.svg"

const Submission = () => {
  return (
    <>
    <div className="form-content-wrapper success-page">
    <img className="thank-you-img" src={success_image} alt="success-image"/>
      <div className="text-greeting">
        <div>
          <span className="bold-text">Thank you</span> for completing the questionnaire. Our experts will evaluate
            your condition and get back to you soon.
        </div>
        <br/>
        <div>
          <span className="block-text">Important:</span> Please make sure
          that your phone is accessible for our medical staff to reach you over
          messages/call
        </div>
      </div>
    </div>
    </>
  );
};

export default Submission;
