import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useRoutes } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
// Import routes from tempo-routes
import routes from "tempo-routes";

const queryClient = new QueryClient();

// Create a separate component for Tempo routes
const TempoRoutes = () => {
  return import.meta.env.VITE_TEMPO ? useRoutes(routes) : null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Tempo routes component will be rendered inside Router context */}
          {import.meta.env.VITE_TEMPO && (
            <Route path="/tempobook/*" element={<TempoRoutes />} />
          )}
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
