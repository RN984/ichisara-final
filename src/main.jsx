import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { SWRConfig } from "swr";
import RootChooser from "./entry/RootChooser.jsx";
import { sheetFetcher, localStorageProvider } from "./utils/swr.js";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SWRConfig
      value={{
        fetcher: sheetFetcher,
        provider: localStorageProvider,
        revalidateOnFocus: false,
        dedupingInterval: 300_000,
        keepPreviousData: true,
        errorRetryCount: 8,
        errorRetryInterval: 3_000,
      }}
    >
      <Suspense fallback={<div style={{textAlign:"center",marginTop:100}}>起動中…</div>}>
        <RootChooser />
      </Suspense>
    </SWRConfig>
  </React.StrictMode>
);
