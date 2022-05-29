import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

const Create = ({ isAuth }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  //const [image, setImage] = useState("");
  const navigate = useNavigate("");
  const postCollectionRef = collection(db, "blogginlägg");

  const createPost = async () => {
    await addDoc(postCollectionRef, {
      title,
      body,
      /* author: { name: auth.currentUser.displayName, id: auth.currentUser.uid } */
    });
    navigate("/");
  };

  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate("/login");
  //   }
  // }, []);

  return (
    <div className="create">
      <h2>Skriv ett nytt blogginlägg</h2>
      <label>Titel</label>
      <input
        type="text"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Inlägg</label>
      <input
        style={{ width: "400px", height: "200px" }}
        type="text"
        required
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      {/* <label>Lägg till en bild</label>
        <input
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          name="image"
          id="image"
          placeholder="url här"
        /> */}

      <button onClick={createPost}>Publicera</button>
    </div>
  );
};
export default Create;
