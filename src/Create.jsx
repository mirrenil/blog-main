import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import { storage } from "./firebase";
import { ref, uploadBytes } from "firebase/storage";
import { useAuth } from "./contexts/AuthContext";

const Create = ({ isAuth }) => {
  const { currentUser } = useAuth();
  const [category, setCategory] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const navigate = useNavigate("");
  const postCollectionRef = collection(db, "blogginlägg");

  const createPost = async () => {
    await addDoc(postCollectionRef, {
      title,
      body,
      category,
    });
    navigate("/");
  };

  function handleImage(imageEvent) {
    setImage(imageEvent.target.files[0]);
  }

  const uploadImage = () => {
    const imageRef = ref(storage, `images_v2/${image.name}`);
    let x = imageRef.fullPath;
    console.log(x);
    uploadBytes(imageRef, image).then((snapshot) => {});
  };

  // useEffect(() => {
  //   listAll(imageListRef).then((response) => {
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         setImageUrls((prev) => [...prev, url]);
  //       });
  //     });
  //   });
  // }, []);

  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate("/login");
  //   }
  // }, []);

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
            multiple={true}
          />
          <Button onClick={uploadImage}>Ladda upp bild</Button>
          <>
            {imageUrls
              .filter((url) => url.id === postCollectionRef.id)
              .map((url) => {
                return <img src={url} alt="bild på kent's familj" />;
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
