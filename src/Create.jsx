import React from "react";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import { storage } from "./firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  list,
  listAll,
} from "firebase/storage";

const Create = ({ isAuth }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const navigate = useNavigate("");

  const postCollectionRef = collection(db, "blogginlägg");
  const imageListRef = ref(storage, "images/");

  const createPost = async () => {
    await addDoc(postCollectionRef, {
      title,
      body,
      image,
      /* author: { name: auth.currentUser.displayName, id: auth.currentUser.uid } */
    });
    if (image == null) return;
    const imageRef = ref(storage, `images/${image.name + Date.now()}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
    navigate("/");
  };

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate("/login");
  //   }
  // }, []);

  return (
    <div className="create">
      <label>Titel</label>
      <input
        style={{ maxWidth: "300px" }}
        type="text"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Inlägg</label>
      <input
        style={{ maxWidth: "400px", minHeight: "300px" }}
        type="text"
        required
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <label>Lägg till en bild</label>
      <input
        style={{ maWidth: "200px", border: "none" }}
        type="file"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        name="image"
        id="image"
      />
      <Button
        onClick={createPost}
        className="btn btn-primary w-50 mt-3"
        style={{ color: "white" }}
      >
        Publicera
      </Button>
    </div>
  );
};
export default Create;
