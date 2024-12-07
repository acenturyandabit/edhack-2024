import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "App";


// Must use a JSXElement otherwise hooks don't work
createRoot(document.getElementById("root")!).render(<App />);
