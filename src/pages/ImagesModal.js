import imageCompression from "browser-image-compression";

const ImagesModal = (props) => {
  const {
    show,
    onClose,
    fileAspects,
    setFileAspects,
    displayImage,
    currentFileView,
    setMedicationFile,
    medicationFile,
    imageCount,
  } = props;

  const imageHandler = async (e) => {
    if (e && e.target.files[0]) {
      const reader = new FileReader();
      const imageFile = e.target.files[0];
      const file = e.target.value.split("\\");
      var options = {
        maxSizeMB: 0.05,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(imageFile, options);
        
        reader.readAsDataURL(compressedFile);
        reader.onload = async function () {
          const imageName = 'Picture'+imageCount+'.'+file[2].split('.').pop();
          const fileInfo = {
            fileName: imageName,
            fileImage: reader.result,
          };
          const imageFileInfo = await imageCompression.getFilefromDataUrl(
            fileInfo.fileImage,
            fileInfo.fileName
          );
          setFileAspects([...fileAspects, fileInfo]);
          setMedicationFile([...medicationFile, imageFileInfo]);
        };
        onClose();
      } catch (err) {}
    }
  };

  if (!show) {
    return null;
  }
  if (!displayImage) {
    return (
      <div className="modal-wrap">
        <div className="container">
          <div className="modal-content-wrap display-flex">
            <div className="camera-options-wrap display-flex border-radius">
              <label className="cameraButton">
                Take photo
                <input
                  type="file"
                  accept="image/*"
                  capture=""
                  onChange={imageHandler}
                  onClick={(e) => (e.target.value = null)}
                />
              </label>
              <label className="cameraButton">
                Choose from gallery
                <input
                  type="file"
                  accept="image/*"
                  onChange={imageHandler}
                  onClick={(e) => (e.target.value = null)}
                />
              </label>
            </div>
            <div
              className="cameraButton cancel-button margin-top-bottom border-radius"
              onClick={onClose}
            >
              Cancel
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="modal-wrap image-wrap-container">
      <img
        className="image-container"
        src={currentFileView}
        alt="image-selected"
      />
      <div className="close-icon-styling" onClick={onClose}>
        Close
      </div>
    </div>
  );
};

export default ImagesModal;
