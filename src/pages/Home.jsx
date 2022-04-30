import BlogList from "./BlogList";
import useFetch from "../useFetch";
import familjBild from "../kent-familj.jpeg";
import React from "react";
import Signup from "../components/Signup";
import { Container } from "react-bootstrap";

function Home() {
  const {
    data: blogs,
    isPending,
    //error,
  } = useFetch("http://localhost:3000/blogs");

  return (
    <div className="home">
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Signup />
        </div>
      </Container>

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

      <img style={img} src={familjBild} alt="kent och familj" />

      {/* {error && <div>{error}</div>} */}
      {isPending && <div>Loading...</div>}
      <BlogList blogs={blogs} title="Läs mer..." />
    </div>
  );
}

const img = {
  width: "400px",
  height: "300px",
};
export default Home;
