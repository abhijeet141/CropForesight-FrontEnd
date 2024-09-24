import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Auth0Provider } from '@auth0/auth0-react';
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_DOMAIN}
    clientId={process.env.REACT_APP_ID}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  useRefreshTokens={true}
  cacheLocation="localstorage"
  >
    <App />
    {/* <Footer/> */}
    </Auth0Provider>  
);

serviceWorkerRegistration.register();
reportWebVitals();
