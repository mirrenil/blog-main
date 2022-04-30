import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import ErrorBoundary from "./ErrorBoundary";

function Layout() {
  return (
    <div>
      <Header />
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
      <Footer />
    </div>
  );
}

export default Layout;
