import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Page_404 from "./pages/Page404";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/"} element={<Home />} />
        <Route path={"/*"} element={<Page_404 />} />
      </Routes>
    </>
  );
}

export default App;
