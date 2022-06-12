import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useAuth } from "./contexts/AuthContext";

const BlogList = () => {
  const { currentUser } = useAuth();
  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, "blogginlägg");
  const [url, setUrl] = useState();

  useEffect(() => {
    const fetch = async () => {
      const storage = getStorage();
      const img = ref(storage, "images/kent-familj.jpeg");
      await getDownloadURL(img).then((x) => {
        setUrl(x);
      });
    };
    if (url === undefined) {
      fetch();
    }
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, []);

  const deletePost = async (id) => {
    const postDoc = doc(db, "blogginlägg", id);
    await deleteDoc(postDoc);
    console.log(postDoc);
  };

  return (
    <div className="homePage">
      {postList.map((post) => {
        return (
          <div className="post" key={post.id}>
            <div className="postHeader">
              <div className="title">
                <h3>{post.title}</h3>
              </div>
            </div>

            <div className="post-tex-container">{post.body}</div>
            <div className="post-image-container">
              <img
                style={{ width: "100%", height: "100%" }}
                src={url}
                alt="..."
              />
            </div>
            {currentUser ? (
              <div className="delete-post">
                <button
                  style={{ border: "none", background: "transparent" }}
                  onClick={() => {
                    deletePost(post.id);
                  }}
                >
                  🗑
                </button>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default BlogList;
