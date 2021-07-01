/*global JitsiMeetExternalAPI */
import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";
import "./home.css";
import * as patientService from "../services/patient";
import { getDateString, getTimeString, getToday } from "../utils";
import { BOOKING_STATUS } from "../constants/constants";
import config from "../config/index";
import Pusher from "pusher-js";

const WebMeetWaitingRoom = ({ patientDetails, hashKey }) => {
  const [appointment, setAppointment] = useState({});
  const jitsiContainer = useRef(null);
  const [jitsiApi, setJitsiApi] = useState(null);
  const [startWebMeeting, setStartWebMeeting] = useState(false);
  const [endWebMeeting, setEndWebMeeting] = useState(false);

  const today = getToday();
  useEffect(() => {
    window.scrollTo(0, 0);
    getAppointmentDetail();
  }, []);

  const handleAppointmentProgress = useCallback(
    (data) => {
      setAppointment({ ...appointment, eventStatusDesc: "InProgress" });

      if (data) {
        setStartWebMeeting(true);
      }
    },
    [appointment]
  );

  const handleAppointmentCompleted = useCallback(
    async (data) => {
      setAppointment({ ...appointment, eventStatusDesc: "Completed" });
      await patientService.UpdateMessageStatus(hashKey);
      if (data) {
        setEndWebMeeting(true);
        setStartWebMeeting(false);
      }
    },
    [appointment]
  );

  useEffect(() => {
    if (
      (appointment.organizationEventBookingId && !startWebMeeting) ||
      (appointment.organizationEventBookingId && !endWebMeeting)
    ) {
      const { key, cluster } = config.pusher;
      const pusher = new Pusher(key, {
        cluster,
        encrypted: true,
      });
      const appointmentStatus = pusher.subscribe(
        `${appointment.NTOUserID?.toLowerCase()}-appointmentStatus`
      );
      if (!startWebMeeting) {
        appointmentStatus.bind("InProgress", handleAppointmentProgress);
      }
      if (!endWebMeeting) {
        appointmentStatus.bind("completed", handleAppointmentCompleted);
      }
    }
  }, [
    appointment?.organizationEventBookingId,
    appointment?.NTOUserID,
    startWebMeeting,
  ]);

  const getJWT = async () => {
    const response = await patientService.fetchJWT(patientDetails.patientId);

    return response.jwt;
  };

  const startConference = useCallback(async () => {
    if (
      patientDetails.patientId &&
      appointment &&
      appointment.eventStatusDesc === BOOKING_STATUS.inProgress &&
      patientDetails.patientId === appointment.patientId
    ) {
      const jwt = await getJWT();
      try {
        const domain = "8x8.vc";
        const options = {
          roomName: `${config.jitsi.appId}/curizmo-${appointment.organizationEventBookingId}`,
          width: "100%",
          height: "100%",
          parentNode: jitsiContainer.current,
          jwt,
          interfaceConfigOverwrite: {
            filmStripOnly: false,
            SHOW_JITSI_WATERMARK: false,
            HIDE_INVITE_MORE_HEADER: true,
            DISABLE_FOCUS_INDICATOR: true,
          },
          userInfo: {
            displayName: `${patientDetails.givenName} ${patientDetails.familyName}`,
          },
          configOverwrite: {
            startWithVideoMuted: false,
            disableSimulcast: false,
            disableDeepLinking: true,
            disableFocusIndicator: true,
            disableInviteFunctions: true,
            disableThirdPartyRequests: true,
            prejoinPageEnabled: true,
            // Note: This is a hack for hiding the room name of the call.
            // The feature is not built in Jitsi and they've said it's low priority.
            // Might need to send a PR there.
            subject: " ",
          },
        };

        const api = new JitsiMeetExternalAPI(domain, options);

        setJitsiApi(api);
      } catch (err) {
        // @toDo Handle error
      }
    }
  }, [
    jitsiContainer,
    appointment?.organizationEventBookingId,
    appointment?.eventStatusDesc,
  ]);

  useEffect(() => {
    if (
      patientDetails.patientId &&
      appointment &&
      appointment.eventStatusDesc === BOOKING_STATUS.inProgress &&
      patientDetails.patientId === appointment.patientId
    ) {
      // Load the jitsi script
      const script = document.createElement("script");
      script.src = "https://8x8.vc/external_api.js";
      document.body.appendChild(script);
      // start the call only after the above script finishes loading
      script.onload = () => {
        // verify the JitsiMeetExternalAPI constructor is added to the global..
        if (window.JitsiMeetExternalAPI) {
          startConference();
        } else {
          // TODO: Remove alert and add better error handler.
          alert("Jitsi Meet API script not loaded");
        }
      };
      return () => {
        document.body.removeChild(script);
      };
    }
  }, [startConference]);

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
      info = {
        ...info,
        date: getDateString(appointment.eventStartTime),
        time: getTimeString(appointment.eventStartTime),
      };
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
      ) : appointmentStartDate.date === today &&
        appointment.eventStatusDesc === BOOKING_STATUS.inProgress ? (
        <div className={`web-call-page`}>
          <div className="waiting-room-message">
            <div>
              <div ref={jitsiContainer} className="jitsi-embed"></div>
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
