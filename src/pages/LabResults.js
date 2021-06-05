import React, { useState, useEffect } from "react";
import LabIntakeUpload from "./LabIntakeUpload";
import LabIntakeInput from "./LabIntakeInput";
import "../App.css";
import "./home.css";
import { LAB_INPUT_TYPE } from "../constants/constants";
import * as patientService from "../services/patient";
import { SubmitButton } from "../components/common/SubmitButton";

const LabResults = ({
  labState,
  setLabState,
  patientDetails,
  setPage,
  page,
  hash,
}) => {
  const [intakeType, setIntakeType] = useState(LAB_INPUT_TYPE.picture);
  const [showModal, setShowModal] = useState(false);
  const [fileAspects, setFileAspects] = useState([]);
  const [displayImage, setDisplayImage] = useState(false);
  const [currentFileView, setCurrentFileView] = useState();
  const [medicationFile, setMedicationFile] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const [isinputValid, setIsInputValid] = useState(false);
  const [isDateSet, setIsDateSet] = useState(true);
  const [disableInput, setDisableInput] = useState(false);
  const [labError, setLabError] = useState({
    crp: false,
    esr: false,
    dDimer: false,
    ferritin: false,
    ldh: false,
    wbc: false,
    neutrophil: false,
    lymphocytes: false,
    eosinophils: false,
    basophils: false,
    platelets: false,
    otherLabResultsInfo: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    validateForm();
  }, [labError]);

  const validateForm = () => {
    const isAnyTrue = Object.keys(labError).some((key) => labError[key]);

    setIsInputValid(isAnyTrue);
  };

  const checkInputValues = () => {
    const { specimenDrawnDate, otherLabResultsInfo, ...rest } = labState;
    const isAnyTrue = Object.keys(rest).some((key) => rest[key]);
    return isAnyTrue;
  };

  useEffect(() => {
    setIsDateSet(true);
    setDisableInput(labState["specimenDrawnDate"] === "");
  }, [labState["specimenDrawnDate"]]);

  const handleCheckboxChange = (e) => {
    setIntakeType(e.target.value);
  };

  const handleInputChange = (e) => {
    const item = e.target.name;
    setLabState({ ...labState, [item]: e.target.value });
  };

  const onSubmit = async () => {
    setIsLoading(true);
    const hasLabInput = checkInputValues();
    if (hasLabInput && labState["specimenDrawnDate"] === "") {
      setIsLoading(false);
      setIsDateSet(false);
      return;
    }

    await Promise.all([
      patientService.uploadLabImages({
        intakeForm: labState,
        labImages: medicationFile,
        patientId: patientDetails.patientId,
        messageHash: hash,
      }),
      patientService.UpdateMessageStatus(hash),
    ]);

    setIsLoading(false);
    setPage(page + 1);
  };

  return (
    <div className="form-content-wrapper">
      <div className="lab-title">Lab Results (if available)</div>
      <div className="health-checklist no-select"></div>
      <div className="lab-intake-type">
        <span className="gender-radio-span">
          <input
            className="gender-radio"
            type="radio"
            name="labIntakeOption"
            value={LAB_INPUT_TYPE.picture}
            onChange={handleCheckboxChange}
            checked={intakeType === LAB_INPUT_TYPE.picture}
          />
          <label className="gender-radio-label">Take a Picture</label>
        </span>
        <span className="gender-radio-span">
          <input
            className="gender-radio"
            type="radio"
            name="labIntakeOption"
            value={LAB_INPUT_TYPE.type}
            onChange={handleCheckboxChange}
            checked={intakeType === LAB_INPUT_TYPE.type}
          />
          <label className="gender-radio-label">Type Results</label>
        </span>
      </div>
      {intakeType === "picture" && (
        <LabIntakeUpload
          showModal={showModal}
          setShowModal={setShowModal}
          fileAspects={fileAspects}
          setFileAspects={setFileAspects}
          displayImage={displayImage}
          setDisplayImage={setDisplayImage}
          currentFileView={currentFileView}
          setCurrentFileView={setCurrentFileView}
          medicationFile={medicationFile}
          setMedicationFile={setMedicationFile}
          imageCount={imageCount}
          setImageCount={setImageCount}
        />
      )}

      {intakeType === "type" && (
        <LabIntakeInput
          labState={labState}
          setLabState={setLabState}
          disableInput={disableInput}
          labError={labError}
          setLabError={setLabError}
        />
      )}

      <div className="other-information-wrapper">
        <div className="other-information">
          Any other comments to share with Doctor?
        </div>
        <div className="text-area-container">
          <textarea
            name="otherLabResultsInfo"
            value={labState.otherLabResultsInfo}
            onChange={handleInputChange}
            className="txtArea"
          ></textarea>
        </div>
      </div>

      {isinputValid ? (
        <p className="error-message">All values must be valid</p>
      ) : null}
      {!isDateSet ? (
        <p className="error-message">
          Lab specimen drawn date is a required field
        </p>
      ) : null}
      <SubmitButton
        isLoading={isLoading}
        onClick={onSubmit}
        disabled={isinputValid}
        text="SUBMIT"
      />
    </div>
  );
};

export default LabResults;
