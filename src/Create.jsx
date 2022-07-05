import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "./firebase";
import { storage } from "./firebase";
import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAuth } from "./contexts/AuthContext";
import Creatable from "react-select/creatable";

const categories = [
  { value: 1, label: "Resor" },
  { value: 2, label: "Familj" },
];

const Create = ({ isAuth }) => {
  const { currentUser } = useAuth();
  const [categoryInputValue, setCategoryInputValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [category, setCategory] = useState("");
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
      categoryValue,
      imageFilename,
      createdAt: Timestamp.now().toDate(),
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

  const handleChange = (field, value) => {
    switch (field) {
      case "categories":
        setCategory(value);
        break;
      default:
        break;
    }
  };

  const handleInputChange = (value) => {
    setCategoryInputValue(value);
    console.log(value);
  };

  const handleKeyDown = (e) => {
    if (!categoryInputValue) return;
    switch (e.key) {
      case "Enter":
      case "Tab":
        setCategoryValue([
          ...categoryValue,
          createCategory(categoryInputValue),
        ]);
        setCategoryInputValue("");
        e.preventDefault();
        break;
      default:
        break;
    }
  };

  const createCategory = (label) => ({
    label,
    value: label,
  });

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
          <label>Kategori</label>
          <Creatable
            isClearable
            isMulti
            onChange={(value) => handleChange("categories", value)}
            //onKeyDown={handleKeyDown}
            options={categories}
            value={categoryValue}
          />

          <Creatable
            isClearable
            isMulti
            inputValue={categoryInputValue}
            menuIsOpen={false}
            placeholder="Skriv och klicka på enter för att skapa en kategori"
            onChange={(value) => handleChange("kategori", value)}
            onKeyDown={handleKeyDown}
            onInputChange={handleInputChange}
            options={categories}
            value={categoryValue}
          />
          {/* <input
            style={{ maxWidth: "300px", marginTop: "1rem" }}
            type="text"
            required
            placeholder="Kategori"
            value={category}
            onChange={(e) => addCategory(e)}
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
            multiple={true}
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
