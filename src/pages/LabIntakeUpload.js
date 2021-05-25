import React, { useState } from "react";
import cameraIcon from "../assets/images/camera-icon.svg";
import pictureIcon from "../assets/images/picture_icon.svg";
import closeIcon from "../assets/images/icon_close_blue.svg";
import ImagesModal from "./ImagesModal";

import "../App.css";
import "./home.css";

const LabIntakeUpload = () => {
  const [showModal, setShowModal] = useState(false);
  const [fileAspects, setFileAspects] = useState([]);
  const [displayImage, setDisplayImage] = useState(false);
  const [currentFileView, setCurrentFileView] = useState();
  const [medicationFile, setMedicationFile] = useState([]);
  const [imageCount, setImageCount] = useState(0);

  const addImages = () => {
    setShowModal(true);
    setDisplayImage(false);
    setImageCount(imageCount + 1);
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

  return (
    <div className="health-checklist">
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
        imageCount={imageCount}
      />
      {fileAspects?.length > 0 &&
        fileAspects.map((file) => {
          return (
            <>
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
            </>
          );
        })}
    </div>
  );
};

export default LabIntakeUpload;
