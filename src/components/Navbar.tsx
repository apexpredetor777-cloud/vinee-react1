// Navbar Component for Railway Ticket Reservation System
// Includes responsive design, navigation links, and admin toggle

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Train, 
  Home, 
  Search, 
  Ticket, 
  ClipboardList, 
  LogIn, 
  LogOut, 
  Menu, 
  X,
  UserCircle,
  Shield,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const { isAuthenticated, isAdmin, user, logout, toggleAdminMode } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/search', label: 'Search Trains', icon: Search },
    { to: '/book', label: 'Book Ticket', icon: Ticket },
    { to: '/bookings', label: 'My Bookings', icon: ClipboardList },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-primary shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-primary-foreground font-bold text-xl hover:opacity-90 transition-opacity"
          >
            <Train className="h-8 w-8 text-secondary" />
            <span className="hidden sm:inline">Railway Reservations</span>
            <span className="sm:hidden">RailBook</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive(to)
                    ? "bg-secondary text-secondary-foreground"
                    : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}

            {isAdmin && (
              <Link
                to="/admin"
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive('/admin')
                    ? "bg-secondary text-secondary-foreground"
                    : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                )}
              >
                <Shield className="h-4 w-4" />
                Admin
              </Link>
            )}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {/* Admin Toggle */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleAdminMode}
                  className={cn(
                    "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10",
                    isAdmin && "bg-secondary/20"
                  )}
                >
                  {isAdmin ? (
                    <>
                      <Shield className="h-4 w-4 mr-1" />
                      Admin
                    </>
                  ) : (
                    <>
                      <User className="h-4 w-4 mr-1" />
                      User
                    </>
                  )}
                </Button>

                {/* User Info */}
                <div className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                  <UserCircle className="h-5 w-5" />
                  <span className="hidden lg:inline">{user?.fullName}</span>
                </div>

                {/* Logout */}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={logout}
                  className="btn-railway"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    <LogIn className="h-4 w-4 mr-1" />
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="secondary" size="sm" className="btn-railway">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-primary-foreground hover:bg-primary-foreground/10 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive(to)
                      ? "bg-secondary text-secondary-foreground"
                      : "text-primary-foreground/80 hover:bg-primary-foreground/10"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </Link>
              ))}

              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive('/admin')
                      ? "bg-secondary text-secondary-foreground"
                      : "text-primary-foreground/80 hover:bg-primary-foreground/10"
                  )}
                >
                  <Shield className="h-5 w-5" />
                  Admin Panel
                </Link>
              )}

              <div className="border-t border-primary-foreground/20 my-2" />

              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3 text-primary-foreground/80">
                    <UserCircle className="h-5 w-5" />
                    <span>{user?.fullName}</span>
                  </div>

                  <button
                    onClick={toggleAdminMode}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-primary-foreground/80 hover:bg-primary-foreground/10 transition-colors"
                  >
                    {isAdmin ? (
                      <>
                        <User className="h-5 w-5" />
                        Switch to User Mode
                      </>
                    ) : (
                      <>
                        <Shield className="h-5 w-5" />
                        Switch to Admin Mode
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-primary-foreground/80 hover:bg-primary-foreground/10 transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-primary-foreground/80 hover:bg-primary-foreground/10 transition-colors"
                  >
                    <LogIn className="h-5 w-5" />
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium bg-secondary text-secondary-foreground transition-colors"
                  >
                    <UserCircle className="h-5 w-5" />
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
