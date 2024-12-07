import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as React from "react";
import Landing from "./pages/Landing";
import ServeQuestion from "./pages/ServeQuestion";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/serveQuestion" element={<ServeQuestion />} />
    </Routes>
  );
}

function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default RootApp;
