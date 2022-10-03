import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Card, Button } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export const Profile = () => {
  const { currentUser } = useAuth();

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      window.location.pathname = "/";
    });
  };

  return (
    <div>
      {currentUser ? (
        <>
          <Card
            className="text-center"
            style={{
              backgroundColor: "transparent",
              border: "none",
              height: "75vh",
            }}
          >
            <Card.Body className="profile-card">
              <h3>Inloggad som {currentUser.email}</h3>

              <Link to="/create" className="btn btn-primary w-50 mt-3">
                Nytt blogginlägg
              </Link>

              <Link to="/" className="btn btn-primary w-50 mt-3">
                Hem
              </Link>
              <Button
                variant="link"
                onClick={signUserOut}
                className="btn btn-primary w-50 mt-3 "
                style={{ color: "white" }}
              >
                Logga ut
              </Button>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2"></div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            height: "75vh",
          }}
        >
          <h2 style={{ marginTop: "1rem" }}>
            Du måste vara inloggad för att se din profil
          </h2>
          <Button style={{ marginTop: "2rem" }}>
            <Link
              style={{
                textDecoration: "none",
                color: "white",
              }}
              to="/login"
            >
              Logga in
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Profile;
