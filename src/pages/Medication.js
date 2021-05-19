import React, { useState} from "react";
import cameraIcon from "../assets/images/camera-icon.svg";
import pictureIcon from "../assets/images/picture_icon.svg";
import closeIcon from "../assets/images/icon_close_blue.svg";
import ImagesModal from "./ImagesModal";
import "../App.css";
import "./home.css";
import * as patientService from "../services/patient";
import { NEW_PATIENT_PAGES } from "../constants/constants";

const Medication = ({
  medication,
  setIntakeState,
  intakeState,
  patientDetails,
  hash,
  setPage,
  page,
  progressedPage,
  setProgressedPage,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [fileAspects, setFileAspects] = useState([]);
  const [displayImage, setDisplayImage] = useState(false);
  const [currentFileView, setCurrentFileView] = useState();
  const [medicationFile, setMedicationFile] = useState([]);

  const handleInputChange = (e) => {
    const item = e.target.name;
    setIntakeState({ ...intakeState, [item]: e.target.value });
  };

  const onSubmit = async () => {
    await Promise.all([
      patientService.createPatientIntake({
        form: intakeState,
        patientId: patientDetails.patientId,
      }),
      patientService.uploadMedicationImages({
        intakeForm: intakeState,
        medicationImages: medicationFile,
        patientId: patientDetails.patientId,
      }),
      patientService.UpdateMessageStatus(hash),
      patientService.createFormProgress({
        hashKey: hash,
        patientId: patientDetails.patientId,
        pagenum: NEW_PATIENT_PAGES.medication,
      }),
    ]);

    setProgressedPage(NEW_PATIENT_PAGES.submission);
    setPage(page + 1);
  };

  const addImages = () => {
    setShowModal(true);
    setDisplayImage(false);
  };

  const removeFile = (e, name) => {
    e.stopPropagation();
    setFileAspects(fileAspects.filter((item) => item.fileName !== name));
  };

  const displayImageInModal = (fileImage) => {
    setDisplayImage(true);
    setShowModal(true);
    setCurrentFileView(fileImage);
  };

  const onBackButtonClick = () => {
    setProgressedPage(NEW_PATIENT_PAGES.allergy);
  };

  return (
    <div className="form-content-wrapper">
      <div className="page-title">Medications</div>
      <div className="health-checklist">
        <div className="medications-header">
          Please share your current <b>prescription, lab reports</b> or any
          other medically relevant documents
        </div>

        <div
          className={`camera-icon-container ${
            fileAspects?.length > 4 ? "disabled-container" : "enabled-container"
          } ${showModal ? "active-container" : ""}`}
          onClick={() => addImages()}
        >
          <img className="camera-icon" src={cameraIcon} alt="camera icon" />
        </div>
        <ImagesModal
          onClose={() => setShowModal(false)}
          show={showModal}
          setFileAspects={setFileAspects}
          fileAspects={fileAspects}
          displayImage={displayImage}
          currentFileView={currentFileView}
          setMedicationFile={setMedicationFile}
          medicationFile={medicationFile}
        />
        {fileAspects?.length > 0 &&
          fileAspects.map((file) => {
            return (
              <div
                className="filename-wrapper display-flex-direction-row justify-space-between"
                onClick={() => displayImageInModal(file.fileImage)}
              >
                <div className="display-flex-direction-row">
                  <div className="picture-icon">
                    <img src={pictureIcon} alt="img-icon" />
                  </div>
                  <div className="filename-label">{file.fileName}</div>
                </div>
                <div onClick={(e) => removeFile(e, file.fileName)}>
                  <img src={closeIcon} alt="close-icon" />
                </div>
              </div>
            );
          })}
      </div>

      <div className="other-information-wrapper">
        <div className="other-information">Any other information</div>
        <div className="text-area-container">
          <textarea
            name="otherMedicationsInfo"
            value={intakeState.otherMedicationsInfo}
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
export default Medication;
