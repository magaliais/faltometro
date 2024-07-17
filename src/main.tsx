import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CardsProvider } from "./contexts/CardsContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CardsProvider>
      <App />
    </CardsProvider>
  </React.StrictMode>
);
