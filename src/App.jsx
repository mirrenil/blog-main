import React from "react";
//import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import Home from "./Home";
//import Create from "./Create";
import BlogDetails from "./BlogDetails";
import Profile from "./components/Profile";
//import NotFound from "./NotFound";
import Layout from "./Layout";
import AuthProvider from "./contexts/AuthContext";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";
import { useAuth } from "./contexts/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Public />} />
            <Route index element={<Home />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />

            <Route path="/private-outlet" element={<PrivateOutlet />}>
              <Route path="" element={<Private />} />
            </Route>
            <Route
              path="/private-nested"
              element={
                <PrivateRoute>
                  <Private />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Profile />} />
            <Route path="/update-password" element={<UpdateProfile />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}
const Public = () => <div>public</div>;
const Private = () => <div>private</div>;

function PrivateOutlet() {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/login" />;
}

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
}

// function useAuth() {
//   return true;
// }

export default App;
