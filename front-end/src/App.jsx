import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Page_404 from "./pages/Page404";
import Home from "./pages/Home";

function App() {
  const [Data, setData] = useState("");
  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const user = localStorage.getItem("userData");
        const userData = JSON.parse(user);
        if (userData) {
          // console.log(userData.refreshToken , "userdata");
          setData(userData.refreshToken);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProtectedData();
  }, []);

  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Login setData={setData} />} />
      {Data && <Route path="/home" element={<Home />} />}

      <Route path="/*" element={<Page_404 />} />
    </Routes>
  );
}

export default App;
