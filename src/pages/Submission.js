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
      {messageStatus === MESSAGE_STATUS.sent ? (
        <>
          <div className="form-content-wrapper success-page">
            <img
              className="thank-you-img"
              src={success_image}
              alt="success-image"
            />
            <div className="text-greeting">
              <div>
                <span className="bold-text">Thank you</span> for updating your
                health information.
              </div>
              <br />
              <div>You will hear from us shortly.</div>
              <br />
              <br />
              <div>You may close the window.</div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="form-content-wrapper expired-page">
            <img
              className="thank-you-img"
              src={success_image}
              alt="success-image"
            />
            <div className="text-greeting">
              <div>
                <span className="bold-text">Thank you</span>
              </div>
              <br />
              <div>You have already submitted the form.</div>
              <br />
              <br />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Submission;
