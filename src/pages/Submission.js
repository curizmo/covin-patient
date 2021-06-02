import React, { useEffect } from "react";
import "../App.css";
import "./home.css";
import success_image from "../assets/images/check-circle.svg";
import { MESSAGE_STATUS } from "../constants/constants";

const Submission = ({ messageStatus }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <>
        <div
          className={`form-content-wrapper success-page ${
            messageStatus === MESSAGE_STATUS.processed && "expired-page"
          }`}
        >
          <img
            className="thank-you-img"
            src={success_image}
            alt="success-image"
          />
          <div className="text-greeting">
            {messageStatus === MESSAGE_STATUS.processed ? (
              <div>
                <p className="submission-title">
                  <b className="bold-text">Thank you</b>
                </p>
                <p className="submission-lead-paragraph">
                  You have already submitted the form.
                </p>
              </div>
            ) : (
              <div>
                <p className="submission-title">
                  <b className="bold-text">Thank you</b>
                  {" for updating your health information."}
                </p>
                <p className="submission-lead-paragraph">
                  You will hear from us shortly.
                </p>
                <p>You may close the window.</p>
              </div>
            )}
          </div>
        </div>
      </>
    </>
  );
};

export default Submission;
