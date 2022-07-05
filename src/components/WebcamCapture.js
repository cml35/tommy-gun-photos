import React, { useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};


const WebcamCapture = () => {
    const [image, setImage] = useState("");
    const [imageList, setList] = useState([]);

    console.log("imageList", imageList);

    const saveCapture = (im) => {
        imageList.push(im);
        setList(imageList);
    };

    return (
        <>
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
                    const imageSrc = getScreenshot()
                    saveCapture(imageSrc);
                    setImage(imageSrc);
                    //save image to an array
                }}
            >
                Capture photo
            </button>
            )}
            </Webcam>
            {/* map to render each image */}
            {
                imageList.map((im) => {
                    return (
                        <img alt="test" src={im} />
                    );
                })
            }
        </>
    );
};

export default WebcamCapture;
