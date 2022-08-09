import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Card, Button } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export const Profile = () => {
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

              <Link to="/create" className="btn btn-primary w-40 mt-3">
                Nytt blogginlägg
              </Link>

              <Link to="/update-profile" className="btn btn-primary w-40 mt-3">
                Uppdatera lösenord
              </Link>
              <Button
                variant="link"
                onClick={signUserOut}
                className="btn btn-primary w-30 mt-3 "
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
