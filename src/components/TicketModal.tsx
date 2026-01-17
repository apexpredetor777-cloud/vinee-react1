// Ticket Modal Component - Shows ticket details in a modal

import React from 'react';
import { Booking, getStationName, formatCurrency, formatDate } from '@/data/mockData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Train, 
  Calendar, 
  MapPin, 
  User, 
  CreditCard, 
  Download,
  Printer,
  ArrowRight,
  QrCode
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TicketModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

const TicketModal: React.FC<TicketModalProps> = ({ booking, isOpen, onClose }) => {
  const { toast } = useToast();

  if (!booking) return null;

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your ticket is being downloaded (simulated).",
    });
  };

  const handlePrint = () => {
    toast({
      title: "Print Preview",
      description: "Opening print preview (simulated).",
    });
  };

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success text-success-foreground';
      case 'cancelled':
        return 'bg-destructive text-destructive-foreground';
      case 'waiting':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Train className="h-5 w-5 text-primary" />
            E-Ticket
          </DialogTitle>
        </DialogHeader>

        {/* Ticket Content */}
        <div className="border-2 border-dashed border-primary rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 text-center">
            <h3 className="font-bold text-lg">{booking.trainName}</h3>
            <p className="text-sm opacity-80">Train #{booking.trainNumber}</p>
          </div>

          {/* PNR & Status */}
          <div className="flex justify-between items-center p-4 bg-secondary/10 border-b border-border">
            <div>
              <p className="text-xs text-muted-foreground">PNR Number</p>
              <p className="font-mono font-bold text-lg">{booking.pnr}</p>
            </div>
            <Badge className={getStatusColor(booking.status)}>
              {booking.status.toUpperCase()}
            </Badge>
          </div>

          {/* Journey Details */}
          <div className="p-4 space-y-4">
            {/* Route */}
            <div className="flex items-center justify-between">
              <div className="text-center">
                <p className="font-bold text-primary">{booking.source}</p>
                <p className="text-xs text-muted-foreground">{getStationName(booking.source)}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-secondary" />
              <div className="text-center">
                <p className="font-bold text-primary">{booking.destination}</p>
                <p className="text-xs text-muted-foreground">{getStationName(booking.destination)}</p>
              </div>
            </div>

            {/* Date & Class */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="text-sm font-medium">{formatDate(booking.journeyDate)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Class</p>
                  <p className="text-sm font-medium">{booking.className}</p>
                </div>
              </div>
            </div>

            {/* Passengers */}
            <div>
              <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                <User className="h-3 w-3" /> Passengers
              </p>
              <div className="space-y-2">
                {booking.passengers.map((passenger, index) => (
                  <div 
                    key={index} 
                    className="flex justify-between items-center text-sm bg-muted/50 rounded px-3 py-2"
                  >
                    <span className="font-medium">{passenger.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">
                        {passenger.age}y, {passenger.gender.charAt(0).toUpperCase()}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {booking.seatNumbers[index]}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fare */}
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Total Fare</span>
              </div>
              <p className="font-bold text-lg text-primary">{formatCurrency(booking.totalFare)}</p>
            </div>

            {/* QR Code Placeholder */}
            <div className="flex justify-center pt-2">
              <div className="bg-muted rounded-lg p-4 flex flex-col items-center gap-2">
                <QrCode className="h-16 w-16 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Scan for verification</p>
              </div>
            </div>
          </div>

          {/* Booking Info */}
          <div className="bg-muted/50 p-3 text-center text-xs text-muted-foreground">
            Booking ID: {booking.id} | Booked on: {formatDate(booking.bookedAt)}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-2">
          <Button variant="outline" onClick={handlePrint} className="flex-1">
            <Printer className="h-4 w-4 mr-1" />
            Print
          </Button>
          <Button onClick={handleDownload} className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
            <Download className="h-4 w-4 mr-1" />
            Download
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketModal;
