// Confirmation Page - Ticket confirmation after successful booking

import React from 'react';
import { useLocation, useNavigate, Navigate, Link } from 'react-router-dom';
import { Booking, getStationName, formatCurrency, formatDate } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  CheckCircle, 
  Train, 
  Calendar, 
  MapPin, 
  User, 
  CreditCard, 
  Download,
  ClipboardList,
  ArrowRight,
  QrCode,
  PartyPopper
} from 'lucide-react';

interface LocationState {
  booking: Booking;
}

const ConfirmationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const state = location.state as LocationState;

  // Redirect if no booking data
  if (!state?.booking) {
    return <Navigate to="/" replace />;
  }

  const { booking } = state;

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your ticket is being downloaded (simulated).",
    });
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Success Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="bg-success/20 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-success" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <PartyPopper className="h-6 w-6 text-secondary" />
            <h1 className="text-3xl font-bold text-foreground">Booking Confirmed!</h1>
            <PartyPopper className="h-6 w-6 text-secondary" />
          </div>
          <p className="text-muted-foreground">
            Your ticket has been booked successfully. Have a great journey!
          </p>
        </div>

        {/* Ticket Card */}
        <Card className="shadow-xl overflow-hidden animate-fade-in mb-6" style={{ animationDelay: '0.1s' }}>
          {/* Ticket Header */}
          <div className="bg-primary text-primary-foreground p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-secondary rounded-lg p-2">
                  <Train className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <h2 className="font-bold text-xl">{booking.trainName}</h2>
                  <p className="text-primary-foreground/80">#{booking.trainNumber}</p>
                </div>
              </div>
              <Badge className="bg-success text-success-foreground text-lg px-4 py-1">
                {booking.status.toUpperCase()}
              </Badge>
            </div>
          </div>

          <CardContent className="p-6">
            {/* PNR */}
            <div className="text-center py-4 bg-secondary/10 rounded-lg mb-6">
              <p className="text-sm text-muted-foreground mb-1">PNR Number</p>
              <p className="font-mono font-bold text-3xl text-primary tracking-wider">{booking.pnr}</p>
            </div>

            {/* Route & Date */}
            <div className="flex items-center justify-between mb-6 p-4 bg-muted/50 rounded-lg">
              <div className="text-center">
                <p className="font-bold text-lg text-primary">{booking.source}</p>
                <p className="text-sm text-muted-foreground">{getStationName(booking.source)}</p>
              </div>
              <div className="flex flex-col items-center">
                <Calendar className="h-5 w-5 text-secondary mb-1" />
                <p className="text-sm font-medium">{formatDate(booking.journeyDate)}</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-lg text-primary">{booking.destination}</p>
                <p className="text-sm text-muted-foreground">{getStationName(booking.destination)}</p>
              </div>
            </div>

            {/* Class & Booking Info */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Class</p>
                <p className="font-medium">{booking.className}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Booking ID</p>
                <p className="font-medium text-sm">{booking.id}</p>
              </div>
            </div>

            {/* Passengers */}
            <div className="mb-6">
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Passenger Details
              </h3>
              <div className="space-y-2">
                {booking.passengers.map((passenger, index) => (
                  <div 
                    key={index} 
                    className="flex justify-between items-center p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium">{passenger.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {passenger.age} yrs, {passenger.gender.charAt(0).toUpperCase() + passenger.gender.slice(1)}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="font-mono">
                      {booking.seatNumbers[index]}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Fare */}
            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20 mb-6">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <span className="font-medium">Total Fare Paid</span>
              </div>
              <span className="text-2xl font-bold text-primary">{formatCurrency(booking.totalFare)}</span>
            </div>

            {/* QR Code */}
            <div className="flex justify-center mb-6">
              <div className="bg-muted rounded-lg p-6 flex flex-col items-center gap-2">
                <QrCode className="h-24 w-24 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Scan for verification at station</p>
              </div>
            </div>

            {/* Booking Date */}
            <p className="text-center text-sm text-muted-foreground">
              Booked on: {formatDate(booking.bookedAt)}
            </p>
          </CardContent>

          {/* Ticket Footer */}
          <div className="bg-muted/50 p-4 text-center text-xs text-muted-foreground border-t border-dashed border-border">
            Please carry a valid ID proof during your journey. This is a computer generated ticket.
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Button
            variant="outline"
            size="lg"
            onClick={handleDownload}
            className="flex-1"
          >
            <Download className="h-5 w-5 mr-2" />
            Download Ticket
          </Button>
          <Link to="/bookings" className="flex-1">
            <Button
              size="lg"
              className="w-full btn-railway bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              <ClipboardList className="h-5 w-5 mr-2" />
              View My Bookings
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-primary hover:underline text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
