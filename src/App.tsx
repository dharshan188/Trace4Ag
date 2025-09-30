import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Homepage from "./pages/Homepage";
import FarmerPortal from "./pages/FarmerPortal";
import AggregatorDashboard from "./pages/AggregatorDashboard";
import ConsumerVerification from "./pages/ConsumerVerification";
import AdminDashboard from "./pages/AdminDashboard";
import QRCodePage from "./pages/QRCodePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/farmer" element={<FarmerPortal />} />
            <Route path="/aggregator" element={<AggregatorDashboard />} />
            <Route path="/consumer" element={<ConsumerVerification />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/qr-code" element={<QRCodePage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
