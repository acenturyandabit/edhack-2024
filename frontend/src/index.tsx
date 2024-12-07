import * as React from "react";
import { createRoot } from "react-dom/client";
import { UserRank } from "./pages/UserRank";
import { ServeQuestion } from "~pages/ServeQuestion";
const App = () => {
  return (
    <>
      <UserRank />
      <ServeQuestion />
    </>
  );
};

// Must use a JSXElement otherwise hooks don't work
createRoot(document.getElementById("root")!).render(<App />);
