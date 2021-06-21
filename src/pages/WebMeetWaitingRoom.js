import React, { useEffect } from "react";
import "../App.css";
import "./home.css";

const WebMeetWaitingRoom = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <>
        <div className={`form-content-wrapper success-page`}>
          <div className="waiting-room-message">
            <div>
            <p className="submission-title">
                  <b className="bold-text">Welcome!</b>
                </p>
              <p className="submission-title">
               Appointment Time : 9:45 am 
              </p>
              <p>Please wait for the physician to bring you into exam room.</p>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default WebMeetWaitingRoom;
