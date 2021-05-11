import React, { useState, useEffect } from "react";
import "../App.css";
import "./home.css";
import * as patientService from "../services/patient";
import CovidHistory from "./CovidHistory";
import PreexistingCondition from "./PreexistingCondition";
import SocialHistory from "./SocialHistory";
import Medication from "./Medication";

const PatientFirstIntake = ({ pageNum, setIntakeState, intakeState }) => {
  const [covidHistory, setcovidHistory] = useState([]);
  const [preexistingCondition, setPreexistingCondition] = useState([]);
  const [socialHistory, setSocialHistory] = useState([]);
  const [medication, setMedication] = useState([]);

  useEffect(() => {
    getPatientHealthIntake();
    console.log('intakeState',intakeState)
  }, []);

  const getPatientHealthIntake = async () => {
    const response = await patientService.getPatientHealthIntake();

    Object.values(response.patientIntake).map((response) => {
      if (response.pageNumber === 1) {
        setcovidHistory((covidHistory) => [...covidHistory, response]);
      } else if (response.pageNumber === 2) {
        setPreexistingCondition((preexistingCondition) => [
          ...preexistingCondition,
          response,
        ]);
      } else if (response.pageNumber === 3) {
        setSocialHistory((socialHistory) => [...socialHistory, response]);
      } else {
        setMedication((medication) => [...medication, response]);
      }
    });
  };

  return (
    <div className="form-content-wrapper">
      {pageNum === 1 && (
        <CovidHistory
          covidHistory={covidHistory}
          setIntakeState={setIntakeState}
          intakeState={intakeState}
        />
      )}
      {pageNum === 2 && (
        <PreexistingCondition
          preexistingCondition={preexistingCondition}
          setIntakeState={setIntakeState}
          intakeState={intakeState}
        />
      )}
      {pageNum === 3 && (
        <SocialHistory
          socialHistory={socialHistory}
          setIntakeState={setIntakeState}
          intakeState={intakeState}
        />
      )}
      {pageNum === 4 && (
        <Medication medication={medication} setIntakeState={setIntakeState}  intakeState={intakeState} />
      )}
    </div>
  );
};

export default PatientFirstIntake;
