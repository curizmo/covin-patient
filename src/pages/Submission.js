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
            <div>
              <span className="bold-text">Thank you</span>{" "}
              {messageStatus === MESSAGE_STATUS.processed
                ? ""
                : "for updating your health information."}
            </div>
            <br />
            <div>
              {messageStatus === MESSAGE_STATUS.processed
                ? "You have already submitted the form."
                : "You will hear from us shortly."}
            </div>
            <br />
            <br />
            <div>
              {messageStatus === MESSAGE_STATUS.processed
                ? ""
                : "You may close the window."}
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Submission;
