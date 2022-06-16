import React from "react";
import BlogList from "./BlogList";

function Home(/* { isAuth } */) {
  return (
    <div>
      <aside>
        <nav></nav>
      </aside>
      <BlogList />
    </div>
  );
}

export default Home;
