import React, { useState, useEffect } from "react";
import PatientVitals from "./PatientVitals";
import TermsAndCondition from "./TermsAndCondition";
import { useParams } from "react-router-dom";
import * as patientService from "../services/patient";
import Submission from "./Submission";
import { MESSAGE_STATUS, MESSAGE_TYPES } from "../constants/constants";

const PatientIntakeForm = () => {
  const { hashKey } = useParams();
  const [isAgreed, setIsAgreed] = useState(false);
  const [patientDetails, setPatientDatails] = useState({});
  const [intakeForm, setIntakeForm] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getPatientDetail(hashKey);
  }, [hashKey]);

  const getPatientDetail = async (hashKey) => {
    try {
      const response = await patientService.getPatientDetails(hashKey);
      getPatientIntake(response.patientInfo.patientId, response.patientInfo.messageType);
      setPatientDatails(response.patientInfo);
      setIsAgreed(response.patientInfo.isAgreed);
    } catch (err) {}
  };

  const getPatientIntake = async (patientId, messageType) => {
    try {
      if(messageType !== MESSAGE_TYPES.webMeeting){
      const response = await patientService.getPatientIntake(patientId);
      setIntakeForm(JSON.parse(response));
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {patientDetails.messageStatus === MESSAGE_STATUS.sent ? (
        <>
          {patientDetails.messageType === MESSAGE_TYPES.newPatient ? (
            <>
              {!isAgreed && (
                <TermsAndCondition
                  setIsAgreed={setIsAgreed}
                  name={patientDetails.givenName}
                  phone={patientDetails.phone}
                  patientId={patientDetails.patientId}
                />
              )}
              {isAgreed && !isLoading && (
                <PatientVitals
                  name={`${patientDetails.givenName} ${patientDetails.familyName}`}
                  phone={patientDetails.phone}
                  hashKey={hashKey}
                  patientDetails={patientDetails}
                  messageType={patientDetails.messageType}
                  intakeForm={intakeForm}
                />
              )}
            </>
          ) : (
            <>
              {!isLoading && (
                <PatientVitals
                  name={`${patientDetails.givenName} ${patientDetails.familyName}`}
                  phone={patientDetails.phone}
                  hashKey={hashKey}
                  patientDetails={patientDetails}
                  messageType={patientDetails.messageType}
                  intakeForm={intakeForm}
                />
              )}
            </>
          )}
        </>
      ) : patientDetails.messageStatus === MESSAGE_STATUS.processed ? (
        <Submission messageStatus={patientDetails.messageStatus} messageType={patientDetails.messageType} />
      ) : null}
    </div>
  );
};

export default PatientIntakeForm;
