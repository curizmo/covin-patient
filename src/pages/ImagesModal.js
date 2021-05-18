import imageCompression from "browser-image-compression";

const ImagesModal = (props) => {
  const {
    show,
    onClose,
    fileAspects,
    setFileAspects,
    displayImage,
    currentFileView,
  } = props;

  const imageHandler = (e) => {
    if (e && e.target.files[0]) {
      const reader = new FileReader();
      const imageFile = e.target.files[0];
      const file = e.target.value.split("\\");
      var options = {
        maxSizeMB: 0.05,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      imageCompression(imageFile, options)
        .then(function (compressedFile) {
          reader.readAsDataURL(compressedFile);
          reader.onload = function () {
            const fileInfo = {
              fileName: file[2],
              fileImage: reader.result,
            };
            setFileAspects([...fileAspects, fileInfo]);
            onClose();
          };
          return null;
        })
        .catch(function (error) {
          console.error(error.message);
          onClose();
        });
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
              <label class="cameraButton">
                Take photo
                <input
                  type="file"
                  accept="image/*"
                  capture=""
                  onChange={imageHandler}
                  onClick={(e) => (e.target.value = null)}
                />
              </label>
              <label class="cameraButton">
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