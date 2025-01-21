import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Landing from "./_comp/Landing";
import Pricing from "./_comp/Pricing";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
