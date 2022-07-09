import React, { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";
import { useAuth } from "./contexts/AuthContext";

const BlogList = () => {
  const { currentUser } = useAuth();
  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, "blogginlägg");

  useEffect(() => {
    const getPosts = async () => {
      await getDocs(postCollectionRef);
      const q = query(postCollectionRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        const posts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPostList(posts);
      });
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
      {postList.flatMap((post) => {
        return (
          <div className="post" key={post.id}>
            <div className="postHeader">
              <div className="title">
                <h3>{post.title}</h3>
              </div>
              <div className="post-date">
                {post.createdAt
                  .toDate()
                  .toLocaleString("sv-SE")
                  .substring(0, 10)}
              </div>
            </div>

            <div className="post-tex-container">{post.body}</div>
            <div className="post-image-container">
              {!post.imageFileName ? (
                <div></div>
              ) : (
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={post.imageFileName}
                  alt="..."
                />
              )}
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
