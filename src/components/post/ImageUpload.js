import React, { useState } from "react";
import { Button } from "@material-ui/core";
import firebase from "firebase";
import { db, storage } from "../../firebase";
import "./ImageUpload.css";

function ImageUpload({ username }) {
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage
      .ref(`/images/${Date.now()}${image.name}`)
      .put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //* Progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      //* Error function
      (error) => console.log(error.message),
      () => {
        //* Complete function
        storage
          .ref("images")
          .child(image?.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("post").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });

            setProgress(0);
            setCaption("");
            setImage(null);
          });
      }
    );
  };

  return (
    <div className="imageupload">
      <progress className="imageupload__progress" value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter a caption..."
        onChange={(event) => setCaption(event.target.value)}
      />
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </div>
  );
}

export default ImageUpload;
