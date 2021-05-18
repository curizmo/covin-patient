import React, { useState, useEffect } from "react";
import PatientVitals from "./PatientVitals";
import TermsAndCondition from "./TermsAndCondition";
import { useParams } from "react-router-dom";
import * as patientService from "../services/patient";

const PatientIntakeForm = () => {
  const { hashKey } = useParams();
  const [isAgreed, setIsAgreed] = useState(false);
  const [patientDetails, setPatientDatails] = useState({});

  useEffect(() => {
    getPatientDetail(hashKey);
  }, [hashKey]);

  const getPatientDetail = async (hashKey) => {
    try {
      const response = await patientService.getPatientDetails(hashKey);
      setPatientDatails(response.patientInfo);
      setIsAgreed(response.patientInfo.isAgreed);
    } catch (err) {}
  };

  return (
    <div>
      {patientDetails.messageStatus === "SENT" ? (
        <>
          {patientDetails.messageType === "newPatient" ? (
            <>
              {!isAgreed && (
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
