import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
console.log("Marketing app bootstrap loaded");

const mount = (el: HTMLElement | null) => {
  if (!el) {
    throw new Error("Invalid element provided to mount function");
  }

  const root = ReactDOM.createRoot(el);
  root.render(<App />);

  // Return an unmount function for cleanup
  return () => {
    root.unmount();
  };
};

// For local development
if (process.env.NODE_ENV === "development") {
  const element = document.getElementById("dev-marketing");
  if (element) {
    mount(element);
  }
}

export default mount;
