import React, { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { useAuth } from "./contexts/AuthContext";
import { Button } from "react-bootstrap";

const BlogList = () => {
  const { currentUser } = useAuth();
  const [postList, setPostList] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const postCollectionRef = collection(db, "blogginlägg");
  const first = query(postCollectionRef, orderBy("createdAt", "desc"));

  const getPosts = async (category) => {
    const q = query(
      postCollectionRef,
      where("category", "==", `${category}`),
      orderBy("createdAt", "desc")
    );

    const filteredPosts = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const posts = {
        id: doc.id,
        ...doc.data(),
      };
      filteredPosts.push(posts);
    });
    setPostList(filteredPosts);
  };

  useEffect(() => {
    getPosts(categoryFilter);
  }, [categoryFilter]);

  useEffect(() => {
    const getPosts = async () => {
      await getDocs(postCollectionRef);

      onSnapshot(first, (snapshot) => {
        const posts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPostList(posts);
      });
    };

    getPosts();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [postList]);

  const deletePost = async (id) => {
    const postDoc = doc(db, "blogginlägg", id);
    await deleteDoc(postDoc);
    console.log("Post deleted");
  };

  // const updatePost = async (id) => {
  //   const postDoc = doc(db, "blogginlägg", id);
  //   await setDoc(postDoc);
  //   console.log("Post updated");
  // };

  return (
    <div className="homePage">
      <div className="categories">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">Välj kategori</option>
          <option value="Resor">Resor</option>
          <option value="Familj">Familj</option>
          <option value="Husbil">Husbil</option>
        </select>
      </div>
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
              {!post.images ? (
                <div></div>
              ) : (
                post.images.map((image) => {
                  return (
                    <img
                      style={{ width: "100%", height: "100%" }}
                      src={image}
                      alt="..."
                    />
                  );
                })
              )}
            </div>
            {currentUser ? (
              <div className="delete-post">
                <Button
                  style={{ marginRight: "10px" }}
                  onClick={() => {
                    deletePost(post.id);
                  }}
                >
                  Ta bort
                </Button>
                {/* <Button
                  onClick={() => {
                    updatePost(post.title, post.body);
                  }}
                >
                  Ändra
                </Button> */}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default BlogList;
