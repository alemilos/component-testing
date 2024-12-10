import React from "react";
import Calendar from "./calendar/Calendar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Calendar user="coach" />} />
        <Route path="/coachee" element={<Calendar user="coachee" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
