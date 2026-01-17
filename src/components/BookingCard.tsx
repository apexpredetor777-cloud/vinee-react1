// Booking Card Component - Displays booking in My Bookings

import React from 'react';
import { Booking, getStationName, formatCurrency, formatDate } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Train, 
  Calendar, 
  Users, 
  CreditCard, 
  Eye, 
  XCircle,
  ArrowRight,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookingCardProps {
  booking: Booking;
  onView: (booking: Booking) => void;
  onCancel: (booking: Booking) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, onView, onCancel }) => {
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

  const isPastJourney = new Date(booking.journeyDate) < new Date();

  return (
    <Card className={cn(
      "card-railway overflow-hidden",
      booking.status === 'cancelled' && "opacity-60"
    )}>
      <CardHeader className="bg-primary/5 pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="bg-primary rounded-lg p-2">
              <Train className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{booking.trainName}</h3>
              <p className="text-sm text-muted-foreground">#{booking.trainNumber} | PNR: {booking.pnr}</p>
            </div>
          </div>
          <Badge className={getStatusColor(booking.status)}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        {/* Journey Details */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-center">
            <p className="font-medium text-primary">{booking.source}</p>
            <p className="text-xs text-muted-foreground">{getStationName(booking.source)}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-border" />
            <ArrowRight className="h-4 w-4 text-secondary" />
            <div className="w-8 h-0.5 bg-border" />
          </div>
          <div className="text-center">
            <p className="font-medium text-primary">{booking.destination}</p>
            <p className="text-xs text-muted-foreground">{getStationName(booking.destination)}</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-border">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Journey Date</p>
              <p className="text-sm font-medium">{formatDate(booking.journeyDate)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Class</p>
              <p className="text-sm font-medium">{booking.className}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Passengers</p>
              <p className="text-sm font-medium">{booking.passengers.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Total Fare</p>
              <p className="text-sm font-medium text-primary">{formatCurrency(booking.totalFare)}</p>
            </div>
          </div>
        </div>

        {/* Passengers */}
        <div className="mt-3">
          <p className="text-xs text-muted-foreground mb-2">Passengers:</p>
          <div className="flex flex-wrap gap-2">
            {booking.passengers.map((passenger, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {passenger.name} ({passenger.age}, {passenger.gender.charAt(0).toUpperCase()})
              </Badge>
            ))}
          </div>
        </div>

        {/* Seat Numbers */}
        <div className="mt-3">
          <p className="text-xs text-muted-foreground mb-2">Seats:</p>
          <div className="flex flex-wrap gap-2">
            {booking.seatNumbers.map((seat, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {seat}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4 pt-3 border-t border-border">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onView(booking)}
            className="flex-1"
          >
            <Eye className="h-4 w-4 mr-1" />
            View Ticket
          </Button>
          {booking.status !== 'cancelled' && !isPastJourney && (
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => onCancel(booking)}
              className="flex-1"
            >
              <XCircle className="h-4 w-4 mr-1" />
              Cancel
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
