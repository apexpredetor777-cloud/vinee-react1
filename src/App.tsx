import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { BookingProvider } from "@/context/BookingContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import RegisterPage from "@/pages/RegisterPage";
import LoginPage from "@/pages/LoginPage";
import SearchPage from "@/pages/SearchPage";
import SeatAvailabilityPage from "@/pages/SeatAvailabilityPage";
import BookingPage from "@/pages/BookingPage";
import PaymentPage from "@/pages/PaymentPage";
import ConfirmationPage from "@/pages/ConfirmationPage";
import MyBookingsPage from "@/pages/MyBookingsPage";
import AdminPage from "@/pages/AdminPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BookingProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/book" element={<SearchPage />} />
                  <Route path="/seat-availability" element={<SeatAvailabilityPage />} />
                  <Route path="/booking" element={<BookingPage />} />
                  <Route path="/payment" element={<PaymentPage />} />
                  <Route path="/confirmation" element={<ConfirmationPage />} />
                  <Route path="/bookings" element={<MyBookingsPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </BookingProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
