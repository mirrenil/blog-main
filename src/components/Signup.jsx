import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, setRegisterEmail, setRegisterPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      navigate("/");
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      setError("Failed to create an account");
    }
    setLoading(false);
  }
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
      <Card
        className="text-center"
        style={{
          width: "22rem",
          backgroundColor: "transparent",
          borderRadius: "10%",
        }}
      >
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                className="text-center"
                type="email"
                ref={emailRef}
                required
                onChange={(e) => {
                  setRegisterEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="text-center"
                type="password"
                ref={passwordRef}
                required
                onChange={(e) => {
                  setRegisterPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                className="text-center"
                type="password"
                ref={passwordConfirmRef}
                required
                onChange={(e) => {
                  setRegisterPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Button
              disabled={loading}
              className="w-40 mt-4"
              type="submit"
              onClick={signup}
            >
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-4">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  );
}
