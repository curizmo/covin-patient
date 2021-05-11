import React, { useState } from "react";
import PatientChecklist from "./PatientChecklist";
import PatientVitalForm from "./PatientVitalForm";
import Submission from "./Submission";
import * as patientService from "../services/patient";
import "./home.css";
import patient_profile from "../assets/images/icon_userprofile.svg";

import { weekDays, MONTHS } from "../constants/constants";

const PatientVitals = ({ name, phone, hashKey, patientId }) => {
  const [temperature, setTemperature] = useState("");
  const [oxygenLevel, setOxygenLevel] = useState("");
  const [pulseRate, setPulseRate] = useState("");
  const [respiratoryRate, setRespiratoryRate] = useState("");
  const [bpUpperRange, setBpUpperRange] = useState("");
  const [bpLowerRange, setBpLowerRange] = useState("");
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

  let today = new Date().toLocaleDateString();

  const FOLLOWING_STATUS = {
    pageNum: page,
  };

  let d = new Date();
  let day = d.getDay();
  let date = d.getDate();
  let month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
  let year = d.getFullYear();

  month = MONTHS[month - 1];
  day = weekDays[day];

  const onSubmit = async () => {
    setPage(page + 1);

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
  };

  const subWrapper =
    FOLLOWING_STATUS.pageNum === 1
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

      <div className={`content-wrapper ${subWrapper}`}>
        <div className="form-wrapper">
          {FOLLOWING_STATUS.pageNum === 1 && (
            <PatientChecklist state={state} setState={setState} />
          )}
          {FOLLOWING_STATUS.pageNum === 2 && (
            <PatientVitalForm
              setTemperature={setTemperature}
              setOxygenLevel={setOxygenLevel}
              setPulseRate={setPulseRate}
              setBpUpperRange={setBpUpperRange}
              setBpLowerRange={setBpLowerRange}
              setRespiratoryRate={setRespiratoryRate}
            />
          )}
          {FOLLOWING_STATUS.pageNum === 3 && <Submission />}
        </div>

        {FOLLOWING_STATUS.pageNum === 1 ? (
          <button
            className="submit-button submit-btn"
            onClick={() => {
              setPage(page + 1);
            }}
          >
            NEXT
          </button>
        ) : FOLLOWING_STATUS.pageNum === 2 ? (
          <button className="submit-button submit-btn" onClick={onSubmit}>
            SUBMIT
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default PatientVitals;
