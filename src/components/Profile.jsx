import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Card, Button } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export const Profile = () => {
  /*   const [error, setError] = useState(""); */
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const { currentUser } = useAuth();

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
        marginTop: "5rem",
        marginBottom: "5rem",
      }}
    >
      {currentUser ? (
        <>
          <Card
            className="text-center"
            style={{
              width: "22rem",
              backgroundColor: "transparent",
              border: "none",
            }}
          >
            <Card.Body
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* {error && <Alert variant="danger">{error}</Alert>} */}
              {/* <strong>Inloggad som:</strong> {currentUser.email} */}
              {/* <Link to="/update-profile" className="btn btn-primary w-50 mt-3">
                Uppdatera profil
              </Link> */}
              <Link to="/create" className="btn btn-primary w-50 mt-3">
                Nytt blogginlägg
              </Link>
              <Button
                variant="link"
                onClick={signUserOut}
                className="btn btn-primary w-50 mt-3"
                style={{ color: "white" }}
              >
                Logga ut
              </Button>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2"></div>
        </>
      ) : (
        <h2 style={{ marginTop: "4rem" }}>
          Du måste vara inloggad för att se din profil
        </h2>
      )}
    </div>
  );
};

export default Profile;
