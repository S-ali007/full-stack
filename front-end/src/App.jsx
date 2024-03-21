import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Page_404 from "./pages/Page404";
import Home from "./pages/Home";

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userData) {
      // Fetch user data or perform any necessary actions
      // setUserData({ cookies });
      console.log(userData);
    } else {
      setUserData(null);
    }
  }, [cookies]);

  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login loggedInUser={setUserData} />} />
        {userData ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
        <Route path="/*" element={<Page_404 />} />
      </Routes>
    </>
  );
}

export default App;
