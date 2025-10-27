import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { LoadingProvider } from "./context/LoadingContext.tsx";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner";
import ReactQueryLoadingSync from "@/lib/loader/ReactQueryLoadingSync.tsx";
import { AuthProvider, CartProvider, ConfirmProvider } from "@/context/index.ts";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error(`API Error: ${error?.message || 'Something went wrong.'}`);
    }
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      toast.error(`API Error: ${error?.message || 'Something went wrong.'}`);
    }
  })
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LoadingProvider>
        <CartProvider>
          <AuthProvider>
            <ConfirmProvider>
              <ReactQueryLoadingSync />
              <App />
              <Toaster />
            </ConfirmProvider>
          </AuthProvider>
        </CartProvider>
      </LoadingProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
