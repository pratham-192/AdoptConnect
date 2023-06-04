import React from "react";
import Routers from "./components/Routers";
import { BrowserRouter as Router } from "react-router-dom";

export default function App() {
  return (
    <>
      <Router>
        <Routers />
      </Router>
    </>
  );
}
