import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Create from "./Create";
import BlogList from "./BlogList";
import Profile from "./components/Profile";
import Layout from "./Layout";
import AuthProvider from "./contexts/AuthContext";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* {!isAuth ? ( */}
            <>
              <Route index element={<Home />} />
              <Route path="/bloglist" element={<BlogList />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/login"
                element={<Login /* setIsAuth={setIsAuth} */ />}
              />
            </>
            {/*   ) : ( */}
            <>
              <Route index element={<Home />} />
              <Route
                path="/create"
                element={<Create /* isAuth={isAuth} */ />}
              />
              <Route
                path="/profile"
                element={<Profile /* isAuth={isAuth} */ />}
              />
              <Route
                path="/update-password"
                element={<UpdateProfile /* isAuth={isAuth} */ />}
              />
              <Route
                path="/forgot-password"
                element={<ForgotPassword /* isAuth={isAuth} */ />}
              />
            </>
            {/* )} */}
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
