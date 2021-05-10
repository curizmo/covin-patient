import "./App.css";
import React, { useState } from "react";
import PageRouter from "./pages/PageRouter";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <PageRouter />
      </div>
    </Router>
  );
}

export default App;
