import React, { useState, useEffect } from "react";
import "../App.css";
import "./home.css";
import * as patientService from "../services/patient";
import CovidHistory from "./CovidHistory";
import PreexistingCondition from "./PreexistingCondition";
import SocialHistory from "./SocialHistory";
import Medication from "./Medication";
import Submission from "./Submission";
import PatientPersonalInfo from "./PatientPersonalInfo";
import { NEW_PATIENT_PAGES } from "../constants/constants";

const PatientFirstIntake = ({
  pageNum,
  setIntakeState,
  intakeState,
  personalInfoError,
  messageType,
  setPage,
  patientDetails,
  progressedPage,
  setProgressedPage,
  hash,
  page,
}) => {
  const [personalInfo, setPersonalInfo] = useState([]);
  const [covidHistory, setcovidHistory] = useState([]);
  const [preexistingCondition, setPreexistingCondition] = useState([]);
  const [socialHistory, setSocialHistory] = useState([]);
  const [medication, setMedication] = useState([]);

  useEffect(() => {
    getPatientHealthIntake();
  }, []);

  const getPatientHealthIntake = async () => {
    const response = await patientService.getPatientHealthIntake();

    Object.values(response.patientIntake).map((response) => {
      if (response.pageNumber === NEW_PATIENT_PAGES.patientInfo) {
        setPersonalInfo((personalInfo) => [...personalInfo, response]);
      }
      if (response.pageNumber === NEW_PATIENT_PAGES.covidHistory) {
        setcovidHistory((covidHistory) => [...covidHistory, response]);
      } else if (
        response.pageNumber === NEW_PATIENT_PAGES.preExistingCondition
      ) {
        setPreexistingCondition((preexistingCondition) => [
          ...preexistingCondition,
          response,
        ]);
      } else if (response.pageNumber === NEW_PATIENT_PAGES.allergy) {
        setSocialHistory((socialHistory) => [...socialHistory, response]);
      } else if (response.pageNumber === NEW_PATIENT_PAGES.medication) {
        setMedication((medication) => [...medication, response]);
      }
    });
  };

  return (
    <div className="form-content-wrapper">
      {progressedPage === NEW_PATIENT_PAGES.patientInfo && (
        <PatientPersonalInfo
          personalInfo={personalInfo}
          setIntakeState={setIntakeState}
          intakeState={intakeState}
          personalInfoError={personalInfoError}
          patientDetails={patientDetails}
          setPage={setPage}
          page={page}
          hash={hash}
          progressedPage={progressedPage}
          setProgressedPage={setProgressedPage}
        />
      )}
      {progressedPage === NEW_PATIENT_PAGES.covidHistory && (
        <CovidHistory
          covidHistory={covidHistory}
          setIntakeState={setIntakeState}
          intakeState={intakeState}
          patientDetails={patientDetails}
          setPage={setPage}
          page={page}
          hash={hash}
          progressedPage={progressedPage}
          setProgressedPage={setProgressedPage}
        />
      )}
      {progressedPage === NEW_PATIENT_PAGES.preExistingCondition && (
        <PreexistingCondition
          preexistingCondition={preexistingCondition}
          setIntakeState={setIntakeState}
          intakeState={intakeState}
          patientDetails={patientDetails}
          setPage={setPage}
          page={page}
          hash={hash}
          progressedPage={progressedPage}
          setProgressedPage={setProgressedPage}
        />
      )}
      {progressedPage === NEW_PATIENT_PAGES.allergy && (
        <SocialHistory
          socialHistory={socialHistory}
          setIntakeState={setIntakeState}
          intakeState={intakeState}
          patientDetails={patientDetails}
          setPage={setPage}
          page={page}
          hash={hash}
          progressedPage={progressedPage}
          setProgressedPage={setProgressedPage}
        />
      )}
      {progressedPage === NEW_PATIENT_PAGES.medication && (
        <Medication
          medication={medication}
          setIntakeState={setIntakeState}
          intakeState={intakeState}
          setPage={setPage}
          page={page}
          messageType={messageType}
          patientDetails={patientDetails}
          hash={hash}
          progressedPage={progressedPage}
          setProgressedPage={setProgressedPage}
        />
      )}
      {progressedPage === NEW_PATIENT_PAGES.submission && <Submission />}
    </div>
  );
};

export default PatientFirstIntake;
