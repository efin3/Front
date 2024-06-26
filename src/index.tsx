import React from "react";
import ReactDOM from "react-dom/client";
import { EscolaLMSContextProvider } from "@escolalms/sdk/lib/react/context";
import App from "./App";
import WebFont from "webfontloader";
import "./i18n";
import "./sentry";
import { GlobalThemeProvider } from "@escolalms/components/lib/theme/provider";

declare global {
  interface Window {
    REACT_APP_API_URL: string;
  }
}

const API_URL =
  window.REACT_APP_API_URL ||
  (process && process.env && process.env.REACT_APP_PUBLIC_API_URL);

WebFont.load({
  google: {
    families: [
      "Nunito:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600;1,700;1,800",
    ],
  },
});

ReactDOM.createRoot(document.getElementById("root") as Element).render(
  <React.StrictMode>
    {API_URL ? (
      <EscolaLMSContextProvider apiUrl={API_URL} initialFetch={false}>
        <GlobalThemeProvider>
          <App />
        </GlobalThemeProvider>
      </EscolaLMSContextProvider>
    ) : (
      <pre>
        error `process.env.REACT_APP_PUBLIC_API_URL || window.REACT_APP_API_URL`
        not set
      </pre>
    )}
  </React.StrictMode>
);
