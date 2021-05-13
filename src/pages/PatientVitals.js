import React, { useState } from "react";
import PatientChecklist from "./PatientChecklist";
import PatientVitalForm from "./PatientVitalForm";
import PatientFirstIntake from "./PatientFirstIntake";
import Submission from "./Submission";
import * as patientService from "../services/patient";
import "./home.css";
import patient_profile from "../assets/images/icon_userprofile.svg";

import {
  weekDays,
  MONTHS,
  NEW_PATIENT_PAGES,
  EXISTING_PATIENT_PAGES,
} from "../constants/constants";

const PatientVitals = ({ name, phone, hashKey, patientId, messageType }) => {
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
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    height: "",
    weight: "",
    emailId: "",
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
    food: "",
    medications: "",
    otherAllergies: "",
    medication1DoseFrequency: "",
    medication2DoseFrequency: "",
    medication3DoseFrequency: "",
    medication4DoseFrequency: "",
    medication5DoseFrequency: "",
  });
  const [symptomsError, setSymptomsError] = useState(false);
  const [vitalError, setVitalError] = useState({
    temperature: "",
    respiratoryRate: "",
    bpLowerRange: "",
    bpUpperRange: "",
    oxygenLevel: "",
    pulseRate: "",
  });
  const [personalInfoError, setPersonalInfoError] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    height: "",
    weight: "",
    emailId: "",
  });

  const validateForm = () => {
    if (
      (messageType === "newPatient" && page === NEW_PATIENT_PAGES.symptoms) ||
      (messageType !== "newPatient" && page === EXISTING_PATIENT_PAGES.symptoms)
    ) {
      const isAnyTrue = Object.keys(state)
        .map((key) => state[key])
        .some((v) => v === true);

      setSymptomsError(!isAnyTrue);

      return isAnyTrue;
    } else {
      const vitalErrors = {
        temperature: !temperature,
        respiratoryRate: !respiratoryRate,
        bpLowerRange: !bpLowerRange,
        bpUpperRange: !bpUpperRange,
        oxygenLevel: !oxygenLevel,
        pulseRate: !pulseRate,
      };

      const isAnyTrue = Object.keys(vitalErrors)
        .map((key) => vitalErrors[key])
        .some((v) => v === true);

      setVitalError(vitalErrors);

      return !isAnyTrue;
    }
  };

  const validatePatientPersonalForm = () => {
    if (
      messageType === "newPatient" &&
      page === NEW_PATIENT_PAGES.patientInfo
    ) {
      const PaitientInfoError = {
        firstName: !intakeState.firstName,
        lastName: !intakeState.lastName,
        gender: !intakeState.gender,
        dateOfBirth: !intakeState.dateOfBirth,
        height: !intakeState.height,
        weight: !intakeState.weight,
        emailId: !intakeState.emailId,
      };
      const isAnyTrue = Object.keys(PaitientInfoError)
        .map((key) => PaitientInfoError[key])
        .some((v) => v === true);

      setPersonalInfoError(PaitientInfoError);

      return !isAnyTrue;
    }
  };

  let today = new Date().toLocaleDateString();

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

  const onNext = () => {
    if (
      (messageType === "newPatient" && page === NEW_PATIENT_PAGES.symptoms) ||
      (messageType !== "newPatient" && page === EXISTING_PATIENT_PAGES.symptoms)
    ) {
      const isValid = validateForm();
      if (!isValid) {
        return;
      }
    }

    if (
      messageType === "newPatient" &&
      page === NEW_PATIENT_PAGES.patientInfo
    ) {
      const isValid = validatePatientPersonalForm();
      if (!isValid) {
        return;
      }
    }

    setPage(page + 1);
  };

  const onSubmit = async () => {
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    await patientService.createPatientIntake({
      form: intakeState,
      patientId: patientId,
    });

    await patientService.createPatientVitals({
      patientId: patientId,
      temperature,
      respiratoryRate,
      bpLowerRange,
      bpUpperRange,
      vitalsMeasureOn: today,
      oxygenLevel,
      pulseRate,
      symptoms: state,
    });

    await patientService.UpdateMessageStatus(hashKey);
    setPage(page + 1);
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
              personalInfoError={personalInfoError}
            />
            {FOLLOWING_STATUS.pageNum === NEW_PATIENT_PAGES.symptoms && (
              <PatientChecklist
                state={state}
                setState={setState}
                symptomsError={symptomsError}
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
                vitalError={vitalError}
              />
            )}
            {FOLLOWING_STATUS.pageNum === NEW_PATIENT_PAGES.submission && (
              <Submission />
            )}

            {FOLLOWING_STATUS.pageNum === NEW_PATIENT_PAGES.vital ? (
              <button className="submit-button submit-btn" onClick={onSubmit}>
                SUBMIT
              </button>
            ) : FOLLOWING_STATUS.pageNum ===
              NEW_PATIENT_PAGES.submission ? null : (
              <button className="submit-button submit-btn" onClick={onNext}>
                NEXT
              </button>
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
                symptomsError={symptomsError}
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
                vitalError={vitalError}
              />
            )}
            {FOLLOWING_STATUS.pageNum === EXISTING_PATIENT_PAGES.Submission && (
              <Submission />
            )}
            {FOLLOWING_STATUS.pageNum === EXISTING_PATIENT_PAGES.symptoms ? (
              <button
                className="submit-button submit-btn"
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                NEXT
              </button>
            ) : FOLLOWING_STATUS.pageNum === EXISTING_PATIENT_PAGES.vital ? (
              <button className="submit-button submit-btn" onClick={onSubmit}>
                SUBMIT
              </button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientVitals;
