import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "./firebase";
import { storage } from "./firebase";
import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAuth } from "./contexts/AuthContext";

const Create = () => {
  const { currentUser } = useAuth();
  const [category, setCategory] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState([]);
  const navigate = useNavigate("");
  const postCollectionRef = collection(db, "blogginlägg");

  const createPost = async (e) => {
    e.preventDefault();
    if (image.length === 0) {
      await addDoc(postCollectionRef, {
        title,
        body,
        imageFileName: "",
        category,
        createdAt: Timestamp.now().toDate(),
      });
    } else {
      const storage = getStorage();
      const images = [];
      for (let i = 0; i < image.length - 1; i++) {
        const imageRef = ref(storage, `images_v2/${image[i].name}`);
        const imageFileName = await getDownloadURL(imageRef);
        images.push(imageFileName);
      }
      await addDoc(postCollectionRef, {
        title,
        body,
        images,
        category,
        createdAt: Timestamp.now().toDate(),
      });
    }
    navigate("/");
  };

  const handleImage = (imageEvent) => {
    const multipleImages = [];
    for (let i = 0; i < imageEvent.target.files.length; i++) {
      multipleImages.push(imageEvent.target.files[i]);
    }
    multipleImages.push(imageEvent.target.files);
    setImage(multipleImages);
  };

  const uploadImage = async (image) => {
    await image.forEach((image) => {
      const imageRef = ref(storage, `images_v2/${image.name}`);
      uploadBytes(imageRef, image).then((snapshot) => {});
      alert("Bild/bilder uppladdade!");
    });
  };

  return (
    <form className="create" onSubmit={createPost}>
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
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Välj kategori</option>
            <option value="Resor">Resor</option>
            <option value="Familj">Familj</option>
            <option value="Husbil">Husbil</option>
          </select>
          <input
            style={{
              maxWidth: "100px",
              border: "none",
              color: "transparent",
            }}
            type="file"
            onChange={(e) => handleImage(e)}
            name="image"
            id="image"
            accept="image/png, image/jpeg"
            multiple
          />
          <Button onClick={(e) => uploadImage(image)}>Ladda upp bild</Button>

          <Button
            type="submit"
            className="btn btn-primary w-50 mt-3"
            style={{ color: "white" }}
          >
            Publicera
          </Button>
        </>
      ) : (
        <h1>Du måste vara inloggad för att skriva inlägg</h1>
      )}
    </form>
  );
};
export default Create;
