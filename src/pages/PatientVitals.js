import React, { useState, useEffect } from "react";
import PatientChecklist from "./PatientChecklist";
import PatientVitalForm from "./PatientVitalForm";
import PatientFirstIntake from "./PatientFirstIntake";
import Submission from "./Submission";
import "./home.css";
import back from "../assets/images/back.svg";
import forward from "../assets/images/forward.svg";

import patient_profile from "../assets/images/icon_userprofile.svg";
import * as patientService from "../services/patient";

import {
  weekDays,
  MONTHS,
  NEW_PATIENT_PAGES,
  EXISTING_PATIENT_PAGES,
  EXISTING_PATIENT_VITAL_PAGES,
  MESSAGE_TYPES,
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
  const [progressedPage, setProgressedPage] = useState(0);
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
    gender: patientDetails.gender,
    dateOfBirth: patientDetails.dateOfBirth,
    height: patientDetails.height,
    weight: patientDetails.weight,
    emailId: patientDetails.email,
    covidPositiveEverBefore: false,
    covidVaccinationDose1Taken: false,
    dateOfDose1Vaccination: "",
    covidVaccinationDose2Taken: false,
    dateOfDose2Vaccination: "",
    dateCovidBefore: "",
    heartDisease: false,
    cancer: false,
    highOrLowBloodPressure: false,
    diabetes: false,
    asthma: false,
    stroke: false,
    highCholesterol: false,
    rash: false,
    headacheOrMigrain: false,
    depression: false,
    others: "",
    noPrexistingCondition: false,
    food: "",
    medications: "",
    otherMedicationsInfo: "",
    medication1DoseFrequency: "",
  });

  useEffect(() => {
    getPageProgress(hashKey);
  }, []);

  const getPageProgress = async (hashKey) => {
    try {
      const response = await patientService.getFormProgress(hashKey);
      if (response.formProgress) {
        setProgressedPage(response.formProgress.latestPage + 1);
      } else {
        setProgressedPage(progressedPage + 1);
      }
    } catch (err) {}
  };

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

  const goBack = () => {
    setPage(page - 1);
    setProgressedPage(progressedPage - 1);
  };

  const goForward = () => {
    setPage(page + 1);
    setProgressedPage(progressedPage + 1);
  };
  const subWrapper =
    messageType === MESSAGE_TYPES.newPatient
      ? FOLLOWING_STATUS.pageNum === NEW_PATIENT_PAGES.preExistingCondition ||
        FOLLOWING_STATUS.pageNum === NEW_PATIENT_PAGES.symptoms
        ? "page1-sub-wrapper"
        : FOLLOWING_STATUS.pageNum === NEW_PATIENT_PAGES.vital ||
          FOLLOWING_STATUS.pageNum === NEW_PATIENT_PAGES.covidHistory
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
        {(progressedPage === NEW_PATIENT_PAGES.patientInfo ||
          progressedPage === NEW_PATIENT_PAGES.covidHistory ||
          progressedPage === NEW_PATIENT_PAGES.preExistingCondition ||
          progressedPage === NEW_PATIENT_PAGES.allergy ||
          progressedPage === NEW_PATIENT_PAGES.medication) && (
          <div className="progress-bar">
            <div class="progress"></div>
            <style>{`
            .progress::after{
              width : ${(progressedPage - 1) * 20}%;
            }
          `}</style>
          </div>
        )}
        <div className="navigation-bar">
          {(progressedPage === NEW_PATIENT_PAGES.covidHistory ||
            progressedPage === NEW_PATIENT_PAGES.preExistingCondition ||
            progressedPage === NEW_PATIENT_PAGES.allergy ||
            progressedPage === NEW_PATIENT_PAGES.medication) && (
            <div className="back-button" onClick={goBack}>
              <img className="nav-img-back" src={back} alt="go back"></img>
              <span>Back</span>
            </div>
          )}
          {(progressedPage === NEW_PATIENT_PAGES.covidHistory ||
            progressedPage === NEW_PATIENT_PAGES.allergy) && (
            <div className="skip-button" onClick={goForward}>
              <span>Skip</span>
              <img
                className="nav-img-skip"
                src={forward}
                alt="go forward"
              ></img>
            </div>
          )}
        </div>
        <div className="header-wrapper page-hero">
          <div className="main-text">{name}</div>
          <div className="dull-text">{phone}</div>
        </div>
      </div>
      <div className="page-hero dull-text text-center"></div>

      {messageType === MESSAGE_TYPES.newPatient ? (
        <div className={`content-wrapper ${subWrapper}`}>
          <div className="form-wrapper">
            <PatientFirstIntake
              pageNum={FOLLOWING_STATUS.pageNum}
              setIntakeState={setIntakeState}
              intakeState={intakeState}
              setPage={setPage}
              page={page}
              messageType={messageType}
              patientDetails={patientDetails}
              hash={hashKey}
              progressedPage={progressedPage}
              setProgressedPage={setProgressedPage}
            />
          </div>
        </div>
      ) : messageType === MESSAGE_TYPES.dailyScreening ? (
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
                hash={hashKey}
                intakeState={intakeState}
                patientDetails={patientDetails}
                state={state}
                messageType={messageType}
              />
            )}
            {FOLLOWING_STATUS.pageNum === EXISTING_PATIENT_PAGES.submission && (
              <Submission />
            )}
          </div>
        </div>
      ) : messageType === MESSAGE_TYPES.vitalsUpdate ? (
        <div className={`content-wrapper ${subWrapper}`}>
          <div className="form-wrapper">
            {FOLLOWING_STATUS.pageNum ===
              EXISTING_PATIENT_VITAL_PAGES.vital && (
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
                state={state}
                messageType={messageType}
              />
            )}
            {FOLLOWING_STATUS.pageNum ===
              EXISTING_PATIENT_VITAL_PAGES.submission && <Submission />}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PatientVitals;
