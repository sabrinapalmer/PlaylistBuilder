import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ logout, loginState }) => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Spotify Playlist Builder</h1>
        </Link>
        {loginState ? <button onClick={logout}>logout</button> : <></>}
      </div>
    </header>
  );
};

export default Navbar;
