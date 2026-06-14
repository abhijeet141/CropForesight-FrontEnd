import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY


if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

// brand the Clerk sign-in / sign-up modals to match CropForesight
const clerkAppearance = {
  variables: {
    colorPrimary: "#1c3829",
    colorText: "#21281f",
    colorTextSecondary: "#5a645a",
    colorBackground: "#ffffff",
    colorInputText: "#21281f",
    fontFamily: '"Archivo", sans-serif',
    borderRadius: "10px",
  },
  elements: {
    headerTitle: { fontFamily: '"Fraunces", serif', fontWeight: 600 },
    card: { boxShadow: "0 24px 60px -24px rgba(28,56,41,0.35)" },
    formButtonPrimary: {
      fontWeight: 600,
      textTransform: "none",
      "&:hover": { backgroundColor: "#234733" },
    },
  },
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/" appearance={clerkAppearance}>
  <App />
</ClerkProvider>
</React.StrictMode>,

);

