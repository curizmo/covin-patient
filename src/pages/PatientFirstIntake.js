import React, { useState, useEffect } from "react";
import "../App.css";
import "./home.css";
import * as patientService from "../services/patient";
import CovidHistory from "./CovidHistory";
import PreexistingCondition from "./PreexistingCondition";
import SocialHistory from "./SocialHistory";
import Medication from "./Medication";

const PatientFirstIntake = ({ pageNum }) => {
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
      {pageNum === 1 && <CovidHistory covidHistory={covidHistory} />}
      {pageNum === 2 && (
        <PreexistingCondition preexistingCondition={preexistingCondition} />
      )}
      {pageNum === 3 && <SocialHistory socialHistory={socialHistory} />}
      {pageNum === 4 && <Medication medication={medication} />}
    </div>
  );
};

export default PatientFirstIntake;
