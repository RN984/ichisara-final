import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import RootChooser from "./entry/RootChooser.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<div style={{textAlign:"center",marginTop:100}}>起動中…</div>}>
      <RootChooser />
    </Suspense>
  </React.StrictMode>
);
