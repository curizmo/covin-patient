import React, { useState, useEffect } from "react";
import help_icon from "../assets/images/help-circle.svg";
import "../App.css";
import Modal from "./HelpVideoModal";
import { NUMBER_TYPE_REGEX, MESSAGE_TYPES } from "../constants/constants";
import * as patientService from "../services/patient";

const PatientVitalForm = ({
  setTemperature,
  setOxygenLevel,
  setPulseRate,
  setBpUpperRange,
  setBpLowerRange,
  setRespiratoryRate,
  bpUpperRange,
  bpLowerRange,
  temperature,
  respiratoryRate,
  intakeState,
  oxygenLevel,
  pulseRate,
  messageType,
  hash,
  patientDetails,
  state,
  setPage,
  page,
}) => {
  const [show, setShow] = useState(false);
  const [showBpInvaid, setShowBpInvalid] = useState(false);
  const [showOxygenErrorMessage, setShowOxygenErrorMessage] = useState(false);
  const [showTempErrorMessage, setShowTempErrorMessage] = useState(false);
  const [showPulseErrorMessage, setShowPulseErrorMessage] = useState(false);
  const [showRespirationMessage, setShowRespirationMessage] = useState(false);
  const [showBpMessage, setShowBpMessage] = useState(false);
  const [symptoms, setSymptoms] = useState({});
  const [vitalError, setVitalError] = useState({
    temperature: "",
    respiratoryRate: "",
    bpLowerRange: "",
    bpUpperRange: "",
    oxygenLevel: "",
    pulseRate: "",
  });

  useEffect(() => {
    getSymptoms(patientDetails.patientId);
  }, []);

  const getSymptoms = async (patientId) => {
    const response = await patientService.getSymptomsByPatientId(patientId);
    setSymptoms(JSON.parse(response.symptoms.symptoms));
  };

  useEffect(() => {
    if (parseInt(bpLowerRange) > parseInt(bpUpperRange)) {
      setShowBpInvalid(true);
    } else {
      setShowBpInvalid(false);
    }
  }, [bpUpperRange, bpLowerRange]);

  let today = new Date().toLocaleDateString();

  const validateForm = () => {
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
  };

  const onSubmit = async () => {
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    if (messageType === MESSAGE_TYPES.dailyScreening) {
      await patientService.createPatientVitals({
        patientId: patientDetails.patientId,
        temperature,
        respiratoryRate,
        bpLowerRange,
        bpUpperRange,
        vitalsMeasureOn: today,
        oxygenLevel,
        pulseRate,
        symptoms: state,
      });
    } else if (messageType === MESSAGE_TYPES.vitalsUpdate) {
      await patientService.createPatientVitals({
        patientId: patientDetails.patientId,
        temperature,
        respiratoryRate,
        bpLowerRange,
        bpUpperRange,
        vitalsMeasureOn: today,
        oxygenLevel,
        pulseRate,
        symptoms: symptoms,
      });
    }

    await patientService.UpdateMessageStatus(hash);

    setPage(page + 1);
  };

  return (
    <div className="form-content-wrapper">
      <div className="input-vitals">
        <label>Oxygen Level</label>
        <div className="input-wrap">
          <input
            className="oxygen-input"
            type="text"
            name="OxygenLevel"
            onChange={(e) => {
              if (e.target.value.match(NUMBER_TYPE_REGEX)) {
                setOxygenLevel(e.target.value);
                setShowOxygenErrorMessage(false);
              } else {
                setShowOxygenErrorMessage(true);
              }
            }}
          />
          <div className="icon">%</div>
          <img
            className="help-icon"
            src={help_icon}
            alt="help icon"
            onClick={() => setShow(true)}
          />
        </div>
        {vitalError.oxygenLevel ? (
          <span className="error-message">Oxygen Level is required</span>
        ) : null}
        {showOxygenErrorMessage ? (
          <span className="error-message">Oxygen Level is a number value</span>
        ) : null}
      </div>
      <Modal onClose={() => setShow(false)} show={show} />
      <div className="input-vitals">
        <label>Temperature</label>
        <div className="input-wrap">
          <input
            type="text"
            name="Temperature"
            onChange={(e) => {
              if (e.target.value.match(NUMBER_TYPE_REGEX)) {
                setTemperature(e.target.value);
                setShowTempErrorMessage(false);
              } else {
                setShowTempErrorMessage(true);
              }
            }}
          />
          <div className="icon">°F</div>
          <img
            className="help-icon"
            src={help_icon}
            alt="help icon"
            onClick={() => setShow(true)}
          />
        </div>
        {vitalError.temperature ? (
          <span className="error-message">Temperature is required</span>
        ) : null}
        {showTempErrorMessage ? (
          <span className="error-message">Temperature is a number value</span>
        ) : null}
      </div>
      <div className="input-vitals">
        <label>Pulse rate</label>
        <div className="input-wrap">
          <input
            type="text"
            name="Pulserate"
            onChange={(e) => {
              if (e.target.value.match(NUMBER_TYPE_REGEX)) {
                setPulseRate(e.target.value);
                setShowPulseErrorMessage(false);
              } else {
                setShowPulseErrorMessage(true);
              }
            }}
          />
          <div className="icon">Bpm</div>
          <img
            className="help-icon"
            src={help_icon}
            alt="help icon"
            onClick={() => setShow(true)}
          />
        </div>
        {vitalError.pulseRate ? (
          <span className="error-message">Pulse Rate is required</span>
        ) : null}
        {showPulseErrorMessage ? (
          <span className="error-message">Pulse rate is a number value</span>
        ) : null}
      </div>
      <div className="input-vitals">
        <label>Blood Pressure</label>
        <div className="input-wrap">
          <div className="blood-pressure">
            <input
              className="bp"
              type="text"
              name="BloodPressureHigh"
              onChange={(e) => {
                if (e.target.value.match(NUMBER_TYPE_REGEX)) {
                  setBpUpperRange(e.target.value);
                  setShowBpMessage(false);
                } else {
                  setShowBpMessage(true);
                }
              }}
            />

            <div className="icon-higher">Higher</div>
            <input
              className="bp bp-lower"
              type="text"
              name="BloodPressureLow"
              onChange={(e) => {
                if (e.target.value.match(NUMBER_TYPE_REGEX)) {
                  setBpLowerRange(e.target.value);
                  setShowBpMessage(false);
                } else {
                  setShowBpMessage(true);
                }
              }}
            />

            <div className="icon-lower">Lower</div>
          </div>
          <img
            className="help-icon"
            src={help_icon}
            alt="help icon"
            onClick={() => setShow(true)}
          />
        </div>
        {vitalError.bpLowerRange ? (
          <span className="error-message">Blood Pressure is required</span>
        ) : null}
        {showBpInvaid ? (
          <span className="error-message">
            Higher Range must be greater that Lower Range
          </span>
        ) : null}
        {showBpMessage ? (
          <span className="error-message">
            Blood Pressure is a number value
          </span>
        ) : null}
      </div>
      <div className="input-vitals">
        <label>Respiratory Rate</label>
        <div className="input-wrap">
          <input
            type="text"
            name="respiratoryRate"
            onChange={(e) => {
              if (e.target.value.match(NUMBER_TYPE_REGEX)) {
                setRespiratoryRate(e.target.value);
                setShowRespirationMessage(false);
              } else {
                setShowRespirationMessage(true);
              }
            }}
          />
          <div className="icon">Breaths</div>
          <img
            className="help-icon"
            src={help_icon}
            alt="help icon"
            onClick={() => setShow(true)}
          />
        </div>
        {vitalError.respiratoryRate ? (
          <span className="error-message">Respiratory Rate is required</span>
        ) : null}
        {showRespirationMessage ? (
          <span className="error-message">
            Respiratory Rate is a number value
          </span>
        ) : null}
      </div>
      <button className="submit-button submit-btn" onClick={onSubmit}>
        SUBMIT
      </button>
    </div>
  );
};

export default PatientVitalForm;
