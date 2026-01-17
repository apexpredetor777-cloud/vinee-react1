// Booking Context for Railway Ticket Reservation System
// Manages all bookings with localStorage persistence

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Booking, Passenger, generateBookingId, generatePNR, generateSeatNumber } from '@/data/mockData';

interface BookingContextType {
  bookings: Booking[];
  currentBooking: Partial<Booking> | null;
  addBooking: (booking: Omit<Booking, 'id' | 'pnr' | 'seatNumbers' | 'bookedAt' | 'status'>) => Booking;
  cancelBooking: (bookingId: string) => boolean;
  getBooking: (bookingId: string) => Booking | undefined;
  getBookingByPNR: (pnr: string) => Booking | undefined;
  setCurrentBooking: (booking: Partial<Booking> | null) => void;
  clearCurrentBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const STORAGE_KEY = 'railway_bookings';

// Sample bookings for demo
const sampleBookings: Booking[] = [
  {
    id: 'BK1704067200001',
    pnr: 'PNR1234567890',
    trainId: '1',
    trainNumber: '12301',
    trainName: 'Rajdhani Express',
    source: 'NDLS',
    destination: 'HWH',
    journeyDate: '2025-01-15',
    classCode: '2A',
    className: 'Second AC',
    passengers: [
      { name: 'Rahul Sharma', age: 28, gender: 'male' },
      { name: 'Priya Sharma', age: 26, gender: 'female' },
    ],
    totalFare: 5600,
    status: 'confirmed',
    bookedAt: '2025-01-05T10:30:00Z',
    seatNumbers: ['2AA-15', '2AA-16'],
  },
  {
    id: 'BK1704067200002',
    pnr: 'PNR0987654321',
    trainId: '4',
    trainNumber: '12621',
    trainName: 'Tamil Nadu Express',
    source: 'NDLS',
    destination: 'MAS',
    journeyDate: '2025-01-20',
    classCode: '3A',
    className: 'Third AC',
    passengers: [
      { name: 'Amit Kumar', age: 35, gender: 'male' },
    ],
    totalFare: 2250,
    status: 'confirmed',
    bookedAt: '2025-01-04T14:45:00Z',
    seatNumbers: ['3AB-42'],
  },
];

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentBooking, setCurrentBooking] = useState<Partial<Booking> | null>(null);

  // Load bookings from localStorage on mount
  useEffect(() => {
    const storedBookings = localStorage.getItem(STORAGE_KEY);
    if (storedBookings) {
      try {
        const parsedBookings = JSON.parse(storedBookings);
        setBookings(parsedBookings);
      } catch (error) {
        console.error('Error parsing stored bookings:', error);
        // Initialize with sample bookings if parsing fails
        setBookings(sampleBookings);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleBookings));
      }
    } else {
      // Initialize with sample bookings for demo
      setBookings(sampleBookings);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleBookings));
    }
  }, []);

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    if (bookings.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    }
  }, [bookings]);

  // Add a new booking
  const addBooking = (bookingData: Omit<Booking, 'id' | 'pnr' | 'seatNumbers' | 'bookedAt' | 'status'>): Booking => {
    const seatNumbers = bookingData.passengers.map(() => 
      generateSeatNumber(bookingData.classCode)
    );

    const newBooking: Booking = {
      ...bookingData,
      id: generateBookingId(),
      pnr: generatePNR(),
      seatNumbers,
      bookedAt: new Date().toISOString(),
      status: 'confirmed',
    };

    setBookings(prev => [newBooking, ...prev]);
    return newBooking;
  };

  // Cancel a booking
  const cancelBooking = (bookingId: string): boolean => {
    const bookingIndex = bookings.findIndex(b => b.id === bookingId);
    if (bookingIndex === -1) return false;

    setBookings(prev =>
      prev.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: 'cancelled' as const }
          : booking
      )
    );
    return true;
  };

  // Get a booking by ID
  const getBooking = (bookingId: string): Booking | undefined => {
    return bookings.find(b => b.id === bookingId);
  };

  // Get a booking by PNR
  const getBookingByPNR = (pnr: string): Booking | undefined => {
    return bookings.find(b => b.pnr.toLowerCase() === pnr.toLowerCase());
  };

  // Clear current booking
  const clearCurrentBooking = () => {
    setCurrentBooking(null);
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        currentBooking,
        addBooking,
        cancelBooking,
        getBooking,
        getBookingByPNR,
        setCurrentBooking,
        clearCurrentBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
