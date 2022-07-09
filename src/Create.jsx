import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "./firebase";
import { storage } from "./firebase";
import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAuth } from "./contexts/AuthContext";
import AsyncSelect from "react-select/async";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px dotted pink",
    color: state.isSelected ? "red" : "blue",
    padding: 20,
  }),
};

const Create = ({ isAuth }) => {
  const { currentUser } = useAuth();
  // const [categoryInputValue, setCategoryInputValue] = useState("");
  // const [categoryValue, setCategoryValue] = useState("");
  // const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const navigate = useNavigate("");
  const postCollectionRef = collection(db, "blogginlägg");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const storageRef = ref(storage, "images_v2/");

  const createPost = async () => {
    if (image === null) {
      await addDoc(postCollectionRef, {
        title,
        body,
        imageFileName: "",
        createdAt: Timestamp.now().toDate(),
      });
    } else {
      const storage = getStorage();
      const imageRef = ref(storage, `images_v2/${image.name}`);
      const imageFileName = await getDownloadURL(imageRef);
      await addDoc(postCollectionRef, {
        title,
        body,
        imageFileName,
        createdAt: Timestamp.now().toDate(),
      });
    }
    navigate("/");
  };

  const handleImage = (imageEvent) => {
    setImage(imageEvent.target.files[0]);
    console.log(imageEvent.target.files);
  };

  const uploadImage = () => {
    const imageRef = ref(storage, `images_v2/${image.name}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      console.log("Image uploaded");
    });
  };

  const simularAsync = async (data, callback) => {
    setTimeout(function() {
      callback(data);
    }, 10000);
  };
  const loadOptions = async () => {
    //console.log("in firebase ");
    let q = await simularAsync(
      [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
      ],
      (data) => {
        //console.log("in callback ", data);
        let q = data;
      }
    );
    return q;
  };

  const handleChange = (tags) => {
    console.log(tags);
    setSelectedCategory(tags);
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
          <AsyncSelect
            placeholder="Välj kategori"
            onChange={handleChange}
            loadOptions={loadOptions}
            styles={customStyles}
            defaultOptions={true}
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
            multiple={true}
          />
          <Button onClick={uploadImage}>Ladda upp bild</Button>

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
