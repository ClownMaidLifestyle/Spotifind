import React from "react";
// import { Auth0Provider } from "@auth0/auth0-react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

{
  /* <Auth0Provider
        domain="dev-fp7a08pe6xjrkmv6.us.auth0.com"
        clientId="bruyLDcrltnJ2vRgGILnKsN2G8ZWNAS6"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <App />
      </Auth0Provider> */
}
