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
    console.log("updated createBulkImage", bulkImagesUpdated);
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

  return (
    <div className="home-container">
      <h1>Add Images</h1>
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
                  <img alt="image-item" src={item.image} />
                </div>
                <div className="title">{item.title}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
