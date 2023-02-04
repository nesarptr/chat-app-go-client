import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import AuthProvider from "./context/AuthProvider";
import routes from "./routes/Routes";
import "./index.css";

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={routes} />
  </AuthProvider>
);
