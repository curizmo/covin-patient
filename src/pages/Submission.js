import React from "react";
import "../App.css";
import "./home.css";
import success_image from "../assets/images/check-circle.svg";

const Submission = () => {
  return (
    <>
      <div className="form-content-wrapper success-page">
        <img
          className="thank-you-img"
          src={success_image}
          alt="success-image"
        />
        <div className="text-greeting">
          <div>
            <span className="bold-text">Thank you</span> for updating your health information.
          </div>
          <br />
          <div>
            You will hear from us shortly.
          </div>
          <br />
          <br />
          <div>
            You may close the window.
          </div>
        </div>
      </div>
    </>
  );
};

export default Submission;
