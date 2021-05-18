import React, { useState, useEffect } from "react";
import PatientVitals from "./PatientVitals";
import TermsAndCondition from "./TermsAndCondition";
import { useParams } from "react-router-dom";
import * as patientService from "../services/patient";

const PatientIntakeForm = () => {
  const { hashKey } = useParams();
  const [isAgreed, setIsAgreed] = useState(false);
  const [patientDetails, setPatientDatails] = useState({});
  const [hasPatientAgreed, setHasPatientAgreed] = useState(false);

  useEffect(() => {
    getPatientDetail(hashKey);
  }, [hashKey]);

  const getPatientDetail = async (hashKey) => {
    try {
      const response = await patientService.getPatientDetails(hashKey);
      getAgreementStatus(response.patientInfo.patientId);
      setPatientDatails(response.patientInfo);
    } catch (err) {}
  };

  const getAgreementStatus = async (patientId) => {
    try {
      const response = await patientService.getPatientAgreement(patientId);
      if (response.agreement) {
        setHasPatientAgreed(true);
        setIsAgreed(response.agreement.isAgreed);
      } else {
        setHasPatientAgreed(false);
      }
    } catch (err) {}
  };

  return (
    <div>
      {patientDetails.messageStatus === "SENT" ? (
        <>
          {patientDetails.messageType === "newPatient" ? (
            <>
              {!isAgreed && !hasPatientAgreed && (
                <TermsAndCondition
                  setIsAgreed={setIsAgreed}
                  name={patientDetails.givenName}
                  phone={patientDetails.phone}
                  patientId={patientDetails.patientId}
                />
              )}
              {isAgreed && (
                <PatientVitals
                  name={`${patientDetails.givenName} ${patientDetails.familyName}`}
                  phone={patientDetails.phone}
                  hashKey={hashKey}
                  patientDetails={patientDetails}
                  messageType={patientDetails.messageType}
                />
              )}
            </>
          ) : (
            <PatientVitals
              name={`${patientDetails.givenName} ${patientDetails.familyName}`}
              phone={patientDetails.phone}
              hashKey={hashKey}
              patientDetails={patientDetails}
              messageType={patientDetails.messageType}
            />
          )}
        </>
      ) : null}
    </div>
  );
};

export default PatientIntakeForm;
