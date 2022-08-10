import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error, errorInfo) {
    console.error("uncaught error: " + { error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
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
          <h1>Tyvärr hittades inte sidan du sökte efter.</h1>
          <Button style={{ marginTop: "2rem" }}>
            <Link
              style={{
                textDecoration: "none",
                color: "white",
              }}
              to="/login"
            >
              Gå till startsidan
            </Link>
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
