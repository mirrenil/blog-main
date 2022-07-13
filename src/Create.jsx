import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "./firebase";
import { storage } from "./firebase";
import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAuth } from "./contexts/AuthContext";
import Select from "react-select/";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px dotted pink",
    color: state.isSelected ? "red" : "blue",
    padding: 20,
  }),
};

const Create = () => {
  const { currentUser } = useAuth();
  const [category, setCategory] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState([]);
  // const [imageUrls, setImageUrls] = useState([]);
  const navigate = useNavigate("");
  const postCollectionRef = collection(db, "blogginlägg");
  //const [selectedCategory, setSelectedCategory] = useState([]);
  const storageRef = ref(storage, "images_v2/");

  const createPost = async () => {
    if (image.length === 0) {
      await addDoc(postCollectionRef, {
        title,
        body,
        imageFileName: "",
        createdAt: Timestamp.now().toDate(),
      });
    } else {
      const storage = getStorage();
      const arr = [];
      for (let i = 0; i < image.length - 1; i++) {
        const imageRef = ref(storage, `images_v2/${image[i].name}`);
        const imageFileName = await getDownloadURL(imageRef);
        arr.push(imageFileName);
      }
      await addDoc(postCollectionRef, {
        title,
        body,
        arr,
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
      console.log(image.name);
      const imageRef = ref(storage, `images_v2/${image.name}`);
      uploadBytes(imageRef, image).then((snapshot) => {});
      console.log("Image uploaded");
    });
  };

  const categories = [
    {
      value: "1",
      label: "Resor",
    },
    {
      value: "2",
      label: "Familj",
    },
    {
      value: "3",
      label: "Husbil",
    },
  ];

  const handleChange = (e) => {
    setCategory(e.target.value);
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
          <Select
            placeholder="Välj kategori"
            onChange={handleChange}
            options={categories}
            styles={customStyles}
            isMulti
            isClearable
          />

          {/* {selectedCategory.map((e) => {
            return <li key={e.value}>{e.label}</li>;
          })} */}
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
