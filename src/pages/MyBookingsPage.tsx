// My Bookings Page - List of all user bookings

import React, { useState } from 'react';
import { useBooking } from '@/context/BookingContext';
import BookingCard from '@/components/BookingCard';
import TicketModal from '@/components/TicketModal';
import ConfirmationModal from '@/components/ConfirmationModal';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Booking } from '@/data/mockData';
import { ClipboardList, Ticket, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyBookingsPage: React.FC = () => {
  const { bookings, cancelBooking } = useBooking();
  const { toast } = useToast();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);

  const handleViewTicket = (booking: Booking) => setSelectedBooking(booking);
  const handleCancelClick = (booking: Booking) => setBookingToCancel(booking);

  const handleConfirmCancel = () => {
    if (bookingToCancel) {
      cancelBooking(bookingToCancel.id);
      toast({ title: "Booking Cancelled", description: `PNR ${bookingToCancel.pnr} has been cancelled.` });
      setBookingToCancel(null);
    }
  };

  const activeBookings = bookings.filter(b => b.status !== 'cancelled');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Bookings</h1>
          <p className="text-muted-foreground">View and manage your train bookings</p>
        </div>

        {bookings.length === 0 ? (
          <Card className="p-12 text-center animate-fade-in">
            <Ticket className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Bookings Yet</h3>
            <p className="text-muted-foreground mb-4">Start by searching for trains and booking your first ticket.</p>
            <Link to="/search"><Button><Search className="h-4 w-4 mr-2" />Search Trains</Button></Link>
          </Card>
        ) : (
          <div className="space-y-8">
            {activeBookings.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-primary" />Active Bookings ({activeBookings.length})
                </h2>
                <div className="grid gap-4">{activeBookings.map(b => <BookingCard key={b.id} booking={b} onView={handleViewTicket} onCancel={handleCancelClick} />)}</div>
              </div>
            )}
            {cancelledBookings.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4 text-muted-foreground">Cancelled ({cancelledBookings.length})</h2>
                <div className="grid gap-4">{cancelledBookings.map(b => <BookingCard key={b.id} booking={b} onView={handleViewTicket} onCancel={handleCancelClick} />)}</div>
              </div>
            )}
          </div>
        )}

        <TicketModal booking={selectedBooking} isOpen={!!selectedBooking} onClose={() => setSelectedBooking(null)} />
        <ConfirmationModal isOpen={!!bookingToCancel} onClose={() => setBookingToCancel(null)} onConfirm={handleConfirmCancel} title="Cancel Booking?" description={`Are you sure you want to cancel booking ${bookingToCancel?.pnr}? This action cannot be undone.`} confirmText="Yes, Cancel" variant="destructive" />
      </div>
    </div>
  );
};

export default MyBookingsPage;
