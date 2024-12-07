import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as React from "react";
import Landing from "./pages/Landing";
import ServeQuestion, { State } from "./pages/ServeQuestion";
import { UserRank } from "~pages/UserRank";

function App() {
  const [state, setState] = React.useState<State>({
    questionHistory: [],
    answer: "",
    currentState: "Presenting Question",
  });
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/serveQuestion" element={<ServeQuestion state={state} setState={setState} />} />
      <Route path="/userRank" element={<UserRank />} />
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
