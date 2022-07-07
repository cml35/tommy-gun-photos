import React, { useState } from "react";
import "./AddImages.css";
import WebcamCapture from "../WebcamCapture/WebcamCapture";

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

  const submitTitle = (e) => {
    e.preventDefault();
    createBulkImage();
    setShowForm(false);
  };

  const handleClick = (latestImage) => {
    setImage(latestImage);
    setShowForm(true);
  };

  const uploadPhoto = () => {
    //Uploads the bulk of images to sS3
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
            uploadPhoto();
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
