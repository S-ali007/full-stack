import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../src/Home.css";

function Home() {
  const navigation = useNavigate();
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = localStorage.getItem("userData");
        const userData = JSON.parse(user);
        setFirstName(userData.user.firstName);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/users/logout");
      localStorage.clear();
      navigation("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="home-container">
      <header className="header">
        <nav className="navbar">
          <h1 className="logo">fucbook</h1>
          <div className="user-info">
            <span className="user-name">Hello, {firstName} </span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </nav>
      </header>
      <main className="main-content">
        <section className="hero">
          <div className="hero-content">
            <h2>Welcome to Fucbook</h2>
            <p>Connect and share with friends</p>
          </div>
        </section>
        <section className="about-section">
          <div className="container">
            <h2>About Us</h2>
            <p>
              Fucbook is a social networking platform where you can connect with
              friends, share updates, and stay updated with the latest trends.
            </p>
          </div>
        </section>
        {/* Additional sections for features, services, portfolio, etc. */}
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Fucbook. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
