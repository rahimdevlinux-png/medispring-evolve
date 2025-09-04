import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Login } from "@/pages/Login";
import { Clinics } from "@/pages/Clinics";
import { Doctors } from "@/pages/Doctors";
import { Patients } from "@/pages/Patients";
import { Appointments } from "@/pages/Appointments";
import { Billing } from "@/pages/Billing";
import { Pharmacy } from "@/pages/Pharmacy";
import { Labs } from "@/pages/Labs";
import { Reports } from "@/pages/Reports";
import { Notifications } from "@/pages/Notifications";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/clinics" 
              element={
                <ProtectedRoute allowedRoles={['super_master_admin']}>
                  <Clinics />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctors" 
              element={
                <ProtectedRoute allowedRoles={['super_master_admin', 'super_admin']}>
                  <Doctors />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/patients" 
              element={
                <ProtectedRoute allowedRoles={['super_master_admin', 'super_admin', 'doctor', 'nurse']}>
                  <Patients />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/appointments" 
              element={
                <ProtectedRoute allowedRoles={['super_master_admin', 'super_admin', 'doctor', 'nurse']}>
                  <Appointments />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/billing" 
              element={
                <ProtectedRoute allowedRoles={['super_master_admin', 'super_admin', 'billing']}>
                  <Billing />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/pharmacy" 
              element={
                <ProtectedRoute allowedRoles={['super_master_admin', 'super_admin', 'pharmacy']}>
                  <Pharmacy />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/labs" 
              element={
                <ProtectedRoute allowedRoles={['super_master_admin', 'super_admin', 'doctor']}>
                  <Labs />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/reports" 
              element={
                <ProtectedRoute allowedRoles={['super_master_admin', 'super_admin']}>
                  <Reports />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/notifications" 
              element={
                <ProtectedRoute allowedRoles={['super_master_admin', 'super_admin', 'doctor', 'nurse', 'billing', 'pharmacy']}>
                  <Notifications />
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
