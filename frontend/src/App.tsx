import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as React from "react";
import Landing from "./pages/Landing";
import ServeQuestion, { State } from "./pages/ServeQuestion";
import { UserRank } from "~pages/UserRank";
import ImageToQuestion from "~pages/ImageToQuestion";

function App() {
  const [state, setState] = React.useState<State>(
    JSON.parse(
      localStorage.getItem("state") ||
        `{"questionHistory": [], "answer": "", "currentState": "Presenting Question"}`
    )
  );
  console.log(state);
  React.useEffect(() => {
    // store the question history in local storage
    localStorage.setItem("state", JSON.stringify(state));
  }, [state.questionHistory]);
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/serveQuestion"
        element={<ServeQuestion state={state} setState={setState} />}
      />
      <Route path="/userRank" element={<UserRank state={state} />} />
      <Route path="/imageToQuestion" element={<ImageToQuestion />} />
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
