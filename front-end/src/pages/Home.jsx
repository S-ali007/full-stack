import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import "../../src/Home.css";

function Home() {
  const navigation = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [expirationInSeconds, setExpirationInSeconds] = useState(0);
  const [currentTimeInSeconds, setCurrentTimeInSeconds] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = localStorage.getItem("userData");
        const userData = JSON.parse(user);
        setFirstName(userData.user.firstName);
        const refreshToken = userData.refreshToken;
        console.log(refreshToken, "old");

        const decodedToken = jwtDecode(refreshToken);
        const expireTimeInSecond = decodedToken.exp;
        console.log(expireTimeInSecond);
        setExpirationInSeconds(expireTimeInSecond);

        const currentTimeInSeconds = Math.floor(Date.now() / 1000);

        setCurrentTimeInSeconds(currentTimeInSeconds);
        const time = expireTimeInSecond - currentTimeInSeconds;
        console.log(time, "time");
        if (time <= 20) {
          const interval = setInterval(async () => {
            try {
              const { data: res } = await axios.post(
                "/api/v1/users/refresh-token",
                refreshToken
              );
              // console.log(res.data.newRefreshToken,"new")
              const newRefreshToken = res.data.newRefreshToken;
              console.log(newRefreshToken, "new");
              localStorage.setItem(
                "userData",
                JSON.stringify({
                  refreshToken: newRefreshToken,
                })
              );
              document.cookie = `refreshToken=${newRefreshToken}; `;
            } catch (error) {
              console.error("Token refresh failed:", error);
            }
          }, 2000);
          return () => clearInterval(interval);
        } else {
          return;
        }
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
