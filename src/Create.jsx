import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import { storage } from "./firebase";
import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAuth } from "./contexts/AuthContext";

const Create = ({ isAuth }) => {
  const { currentUser } = useAuth();
  //const [category, setCategory] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const navigate = useNavigate("");
  const postCollectionRef = collection(db, "blogginlägg");
  const imageListRef = ref(storage, "images_v2/");

  const createPost = async () => {
    const storage = getStorage();
    const imageRef = ref(storage, `images_v2/${image.name}`);
    const imageFilename = await getDownloadURL(imageRef);

    await addDoc(postCollectionRef, {
      title,
      body,
      //category,
      imageFilename,
    });
    navigate("/");
  };

  function handleImage(imageEvent) {
    setImage(imageEvent.target.files[0]);
  }

  const uploadImage = () => {
    const imageRef = ref(storage, `images_v2/${image.name}`);
    uploadBytes(imageRef, image).then((snapshot) => {});
  };

  return (
    <div className="create">
      {currentUser ? (
        <>
          <input
            style={{ maxWidth: "300px", marginTop: "4rem" }}
            type="text"
            required
            placeholder="Titel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            style={{ maxWidth: "400px", minHeight: "300px" }}
            type="text"
            required
            placeholder="Skriv ditt inlägg här"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          {/* <input
            style={{ maxWidth: "300px", marginTop: "1rem" }}
            type="text"
            required
            placeholder="Kategori"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          /> */}

          <input
            style={{
              maxWidth: "100px",
              border: "none",
              color: "transparent",
            }}
            type="file"
            value={""}
            onChange={(e) => handleImage(e)}
            name="image"
            id="image"
            accept="image/png, image/jpeg"
            multiple
          />
          <Button onClick={uploadImage}>Ladda upp bild</Button>
          <>
            {imageUrls
              .filter((url) => url.id === postCollectionRef.id)
              .map((url) => {
                return <img src={url} alt="En bild på Kent's blogg..." />;
              })}
          </>
          <Button
            onClick={createPost}
            className="btn btn-primary w-50 mt-3"
            style={{ color: "white" }}
          >
            Publicera
          </Button>
        </>
      ) : (
        <h1>Du måste vara inloggad för att skriva inlägg</h1>
      )}
    </div>
  );
};
export default Create;
