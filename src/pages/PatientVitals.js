import React, { useState, useEffect, useMemo } from "react";
import PatientChecklist from "./PatientChecklist";
import PatientVitalForm from "./PatientVitalForm";
import PatientFirstIntake from "./PatientFirstIntake";
import DailyStatus from "./DailyStatus";
import LabResults from "./LabResults";
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
  intakeForm,
}) => {
  const [temperature, setTemperature] = useState("");
  const [oxygenLevel, setOxygenLevel] = useState("");
  const [pulseRate, setPulseRate] = useState("");
  const [respiratoryRate, setRespiratoryRate] = useState("");
  const [bpUpperRange, setBpUpperRange] = useState(0);
  const [bpLowerRange, setBpLowerRange] = useState(0);
  const [progressedPage, setProgressedPage] = useState(0);
  const [page, setPage] = useState(1);
  const [pageLoaded, setPageLoaded] = useState(false);
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
    statusToday: "",
  });

  const [labState, setLabState] = useState({
    crp: "",
    esr: "",
    dDimer: "",
    ferritin: "",
    ldh: "",
    wbc: "",
    neutrophil: "",
    lymphocytes: "",
    eosinophils: "",
    basophils: "",
    platelets: "",
    otherLabResultsInfo: "",
  });

  const [intakeState, setIntakeState] = useState({
    firstName: patientDetails.givenName,
    lastName: patientDetails.familyName,
    gender: patientDetails.gender,
    dateOfBirth: patientDetails.dateOfBirth,
    height: patientDetails.height || "",
    weight: patientDetails.weight,
    emailId: patientDetails.email,
    address: patientDetails.address1,
    state: patientDetails.state,
    city: patientDetails.city,
    pinCode: patientDetails.zip,
    covidPositiveEverBefore: intakeForm.covidPositiveEverBefore || false,
    covidVaccinationDose1Taken: intakeForm.covidVaccinationDose1Taken || false,
    dateOfDose1Vaccination: intakeForm.dateOfDose1Vaccination || "",
    covidVaccinationDose2Taken: intakeForm.covidVaccinationDose2Taken || false,
    dateOfDose2Vaccination: intakeForm.dateOfDose2Vaccination || "",
    dateCovidBefore: intakeForm.dateCovidBefore || "",
    heartDisease: intakeForm.heartDisease || false,
    cancer: intakeForm.cancer || false,
    highOrLowBloodPressure: intakeForm.highOrLowBloodPressure || false,
    diabetes: intakeForm.diabetes || false,
    asthma: intakeForm.asthma || false,
    stroke: intakeForm.stroke || false,
    highCholesterol: intakeForm.highCholesterol || false,
    rash: intakeForm.rash || false,
    headacheOrMigrain: intakeForm.headacheOrMigrain || false,
    depression: intakeForm.depression || false,
    others: intakeForm.others || "",
    noPrexistingCondition: intakeForm.noPrexistingCondition || false,
    food: intakeForm.food || "",
    medications: intakeForm.medications || "",
    otherMedicationsInfo: intakeForm.otherMedicationsInfo || "",
  });

  useEffect(() => {
    if (messageType === MESSAGE_TYPES.newPatient) {
      getPageProgress(hashKey);
    }
  }, []);

  const getPageProgress = async (hashKey) => {
    try {
      const response = await patientService.getFormProgress(hashKey);
      setProgressedPage(
        (response?.formProgress?.latestPage || progressedPage) + 1
      );
      setPageLoaded(true);
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
    setPageLoaded(true);
    setPage(page - 1);
    setProgressedPage(progressedPage - 1);
  };

  const subWrapper = useMemo(() => {
    if (messageType === MESSAGE_TYPES.newPatient) {
      if (
        FOLLOWING_STATUS.pageNum === NEW_PATIENT_PAGES.preExistingCondition ||
        FOLLOWING_STATUS.pageNum === NEW_PATIENT_PAGES.symptoms
      ) {
        return "page1-sub-wrapper";
      } else if (
        FOLLOWING_STATUS.pageNum === NEW_PATIENT_PAGES.vital ||
        FOLLOWING_STATUS.pageNum === NEW_PATIENT_PAGES.covidHistory
      ) {
        return "page2-sub-wrapper";
      } else {
        return "page3-sub-wrapper";
      }
    } else if (messageType === MESSAGE_TYPES.dailyScreening) {
      if (
        FOLLOWING_STATUS.pageNum === EXISTING_PATIENT_PAGES.dailyStatus ||
        FOLLOWING_STATUS.pageNum === EXISTING_PATIENT_PAGES.symptoms
      ) {
        return "page1-sub-wrapper";
      } else if (
        FOLLOWING_STATUS.pageNum === EXISTING_PATIENT_PAGES.vital 
      ) {
        return "page2-sub-wrapper";
      } else {
        return "page3-sub-wrapper";
      }
    } else {
      if (FOLLOWING_STATUS.pageNum === EXISTING_PATIENT_VITAL_PAGES.vital) {
        return "page1-sub-wrapper";
      } else if (
        FOLLOWING_STATUS.pageNum === EXISTING_PATIENT_VITAL_PAGES.submission
      ) {
        return "page3-sub-wrapper";
      } else {
        return "page2-sub-wrapper";
      }
    }
  }, [FOLLOWING_STATUS.pageNum]);

  if (!pageLoaded && messageType === MESSAGE_TYPES.newPatient) {
    return (
      <div className="loader-wrapper">
        <div className="loader" />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="second-header">
        <div className="navigation-bar">
          {[
            NEW_PATIENT_PAGES.covidHistory,
            NEW_PATIENT_PAGES.preExistingCondition,
            NEW_PATIENT_PAGES.allergy,
            NEW_PATIENT_PAGES.medication,
          ].includes(progressedPage) && (
            <div className="back-button" onClick={goBack}>
              <img className="nav-img-back" src={back} alt="go back"></img>
              <span>Back</span>
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
              setPageLoaded={true}
            />
            {progressedPage === NEW_PATIENT_PAGES.symptoms && (
              <PatientChecklist
                state={state}
                setState={setState}
                setPage={setPage}
                page={page}
                hash={hashKey}
                messageType={messageType}
                patientDetails={patientDetails}
                progressedPage={progressedPage}
                setProgressedPage={setProgressedPage}
              />
            )}
            {progressedPage === NEW_PATIENT_PAGES.vitals && (
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
                progressedPage={progressedPage}
                setProgressedPage={setProgressedPage}
              />
            )}
            {progressedPage === NEW_PATIENT_PAGES.submission && <Submission />}
          </div>
        </div>
      ) : messageType === MESSAGE_TYPES.dailyScreening ? (
        <div className={`content-wrapper ${subWrapper}`}>
          <div className="form-wrapper">
            {FOLLOWING_STATUS.pageNum ===
              EXISTING_PATIENT_PAGES.dailyStatus && (
              <DailyStatus
                state={state}
                setState={setState}
                setPage={setPage}
                page={page}
              />
            )}
            {FOLLOWING_STATUS.pageNum === EXISTING_PATIENT_PAGES.symptoms && (
              <PatientChecklist
                state={state}
                setState={setState}
                setPage={setPage}
                page={page}
                messageType={messageType}
                hash={hashKey}
                patientDetails={patientDetails}
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
            {FOLLOWING_STATUS.pageNum === EXISTING_PATIENT_PAGES.lab && (
              <LabResults
                labState={labState}
                setLabState={setLabState}
                patientDetails={patientDetails}
                setPage={setPage}
                page={page}
                hash={hashKey}
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
            {FOLLOWING_STATUS.pageNum === EXISTING_PATIENT_VITAL_PAGES.lab && (
              <LabResults
                labState={labState}
                setLabState={setLabState}
                patientDetails={patientDetails}
                setPage={setPage}
                page={page}
                hash={hashKey}
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
