import React from "react";
import BlogList from "./BlogList";

function Home(/* { isAuth } */) {
  // const [postList, setPostList] = useState([]);
  // const postCollectionRef = collection(db, "blogginlägg");

  // useEffect(() => {
  //   const getPosts = async () => {
  //     const data = await getDocs(postCollectionRef);
  //     setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };

  //   getPosts();
  // }, []);

  // const deletePost = async (id) => {
  //   const postDoc = doc(db, "blogginlägg", id);
  //   await deleteDoc(postDoc);
  //   console.log(postDoc);
  // };
  return (
    <div className="homePage">
      <BlogList />
    </div>
  );
}

export default Home;
