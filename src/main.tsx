import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";

import App from "./App.tsx";
import { config } from "./wagmi.ts";

import { FormoAnalyticsProvider } from "@formo/analytics";

import "./index.css";

const queryClient = new QueryClient();

const WRITE_KEY = import.meta.env.VITE_FORMO_ANALYTICS_WRITE_KEY;

if (!WRITE_KEY) {
  throw new Error(
    "VITE_FORMO_ANALYTICS_WRITE_KEY environment variable is required but not provided"
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <FormoAnalyticsProvider
      writeKey={WRITE_KEY}
      options={{
        tracking: true,
        flushInterval: 500 * 10, // 5 secs
        logger: {
          enabled: true,
          levels: ["error", "warn", "info"],
        },
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </WagmiProvider>
    </FormoAnalyticsProvider>
  </React.StrictMode>
);
