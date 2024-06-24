import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import axios from "axios";

const App = () => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token") || ""
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const token = params.get("access_token");
    if (token) {
      setAccessToken(token);
      localStorage.setItem("access_token", token);
      window.location.hash = ""; // Clear the hash
    }
  }, []);

  const login = () => {
    window.location = "http://localhost:4000/login";
  };

  const logout = () => {
    setAccessToken("");
    localStorage.removeItem("access_token");
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar logout={logout} loginState={accessToken ? true : false} />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={
                !accessToken ? (
                  <button onClick={login}>Login to Spotify</button>
                ) : (
                  <Home accessToken={accessToken} />
                )
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
