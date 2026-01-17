// Footer Component for Railway Ticket Reservation System

import React from 'react';
import { Link } from 'react-router-dom';
import { Train, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Train className="h-8 w-8 text-secondary" />
              <span className="font-bold text-xl">Railway Reservations</span>
            </div>
            <p className="text-primary-foreground/70 text-sm">
              Your trusted platform for hassle-free railway ticket booking across India.
              Book tickets, check PNR status, and manage your journeys with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-secondary">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/search" className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">
                  Search Trains
                </Link>
              </li>
              <li>
                <Link to="/book" className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">
                  Book Tickets
                </Link>
              </li>
              <li>
                <Link to="/bookings" className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">
                  My Bookings
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-primary-foreground/70 hover:text-secondary transition-colors text-sm">
                  Login / Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-secondary">Services</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>Online Ticket Booking</li>
              <li>PNR Status Check</li>
              <li>Seat Availability</li>
              <li>Train Schedule</li>
              <li>Ticket Cancellation</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-secondary">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Phone className="h-4 w-4 text-secondary" />
                <span>139 (Railway Enquiry)</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Mail className="h-4 w-4 text-secondary" />
                <span>support@railwayreservations.in</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-primary-foreground/70">
                <MapPin className="h-4 w-4 text-secondary mt-0.5" />
                <span>Rail Bhavan, New Delhi, India - 110001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/70">
              © {currentYear} Railway Ticket Reservation System. All rights reserved.
            </p>
            <p className="text-sm text-primary-foreground/70 flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-secondary fill-secondary" /> for Academic Mini Project
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
