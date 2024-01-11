import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./mediaQuery.scss";

export const Context = createContext({});

function AppWrapper() {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [reload, setreload] = useState(true);
  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setisAuthenticated,
        reload,
        setreload,
      }}
    >
      <App />
    </Context.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<AppWrapper />);


