import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { makeRequest } from "./utils";
const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  //const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate("");
  //const [isAdded, setIsAdded] = useState(false);
  // eslint-disable-next-line
  const [postStatus, setPostStatus] = useState("");

  const handleSubmit = async (e) => {
    //setIsPending(true);
    e.preventDefault();
    let blog = {
      title: title,
      body: body,
      image: image,
    };

    let status = await makeRequest("/api/blogs", "POST", blog);
    setPostStatus(status);
    console.log(status);
  };

  return (
    <div className="create">
      <h2>Skriv ett nytt blogginlägg</h2>
      <form onSubmit={handleSubmit}>
        <label>Titel</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Lägg till en bild</label>
        <input
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          name="image"
          id="image"
          placeholder="url här"
        />

        <label>Inlägg</label>
        <input
          style={{ width: "400px", height: "200px" }}
          type="text"
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit">Publicera</button>
      </form>
    </div>
  );
};
export default Create;
