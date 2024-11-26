import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      <Link to="/openlibrary">OpenLibrary</Link>
      <Link to="/google">Google</Link>
      <Link to="/apple">Apple</Link>
      <Link to="/kindle">Kindle</Link>
      <Link to="/amazon">Amazon</Link>
    </div>
  );
};

export default Home;
