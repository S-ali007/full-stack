import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigation = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/users/logout");

      navigation("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <div>Home</div>
      <div>
        <nav>
          <h1>fucbook</h1>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      </div>
    </>
  );
}

export default Home;
