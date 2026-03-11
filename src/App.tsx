import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import PatientList from "./pages/patients/PatientList";
import InvoiceList from "./pages/invoices/InvoiceList";
import InvoiceForm from "./pages/invoices/InvoiceForm";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<PatientList />} />
            <Route path="/patients/new" element={<PatientList />} />
            <Route path="/invoices" element={<InvoiceList />} />
            <Route path="/invoices/new" element={<InvoiceForm />} />
            <Route path="/prescriptions" element={<PlaceholderPage />} />
            <Route path="/referrals" element={<PlaceholderPage />} />
            <Route path="/sick-leaves" element={<PlaceholderPage />} />
            <Route path="/appointments" element={<PlaceholderPage />} />
            <Route path="/master/organisation" element={<PlaceholderPage />} />
            <Route path="/master/services" element={<PlaceholderPage />} />
            <Route path="/master/items" element={<PlaceholderPage />} />
            <Route path="/master/consultants" element={<PlaceholderPage />} />
            <Route path="/master/schemes" element={<PlaceholderPage />} />
            <Route path="/master/diagnoses" element={<PlaceholderPage />} />
            <Route path="/master/investigations" element={<PlaceholderPage />} />
            <Route path="/master/procedures" element={<PlaceholderPage />} />
            <Route path="/stock/items" element={<PlaceholderPage />} />
            <Route path="/stock/received" element={<PlaceholderPage />} />
            <Route path="/stock/dispensed" element={<PlaceholderPage />} />
            <Route path="/stock/adjustments" element={<PlaceholderPage />} />
            <Route path="/stock/reports" element={<PlaceholderPage />} />
            <Route path="/batches/create" element={<PlaceholderPage />} />
            <Route path="/batches" element={<PlaceholderPage />} />
            <Route path="/batches/status" element={<PlaceholderPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
