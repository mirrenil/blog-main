import React, { useEffect, useState } from "react";
import BlogList from "./BlogList";
import { db } from "./firebase";
import {
  getDocs,
  doc,
  orderBy,
  query,
  onSnapshot,
  collection,
} from "firebase/firestore";

function Home(/* { isAuth } */) {
  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, "blogginlägg");

  useEffect(() => {
    const getPosts = async () => {
      await getDocs(postCollectionRef);
      const q = query(postCollectionRef, orderBy("categoryValue", "desc"));
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

  return (
    <div>
      <div className="categories">
        {postList.map((post) => {
          return (
            <div className="category" key={post.id}>
              {/* <div>{post.categoryValue}</div> */}
            </div>
          );
        })}
      </div>
      <BlogList />
    </div>
  );
}

export default Home;
