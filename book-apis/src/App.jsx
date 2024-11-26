import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import OpenLibrary from "./pages/OpenLibrary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/google"></Route>
        <Route path="/amazon"></Route>
        <Route path="/kindle"></Route>
        <Route path="/openlibrary" element={<OpenLibrary />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
