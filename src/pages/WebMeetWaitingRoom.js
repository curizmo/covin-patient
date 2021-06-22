import React, { useEffect, useState, useMemo } from "react";
import "./home.css";
import * as patientService from "../services/patient";
import { getDateString, getTimeString, getToday } from "../utils";
import { BOOKING_STATUS } from "../constants/constants";

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
      setAppointment(response?.appointment);

      response.appointment.eventStatusDesc === BOOKING_STATUS.confirmed &&
        (await patientService.updateAppointmentStatus(
          response?.appointment.organizationEventBookingId,
          patientDetails.patientId
        ));
    } catch (err) {}
  };

  const appointmentStartDate = useMemo(() => {
    let info = {};
    if (appointment.eventStartTime) {
      info = { ...info, date: getDateString(appointment.eventStartTime) };
      info = { ...info, time: getTimeString(appointment.eventStartTime) };
    }
    return info;
  }, [appointment.eventStartTime]);

  return (
    <>
      {appointmentStartDate.date === today &&
      (appointment.eventStatusDesc === BOOKING_STATUS.confirmed ||
        appointment.eventStatusDesc === BOOKING_STATUS.checkedIn) ? (
        <div className={`form-content-wrapper success-page`}>
          <div className="waiting-room-message">
            <div>
              <p className="submission-title">
                <b className="bold-text">Welcome!</b>
              </p>
              <p className="submission-title">
                Appointment Time : {appointmentStartDate.time}
              </p>
              <p>Please wait for the physician to bring you into exam room.</p>
            </div>
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default WebMeetWaitingRoom;
