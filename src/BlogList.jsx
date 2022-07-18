import React, { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  onSnapshot,
  // where,
  // limit,
} from "firebase/firestore";
import { db } from "./firebase";
import { useAuth } from "./contexts/AuthContext";

const BlogList = () => {
  const { currentUser } = useAuth();
  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, "blogginlägg");
  // const [total, setTotal] = useState(0);
  // const [categoryList, setCategoryList] = useState([]);
  // const [lastDoc, setLastDoc] = useState();
  // const [fillter, setFillter] = useState(undefined);

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [postList]);

  const deletePost = async (id) => {
    const postDoc = doc(db, "blogginlägg", id);
    await deleteDoc(postDoc);
    console.log("Post deleted");
  };

  // const handleClick = (name) => {
  //   const new_list = postList.filter((post) =>
  //     postList.category.includes(name)
  //   );
  //   setPostList(new_list);
  // };

  // useEffect(() => {
  //   const filterCategory = async () => {
  //     const colRef = collection(db, "blogginlägg");
  //     const newRef = fillter
  //       ? query(
  //           colRef,
  //           where("name", ">=", fillter),
  //           where("name", "<=", fillter + "utf8")
  //         )
  //       : query(colRef, limit(10));
  //     const documentSnapshots = await getDocs(newRef);
  //     const lastVisible =
  //       documentSnapshots.docs[documentSnapshots.docs.length - 1];
  //     onSnapshot(colRef, (snapshot) => {
  //       setTotal(snapshot.size);
  //     });

  //     onSnapshot(newRef, (snapshot) => {
  //       let results = [];
  //       snapshot.forEach((doc) => {
  //         results.push({
  //           id: doc.id,
  //           ...doc.data(),
  //         });
  //       });
  //       setCategoryList(results);
  //     });
  //     setLastDoc(lastVisible);
  //   };
  //   filterCategory();
  // }, [fillter]);

  return (
    <div className="homePage">
      <div className="categories">
        <h3>
          {/* <button onClick={() => handleClick("Resor")}>Resor</button> */}
        </h3>
        <h3>
          {/* <button onClick={() => handleClick("Husbil")}>Husbil</button> */}
        </h3>
        <h3>
          {/* <button onClick={() => handleClick("Familj")}>Familj</button> */}
        </h3>
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
