import React, { useState } from "react";
import WebcamCapture from "../components/WebcamCapture";

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
    <>
      <p>Capture</p>
      {showForm ? (
        <form onSubmit={submitTitle}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit">Upload</button>
        </form>
      ) : (
        <WebcamCapture handleClick={handleClick} />
      )}

      {/* map to render each image */}
      <div>
        {bulkImages.length > 0 &&
          bulkImages.map((item, index) => {
            return (
              <div key={index}>
                {item.title}
                <img alt="test" src={item.image} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Home;
