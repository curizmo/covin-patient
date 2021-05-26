import React, { useState, useEffect } from "react";
import LabIntakeUpload from "./LabIntakeUpload";
import LabIntakeInput from "./LabIntakeInput";
import "../App.css";
import "./home.css";
import { LAB_INPUT_TYPE } from "../constants/constants";
import * as patientService from "../services/patient";

const LabResults = ({
  labState,
  setLabState,
  patientDetails,
  setPage,
  page,
  hash,
}) => {
  const [intakeType, setIntakeTpye] = useState(LAB_INPUT_TYPE.type);
  const [showModal, setShowModal] = useState(false);
  const [fileAspects, setFileAspects] = useState([]);
  const [displayImage, setDisplayImage] = useState(false);
  const [currentFileView, setCurrentFileView] = useState();
  const [medicationFile, setMedicationFile] = useState([]);
  const [imageCount, setImageCount] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCheckboxChange = (e) => {
    setIntakeTpye(e.target.value);
  };

  const handleInputChange = (e) => {
    const item = e.target.name;
    setLabState({ ...labState, [item]: e.target.value });
  };

  const onSubmit = async () => {
    await Promise.all([
      patientService.uploadLabImages({
        intakeForm: labState,
        labImages: medicationFile,
        patientId: patientDetails.patientId,
      }),
      patientService.UpdateMessageStatus(hash),
    ]);

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
        <LabIntakeInput labState={labState} setLabState={setLabState} />
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

      <button className="submit-button submit-btn" onClick={onSubmit}>
        SUBMIT
      </button>
    </div>
  );
};

export default LabResults;
