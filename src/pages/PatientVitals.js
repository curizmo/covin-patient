import React, { useState } from "react";
import PatientChecklist from "./PatientChecklist";
import PatientVitalForm from "./PatientVitalForm";
import PatientFirstIntake from "./PatientFirstIntake";
import Submission from "./Submission";
import "./home.css";
import patient_profile from "../assets/images/icon_userprofile.svg";

import {
  weekDays,
  MONTHS,
  NEW_PATIENT_PAGES,
  EXISTING_PATIENT_PAGES,
} from "../constants/constants";

const PatientVitals = ({
  name,
  phone,
  hashKey,
  patientDetails,
  messageType,
}) => {
  const [temperature, setTemperature] = useState("");
  const [oxygenLevel, setOxygenLevel] = useState("");
  const [pulseRate, setPulseRate] = useState("");
  const [respiratoryRate, setRespiratoryRate] = useState("");
  const [bpUpperRange, setBpUpperRange] = useState(0);
  const [bpLowerRange, setBpLowerRange] = useState(0);
  const [page, setPage] = useState(1);
  const [state, setState] = useState({
    feverOrChills: false,
    cough: false,
    difficultyBreathing: false,
    fatigueMuscleOrBodyAches: false,
    headache: false,
    newlossOfTasteOrSmell: false,
    soreThroat: false,
    congestionOrRunnyNose: false,
    nauseaOrVomiting: false,
    diarrhea: false,
    none: false,
  });
  const [intakeState, setIntakeState] = useState({
    firstName: patientDetails.givenName,
    lastName: patientDetails.familyName,
    gender: "",
    dateOfBirth: "",
    height: "",
    weight: "",
    emailId: patientDetails.email,
    covidPositiveEverBefore: false,
    covidVaccinationDose1Taken: false,
    dateOfDose1Vaccination: "",
    covidVaccinationDose2Taken: false,
    dateOfDose2Vaccination: "",
    heartDisease: false,
    cancer: false,
    highOrLowBloodPressure: false,
    diabetes: false,
    asthma: false,
    stroke: false,
    highCholesterol: false,
    rash: false,
    headacheOrmigrain: false,
    depression: false,
    others: "",
    noPrexistingCondition: false,
    food: "",
    medications: "",
    otherAllergies: "",
    medication1DoseFrequency: "",
    medication2DoseFrequency: "",
    medication3DoseFrequency: "",
    medication4DoseFrequency: "",
    medication5DoseFrequency: "",
  });

  let d = new Date();
  let day = d.getDay();
  let date = d.getDate();
  let month = d.getMonth() + 1;
  let year = d.getFullYear();

  month = MONTHS[month - 1];
  day = weekDays[day];

  const FOLLOWING_STATUS = {
    pageNum: page,
  };

  const subWrapper =
    messageType === "newPatient"
      ? FOLLOWING_STATUS.pageNum === NEW_PATIENT_PAGES.covidHistory ||
        FOLLOWING_STATUS.pageNum === NEW_PATIENT_PAGES.preExistingCondition ||
        FOLLOWING_STATUS.pageNum === NEW_PATIENT_PAGES.symptoms
        ? "page1-sub-wrapper"
        : FOLLOWING_STATUS.pageNum === NEW_PATIENT_PAGES.vital
        ? "page2-sub-wrapper"
        : "page3-sub-wrapper"
      : FOLLOWING_STATUS.pageNum === 1
      ? "page1-sub-wrapper"
      : FOLLOWING_STATUS.pageNum === 2
      ? "page2-sub-wrapper"
      : "page3-sub-wrapper";

  return (
    <div className="wrapper">
      <div className="second-header">
        <img src={patient_profile} alt="user-profile" />
        <div className="header-wrapper page-hero">
          <div className="main-text">{name}</div>
          <div className="dull-text">{phone}</div>
        </div>
      </div>
      <div className="page-hero dull-text">
        {day}, {month} {date}, {year}
      </div>

      {messageType === "newPatient" ? (
        <div className={`content-wrapper ${subWrapper}`}>
          <div className="form-wrapper">
            <PatientFirstIntake
              pageNum={FOLLOWING_STATUS.pageNum}
              setIntakeState={setIntakeState}
              intakeState={intakeState}
              setPage={setPage}
              page={page}
            />
            {FOLLOWING_STATUS.pageNum === NEW_PATIENT_PAGES.symptoms && (
              <PatientChecklist
                state={state}
                setState={setState}
                setPage={setPage}
                page={page}
              />
            )}
            {FOLLOWING_STATUS.pageNum === NEW_PATIENT_PAGES.vital && (
              <PatientVitalForm
                setTemperature={setTemperature}
                setOxygenLevel={setOxygenLevel}
                setPulseRate={setPulseRate}
                setBpUpperRange={setBpUpperRange}
                setBpLowerRange={setBpLowerRange}
                setRespiratoryRate={setRespiratoryRate}
                bpUpperRange={bpUpperRange}
                bpLowerRange={bpLowerRange}
                temperature={temperature}
                respiratoryRate={respiratoryRate}
                bpLowerRange={bpLowerRange}
                bpUpperRange={bpUpperRange}
                oxygenLevel={oxygenLevel}
                pulseRate={pulseRate}
                setPage={setPage}
                page={page}
                hash={hashKey}
                intakeState={intakeState}
                patientDetails={patientDetails}
                patientDetails={patientDetails}
                state={state}
              />
            )}
            {FOLLOWING_STATUS.pageNum === NEW_PATIENT_PAGES.submission && (
              <Submission />
            )}
          </div>
        </div>
      ) : (
        <div className={`content-wrapper ${subWrapper}`}>
          <div className="form-wrapper">
            {FOLLOWING_STATUS.pageNum === EXISTING_PATIENT_PAGES.symptoms && (
              <PatientChecklist
                state={state}
                setState={setState}
                setPage={setPage}
                page={page}
              />
            )}
            {FOLLOWING_STATUS.pageNum === EXISTING_PATIENT_PAGES.vital && (
              <PatientVitalForm
                setTemperature={setTemperature}
                setOxygenLevel={setOxygenLevel}
                setPulseRate={setPulseRate}
                setBpUpperRange={setBpUpperRange}
                setBpLowerRange={setBpLowerRange}
                setRespiratoryRate={setRespiratoryRate}
                bpUpperRange={bpUpperRange}
                bpLowerRange={bpLowerRange}
                temperature={temperature}
                respiratoryRate={respiratoryRate}
                bpLowerRange={bpLowerRange}
                bpUpperRange={bpUpperRange}
                oxygenLevel={oxygenLevel}
                pulseRate={pulseRate}
                setPage={setPage}
                page={page}
                hashKey={hashKey}
                intakeState={intakeState}
                patientDetails={patientDetails}
                state={state}
              />
            )}
            {FOLLOWING_STATUS.pageNum === EXISTING_PATIENT_PAGES.Submission && (
              <Submission />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientVitals;
