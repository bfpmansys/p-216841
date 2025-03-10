
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
import Establishments from "./pages/Establishments";
import Compliance from "./pages/Compliance";
import Inspection from "./pages/Inspection";
import { EstablishmentList } from "./components/dashboard/EstablishmentList";
import { EstablishmentCard } from "./components/dashboard/EstablishmentCard";
import AdminDashboard from "./pages/AdminDashboard";
import InspectorDashboard from "./pages/InspectorDashboard";
import Reports from "./pages/admin/Reports";
import Inspections from "./pages/admin/Inspections";
import AdminEstablishments from "./pages/admin/AdminEstablishments";
import { Settings } from "lucide-react";
import AdminApplications from "./pages/admin/AdminApplications";
import AdminCalendar from "./pages/admin/AdCalendar";
import InsCalendar from "./pages/admin/inspector/InsCalendar";
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
          <Route path="/establishments" element={<Establishments />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/inspection" element={<Inspection />} />
          <Route path="/ApplicationForm" element={<ApplicationForm />} />
          <Route path="/inspector-dashboard" element={<InspectorDashboard />} />

          
          <Route path="/dashboard/EstablishmentList" element={<EstablishmentList />} />
          <Route path="/dashboard/EstablishmentCard" element={<EstablishmentCard name={""} status={"REGISTERED"} dtiNumber={""} />} />
          <Route path="/inspection" element={<Inspection />} />


          {/* admin */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-users" element={<Reports />} />
          <Route path="/admin-establishments" element={<AdminEstablishments />} />
          <Route path="/admin-applications" element={<AdminApplications />} />
          <Route path="/admin-inspections" element={<Inspections />} />
          <Route path="/admin-calendar" element={<AdminCalendar />} />
          <Route path="/admin-messages" element={<Reports />} />

          
          <Route path="/ins-calendar" element={<InsCalendar />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
