import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

const BlogList = ({ blogs, title }) => {
  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, "blogginlägg");

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
          <div className="post">
            <div className="postHeader">
              <div className="title">
                <h3>{post.title}</h3>
              </div>
              <div className="delete-post">
                {/* <button
                  onClick={() => {
                    deletePost(post.id);
                  }}
                >
                  Ta bort
                </button> */}
              </div>
            </div>
            <div className="post-tex-container">{post.body}</div>
            {/* <div className="post-image-container">
              {ImageList.map((url) => {
                return <img src={url} />;
              })}
            </div> */}
            <div>{post.image}</div>
          </div>
        );
      })}
    </div>
  );
};

export default BlogList;
