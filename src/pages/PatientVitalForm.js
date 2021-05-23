import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";

import help_icon from "../assets/images/help-circle.svg";
import "../App.css";
import Modal from "./HelpVideoModal";
import {
  NUMBER_TYPE_REGEX,
  MESSAGE_TYPES,
  NEW_PATIENT_PAGES,
  DATE_FORMAT,
} from "../constants/constants";
import * as patientService from "../services/patient";

const HELP_VIDEO_URLS = {
  TEMPERATURE: "https://www.youtube.com/embed/reHREKBXH_k",
  RESPIRATORY_RATE: "https://www.youtube.com/embed/ccKGzZXNKYs",
  BP_RANGE: "https://www.youtube.com/embed/GSNZVaW1Wg4",
  OXYGEN_LEVEL: "https://www.youtube.com/embed/YyMiSUfZtyU",
  PULSE_RATE: "https://www.youtube.com/embed/ifnYjD4IKus",
};

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
  progressedPage,
  setProgressedPage,
}) => {
  const [show, setShow] = useState(false);
  const [helpVideoUrl, setHelpVideoUrl] = useState('');
  const [showBpInvaid, setShowBpInvalid] = useState(false);
  const [showOxygenErrorMessage, setShowOxygenErrorMessage] = useState(false);
  const [showTempErrorMessage, setShowTempErrorMessage] = useState(false);
  const [showPulseErrorMessage, setShowPulseErrorMessage] = useState(false);
  const [showRespirationMessage, setShowRespirationMessage] = useState(false);
  const [showBpMessage, setShowBpMessage] = useState(false);
  const [symptoms, setSymptoms] = useState({});
  const [vitalError, setVitalError] = useState(false);
  const [isValidated, setIsValidated] = useState(false);

  useEffect(() => {
    getSymptoms(patientDetails.patientId);
    window.scrollTo(0, 0);
  }, []);

  const getSymptoms = async (patientId) => {
    const response = await patientService.getSymptomsByPatientId(patientId);
    setSymptoms(JSON.parse(response?.symptoms?.symptoms));
  };

  const showHelpVideoModal = (videoUrl) => () => {
    setHelpVideoUrl(videoUrl);
    setShow(true);
  };

  const hideHelpVideoModal = () => {
    setHelpVideoUrl('');
    setShow(false);
  };

  useEffect(() => {
    if (parseInt(bpLowerRange) > parseInt(bpUpperRange) || (bpLowerRange && !bpUpperRange) || (!bpLowerRange && bpUpperRange)) {
      setShowBpInvalid(true);
    } else {
      setShowBpInvalid(false);
    }
  }, [bpUpperRange, bpLowerRange]);

  let today = new Date().toLocaleDateString();

  const checkIsAtLeastOneField = useCallback(() => {
    return [temperature,
      oxygenLevel,
      pulseRate,
      bpUpperRange,
      bpLowerRange,
      temperature,
      respiratoryRate]
      .some((v) => v);
  }, [temperature,
    oxygenLevel,
    pulseRate,
    bpUpperRange,
    bpLowerRange,
    temperature,
    respiratoryRate]);

  const validateForm = useCallback(() => {
    setIsValidated(true);
    const isAnError = [showBpInvaid,
      showOxygenErrorMessage,
      showTempErrorMessage,
      showPulseErrorMessage,
      showRespirationMessage,
      showBpMessage].some((v) => v);
    const isAtLeastOneField = checkIsAtLeastOneField();
    setVitalError(!isAtLeastOneField);

    return isAtLeastOneField && !isAnError;
  }, [checkIsAtLeastOneField,
      showBpInvaid,
      showOxygenErrorMessage,
      showTempErrorMessage,
      showPulseErrorMessage,
      showRespirationMessage,
      showBpMessage]);

  const onSubmit = async () => {
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    if (
      messageType === MESSAGE_TYPES.newPatient ||
      messageType === MESSAGE_TYPES.dailyScreening
    ) {
      await patientService.createPatientVitals({
        patientId: patientDetails.patientId,
        temperature,
        respiratoryRate,
        bpLowerRange,
        bpUpperRange,
        vitalsMeasureOn: moment().format(DATE_FORMAT.yyyymmdd),
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
        vitalsMeasureOn: moment().format(DATE_FORMAT.yyyymmdd),
        oxygenLevel,
        pulseRate,
        symptoms: symptoms,
      });
    }
    if (messageType === MESSAGE_TYPES.newPatient) {
      await patientService.createFormProgress({
        hashKey: hash,
        patientId: patientDetails.patientId,
        pagenum: NEW_PATIENT_PAGES.vitals,
      });

      setProgressedPage(NEW_PATIENT_PAGES.submission);
    }

    await patientService.UpdateMessageStatus(hash);

    setPage(page + 1);
  };

  const onUpdateInput = (setShowErrorMessage, setValue) => (e) => {
    const value = e.target.value;
    const min = e.target.min;
    const max = e.target.max;
    if (!value || +value >= +min && +value <= +max) {
      setValue(e.target.value);
      setShowErrorMessage(false);
    } else {
      setShowErrorMessage(true);
    }
  };

  useEffect(() => {
    if (isValidated) {
      setVitalError(!checkIsAtLeastOneField());
    }
  }, [checkIsAtLeastOneField, isValidated]);

  return (
    <div className="form-content-wrapper">
      <div className="input-vitals">
        <label>Oxygen Level</label>
        <div className="input-wrap">
          <input
            className="oxygen-input"
            type="number"
            min="0"
            max="100"
            name="OxygenLevel"
            onChange={onUpdateInput(setShowOxygenErrorMessage, setOxygenLevel)}
          />
          <div className="icon">%</div>
          <img
            className="help-icon"
            src={help_icon}
            alt="help icon"
            onClick={showHelpVideoModal(HELP_VIDEO_URLS.OXYGEN_LEVEL)}
          />
        </div>
        {showOxygenErrorMessage ? (
          <span className="error-message">Oxygen Level should be between 0 and 100</span>
        ) : null}
      </div>
      <Modal onClose={hideHelpVideoModal} show={show} src={helpVideoUrl} />
      <div className="input-vitals">
        <label>Temperature</label>
        <div className="input-wrap">
          <input
            type="number"
            min="90"
            max="108"
            name="Temperature"
            onChange={onUpdateInput(setShowTempErrorMessage, setTemperature)}
          />
          <div className="icon">°F</div>
          <img
            className="help-icon"
            src={help_icon}
            alt="help icon"
            onClick={showHelpVideoModal(HELP_VIDEO_URLS.TEMPERATURE)}
          />
        </div>
        {showTempErrorMessage ? (
          <span className="error-message">Temperature should be between 90 and 108</span>
        ) : null}
      </div>
      <div className="input-vitals">
        <label>Pulse rate</label>
        <div className="input-wrap">
          <input
            type="number"
            min="0"
            max="300"
            name="Pulserate"
            onChange={onUpdateInput(setShowPulseErrorMessage, setPulseRate)}
          />
          <div className="icon">beats/min</div>
          <img
            className="help-icon"
            src={help_icon}
            alt="help icon"
            onClick={showHelpVideoModal(HELP_VIDEO_URLS.PULSE_RATE)}
          />
        </div>
        {showPulseErrorMessage ? (
          <span className="error-message">Pulse rate should be between 0 and 300</span>
        ) : null}
      </div>
      <div className="input-vitals">
        <label>Blood Pressure</label>
        <div className="input-wrap">
          <div className="blood-pressure">
            <input
              className="bp"
              min="0"
              max="300"
              name="BloodPressureHigh"
              onChange={onUpdateInput(setShowBpMessage, setBpUpperRange)}
            />

            <div className="icon-higher">Higher</div>
            <input
              className="bp bp-lower"
              type="number"
              min="0"
              max="300"
              name="BloodPressureLow"
              onChange={onUpdateInput(setShowBpMessage, setBpLowerRange)}
            />

            <div className="icon-lower">Lower</div>
          </div>
          <img
            className="help-icon"
            src={help_icon}
            alt="help icon"
            onClick={showHelpVideoModal(HELP_VIDEO_URLS.BP_RANGE)}
          />
        </div>
        {showBpInvaid ? (
          <span className="error-message">
            Both Ranges should be set, Higher Range must be greater that Lower Range
          </span>
        ) : null}
        {showBpMessage ? (
          <span className="error-message">
            Blood Pressure should be between 0 and 300
          </span>
        ) : null}
      </div>
      <div className="input-vitals">
        <label>Respiratory Rate</label>
        <div className="input-wrap">
          <input
            type="number"
            min="0"
            max="50"
            name="respiratoryRate"
            onChange={onUpdateInput(setShowRespirationMessage, setRespiratoryRate)}
          />
          <div className="icon">breaths/min</div>
          <img
            className="help-icon"
            src={help_icon}
            alt="help icon"
            onClick={showHelpVideoModal(HELP_VIDEO_URLS.RESPIRATORY_RATE)}
          />
        </div>
        {showRespirationMessage ? (
          <span className="error-message">
            Respiratory Rate should be between 0 and 50
          </span>
        ) : null}
      </div>
        {vitalError ? (
          <span className="error-message">At least one field is required</span>
        ) : null}
      <button className="submit-button submit-btn" onClick={onSubmit}>
        SUBMIT
      </button>
    </div>
  );
};

export default PatientVitalForm;
