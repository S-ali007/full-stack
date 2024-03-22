import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Page_404 from "./pages/Page404";
import Home from "./pages/Home";

function App() {
  const [cookies, setCookie] = useState("");

  return (
    <Routes>
      <Route path="/signup" element={<Signup loggedInUser={setCookie} />} />

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login loggedInUser={setCookie} />} />

      <Route path="/*" element={<Page_404 />} />
    </Routes>
  );
}

export default App;
