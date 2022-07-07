import React, { useState } from "react";
import uploadFile, { setConfig } from "@conqa/s3-upload/dist";

import "./AddImages.css";
import WebcamCapture from "../WebcamCapture/WebcamCapture";
// import toFile from "../../utils";

setConfig({
  // env should be set to one of 'staging' or 'production'
  env: "staging"
});

const Home = () => {
  
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [bulkImages, setBulkImages] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const createBulkImage = () => {
    const imagePackage = {
      title,
      image,
    };
    const bulkImagesUpdated = bulkImages;
    bulkImagesUpdated.push(imagePackage);
    setBulkImages(bulkImagesUpdated);
    setImage("");
    setTitle("");
  };

  const transformDataURLToFile = (dataURL, fileName) => {
    // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  let byteString = atob(dataURL.split(',')[1]);

  // separate out the mime component
  let mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  let ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  let ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  let file = new File([ab], fileName, {type: mimeString});
  return file;
  }

  const transform = (bulkImages) => {
    console.log("@@@@@bulkImages", bulkImages);
    const transformedImages = bulkImages.map((img) => {
      return transformDataURLToFile(img.image, img.title);
    });
    return transformedImages;
  };

  const submitTitle = (e) => {
    e.preventDefault();
    createBulkImage();
    setShowForm(false);
  };

  const handleClick = (latestImage) => {
    setImage(latestImage);
    setShowForm(true);
  };

  const upload = (bulkImages) => {
    const files = transform(bulkImages);
    console.log("files", files);

    //Uploads the bulk of images to sS3
    files.map(async (file) => {
      const result = await uploadFile(file);
      console.log('result', result);
      return result;
    });
  };

  return (
    <div className="home-container">
      <h1>React-Webcam Demo</h1>
      {showForm ? (
        <form className="form" onSubmit={submitTitle}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit">Add photo</button>
        </form>
      ) : (
        <WebcamCapture handleClick={handleClick} />
      )}

      {/* map to render each image */}
      <div className="image-list">
        {bulkImages.length > 0 &&
          bulkImages.map((item, index) => {
            return (
              <div key={index}>
                <div className="image-item">
                  <img alt="added-item" src={item.image} />
                </div>
                <div className="title">{item.title}</div>
              </div>
            );
          })}
      </div>
      {bulkImages.length > 0 && (
        <button
          onClick={() => {
            upload(bulkImages);
          }}
        >
          {" "}
          Upload photos
        </button>
      )}
    </div>
  );
};

export default Home;
