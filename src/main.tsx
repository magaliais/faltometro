import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CardsProvider } from "./contexts/CardsContext.tsx";
import { Analytics } from "@vercel/analytics/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CardsProvider>
      <Analytics />
      <App />
    </CardsProvider>
  </React.StrictMode>
);
