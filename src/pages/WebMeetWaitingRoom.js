import React, { useEffect, useState } from "react";
import "../App.css";
import "./home.css";
import * as patientService from "../services/patient";
import { getDateString, getTimeString, getToday } from "../utils";
import {
  BOOKING_STATUS
} from "../constants/constants";

const WebMeetWaitingRoom = ({ patientDetails }) => {
  const [appointment, setAppointment] = useState({});
  const today = getToday();
  useEffect(() => {
    window.scrollTo(0, 0);
    getAppointmentDetail();
  }, []);

  const getAppointmentDetail = async () => {
    try {
      const response = await patientService.getAppointmentDetailsByPatientId(
        patientDetails.patientId
      );
      setAppointment(response.appointment);
    } catch (err) {}
  };

  console.log(appointment);

  return (
    <>
      {getDateString(appointment.eventStartTime) === today &&
      appointment.eventStatusDesc !== BOOKING_STATUS.completed ? (
        <>
          <div className={`form-content-wrapper success-page`}>
            <div className="waiting-room-message">
              <div>
                <p className="submission-title">
                  <b className="bold-text">Welcome!</b>
                </p>
                <p className="submission-title">
                  Appointment Time : {getTimeString(appointment.eventStartTime)}
                </p>
                <p>
                  Please wait for the physician to bring you into exam room.
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={`form-content-wrapper success-page`}>
            <div className="waiting-room-message">
              <div>
                <p className="submission-title">
                  <b className="bold-text">Welcome!</b>
                </p>
                <p className="submission-title">
                  Looks like the appointment has expired already.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default WebMeetWaitingRoom;
