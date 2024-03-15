import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios
      .get("/api/games")
      .then((res) => {
        setGames(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <>
      <h1>
        {games.map((game, index) => (
          <ul key={index}>
            {" "}
            <li>
              {" "}
              Name:{game.title} <br /> <span>Version:{game.version}</span>
              <br />
              <br />
            </li>
          </ul>
        ))}
      </h1>
    </>
  );
}

export default App;
