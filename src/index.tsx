import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import MetamaskProvider from "@/utils/MetamaskProvider";
const rootElement = document.getElementById("root");

const root = createRoot(rootElement!);

root.render(
  <StrictMode>
    <MetamaskProvider>
      <App />
    </MetamaskProvider>
  </StrictMode>
);
