import React from "react";

function Post(props) {
  const { id, title, body } = props.data;
  return (
    <div>
      <small>{id}</small>
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  );
}

export default Post;
