import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { ModeToggle } from "./components/ui/mode-toggle.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import ServerStatus from "./components/ServerStatusBadge.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
      <Toaster />
      <ServerStatus />
      <div className="fixed bottom-12 md:bottom-6 left-6">
        <ModeToggle />
      </div>
    </ThemeProvider>
  </React.StrictMode>
);
