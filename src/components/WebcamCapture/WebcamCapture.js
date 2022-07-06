import React, { useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

const WebcamCapture = ({ handleClick }) => {
  const [image, setImage] = useState("");
  const captureImage = (imageSrc) => {
    setImage(imageSrc);
  };
  const retakePhoto = () => {
    setImage("");
  };
  const addPhoto = () => {
    handleClick(image);
    setImage("");
  };

  return (
    <div className="webcam-container">
      <div className="webcam-img">
        {image === "" && (
          <Webcam
            audio={false}
            height={720}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={videoConstraints}
          >
            {({ getScreenshot }) => (
              <button
                onClick={() => {
                  const imageSrc = getScreenshot();
                  captureImage(imageSrc);
                }}
                className="webcam-btn"
              >
                Capture image
              </button>
            )}
          </Webcam>
        )}
        {image !== "" && (
          <div>
            <img alt="latest-item" src={image} />
            <div>
              <button
                onClick={() => {
                  retakePhoto();
                }}
                className="webcam-btn"
              >
                {" "}
                Retake photo
              </button>
              <button
                onClick={() => {
                  addPhoto();
                }}
                className="webcam-btn"
              >
                {" "}
                Add photo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebcamCapture;
