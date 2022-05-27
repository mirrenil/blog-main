import BlogList from "./BlogList";
import useFetch from "./useFetch";
import React from "react";

function Home() {
  const { data: blogs, isPending } = useFetch("http://localhost:3000/blogs");

  return (
    <div className="home">
      <h1>Senaste</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
        accusantium quam similique tempore aliquam exercitationem illum placeat,
        odit nobis totam nulla officiis, assumenda minima possimus aliquid,
        suscipit quidem ea cupiditate?
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore sint
        eveniet, quibusdam optio atque explicabo voluptatum fugiat? Repudiandae,
        delectus qui quae sapiente, nesciunt aperiam corporis nam eligendi
        laboriosam tempora repellendus?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
        accusantium quam similique tempore aliquam exercitationem illum placeat,
        odit nobis totam nulla officiis, assumenda minima possimus aliquid,
        suscipit quidem ea cupiditate?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
        accusantium quam similique tempore aliquam exercitationem illum placeat,
        odit nobis totam nulla officiis, assumenda minima possimus aliquid,
        suscipit quidem ea cupiditate?
      </p>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore sint
        eveniet, quibusdam optio atque explicabo voluptatum fugiat? Repudiandae,
        delectus qui quae sapiente, nesciunt aperiam corporis nam eligendi
        laboriosam tempora repellendus?
      </p>

      {isPending && <div>Loading...</div>}
      <BlogList blogs={blogs} title="Läs mer..." />
    </div>
  );
}

export default Home;
