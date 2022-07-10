import React, { useState } from "react";
import uploadFile, { setConfig } from "@conqa/s3-upload/dist";

import "./AddImages.css";
import WebcamCapture from "../WebcamCapture/WebcamCapture";
import { getIdToken } from "../../hooks/auth";

setConfig({
  // env should be set to one of 'staging' or 'production'
  env: "staging",
});

const BATCH_UPDATE_URL =
  "https://webapp-api-oceania-staging.con.qa/v1/batchUpdate";

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
    let byteString = atob(dataURL.split(",")[1]);

    // separate out the mime component
    let mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];

    // write the bytes of the string to an ArrayBuffer
    let ab = new ArrayBuffer(byteString.length);

    // create a view into the buffer
    let ia = new Uint8Array(ab);

    // set the bytes of the buffer to the correct values
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    let file = new File([ab], fileName, { type: mimeString });
    return file;
  };

  const transform = (bulkImages) => {
    console.log("bulkImages", bulkImages);
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

  const upload = async (bulkImages) => {
    const files = transform(bulkImages);
    console.log("files", files);

    //Uploads the bulk of images to sS3
    const data = await Promise.all(
      files.map(async (file) => {
        const result = await uploadFile(file);
        const { key } = result;
        console.log("key", key);
        return {
          ct: file.type,
          hash: key,
          name: file.name,
          type: "post",
        };
      })
    );

    //need an array of updates one per image
    const updates = genUpdate(data);
    const requestBody = {
      accountId: "2dfe64e4-36bd-49b5-9be2-a56fbbf02720",
      projectId: "35ae371a-2fd7-4e00-81d5-1596d03252b8",
      source: "addFiles",
      updates,
    };

    //Batch update photos to existing checkpoint
    const authToken = await getIdToken();

    await fetch(BATCH_UPDATE_URL, {
      headers: {
        authorization: `Bearer ${authToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(requestBody),
      method: "POST",
    });
  };

  const genEntry = (someData) => {
    const { ct, hash, name, type } = someData;

    return {
      data: [
        {
          ct,
          hash,
        },
      ],
      meta: {
        name,
        type,
      },
    };
  };

  const genUpdate = (data) => {
    return data.map((dataItem) => ({
      entry: genEntry(dataItem),
      path: genPath(),
    }));
  };

  const genPath = () => {
    return [
      "qa_24190571-8421-4081-9ce4-30671e24b43e",
      "15a4388b-713b-4341-b57c-9d733b170cd0",
      "785522d9-38a4-4f57-b263-a18d12798f64",
      "ae1479d4-7790-507c-8d4e-d08972392de1",
      "a7a15c9f-1a66-5d62-9cae-770e92086b28",
    ];
  };

  return (
    <div className="home-container">
      <h1>Tommy gun photos</h1>
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
