
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Terms from "./pages/Terms";
import Dashboard from "./pages/Dashboard";
import EditProfile from "./pages/EditProfile";
import NotFound from "./pages/NotFound";
import ApplicationForm from "./pages/ApplicationForm";
import RequirementsUpload from "./pages/RequirementsUpload";
import ApplicationSummary from "./pages/ApplicationSummary";
import { QuickLinks } from "./components/dashboard/QuickLinks";
import Inbox from "./pages/Inbox";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/profile" element={<EditProfile />} />
          <Route path="/dashboard/apply/:type" element={<ApplicationForm />} />
          <Route path="/dashboard/apply/:type/requirements" element={<RequirementsUpload />} />
          <Route path="/dashboard/apply/:type/summary" element={<ApplicationSummary />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/quick-links" element={<QuickLinks />} /> 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
