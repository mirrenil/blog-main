import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import BlogDetails from "./pages/BlogDetails";
//import NotFound from "./NotFound";
import Layout from "./Layout";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import { Navigate } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";

function App() {
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const u = localStorage.getItem("user");
  //   8 && JSON.parse(u) ? setUser(true) : setUser(false);
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("user", user);
  // }, [user]);

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route path="/blogs/:id" element={<BlogDetails />} />
            {/* 
          <Route
            path="/profile"
            element={<Profile logout={() => setUser(false)} />}
          /> */}
            <Route path="/create" element={<Create />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
