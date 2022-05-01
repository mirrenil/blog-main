import React from "react";
//import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
//import Create from "./Create";
import BlogDetails from "./BlogDetails";
import Profile from "./components/Profile";
//import NotFound from "./NotFound";
import Layout from "./Layout";
import AuthProvider from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";

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

            <PrivateRoute path="/profile" element={<Profile />} />
            <PrivateRoute path="/update-password" element={<UpdateProfile />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgor-password" element={<ForgotPassword />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
