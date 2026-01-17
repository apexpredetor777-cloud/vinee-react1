// Mock data for Railway Ticket Reservation System
// This file contains all the mock/dummy data used for demonstration

export interface Station {
  code: string;
  name: string;
  city: string;
}

export interface Train {
  id: string;
  number: string;
  name: string;
  source: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  daysOfOperation: string[];
  classes: TrainClass[];
}

export interface TrainClass {
  code: string;
  name: string;
  fare: number;
  availableSeats: number;
  totalSeats: number;
}

export interface Booking {
  id: string;
  pnr: string;
  trainId: string;
  trainNumber: string;
  trainName: string;
  source: string;
  destination: string;
  journeyDate: string;
  classCode: string;
  className: string;
  passengers: Passenger[];
  totalFare: number;
  status: 'confirmed' | 'cancelled' | 'waiting';
  bookedAt: string;
  seatNumbers: string[];
}

export interface Passenger {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  isAdmin: boolean;
}

// All Karnataka District Stations + Major Indian Railway Stations
export const stations: Station[] = [
  // STATIONSSSSS
  { code: 'ILKL', name: 'Ilkal ', city: 'Ilkal' },
  { code: 'SBC', name: 'Bengaluru City Junction', city: 'Bengaluru' },
  { code: 'BGM', name: 'Belagavi Junction', city: 'Belagavi' },
  { code: 'UBL', name: 'Hubballi Junction', city: 'Hubballi' },
  { code: 'BGK', name: 'Bagalkot', city: 'Bagalkot' },
  { code: 'BJP', name: 'Bijapur (Vijayapura)', city: 'Vijayapura' },
  ];

// Mock Trains Data
export const trains: Train[] = [
  {
    id: '1',
    number: '12301',
    name: 'ILKAL Express',
    source: 'ILKL',
    destination: 'SBC',
    departureTime: '16:55',
    arrivalTime: '09:55',
    duration: '17h 00m',
    daysOfOperation: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    classes: [
      { code: '1A', name: 'First AC', fare: 4500, availableSeats: 18, totalSeats: 24 },
      { code: '2A', name: 'Second AC', fare: 2800, availableSeats: 42, totalSeats: 52 },
      { code: '3A', name: 'Third AC', fare: 1950, availableSeats: 65, totalSeats: 72 },
    ],
  },
  {
    id: '2',
    number: '12951',
    name: 'KUNDANAGAR EXPRESSSS',
    source: 'BGM',
    destination: 'UBL',
    departureTime: '16:35',
    arrivalTime: '08:35',
    duration: '16h 00m',
    daysOfOperation: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    classes: [
      { code: '1A', name: 'First AC', fare: 4200, availableSeats: 12, totalSeats: 24 },
      { code: '2A', name: 'Second AC', fare: 2500, availableSeats: 38, totalSeats: 52 },
      { code: '3A', name: 'Third AC', fare: 1750, availableSeats: 58, totalSeats: 72 },
    ],
  },
  {
    id: '3',
    number: '12259',
    name: 'HUBBBLI EXPRESS',
    source: 'UBL',
    destination: 'BGK',
    departureTime: '20:05',
    arrivalTime: '11:50',
    duration: '15h 45m',
    daysOfOperation: ['Mon', 'Wed', 'Fri'],
    classes: [
      { code: '1A', name: 'First AC', fare: 4800, availableSeats: 6, totalSeats: 18 },
      { code: '2A', name: 'Second AC', fare: 3000, availableSeats: 24, totalSeats: 46 },
      { code: '3A', name: 'Third AC', fare: 2100, availableSeats: 45, totalSeats: 64 },
      { code: 'SL', name: 'Sleeper', fare: 850, availableSeats: 120, totalSeats: 180 },
    ],
  },
  {
    id: '4',
    number: '12621',
    name: 'BIJAPUR EXPRESSS',
    source: 'BGK',
    destination: 'BJP',
    departureTime: '22:30',
    arrivalTime: '07:10',
    duration: '32h 40m',
    daysOfOperation: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    classes: [
      { code: '1A', name: 'First AC', fare: 5200, availableSeats: 14, totalSeats: 24 },
      { code: '2A', name: 'Second AC', fare: 3200, availableSeats: 36, totalSeats: 52 },
      { code: '3A', name: 'Third AC', fare: 2250, availableSeats: 52, totalSeats: 72 },
      { code: 'SL', name: 'Sleeper', fare: 950, availableSeats: 180, totalSeats: 240 },
    ],
  },
];

// Generate random seat number
export const generateSeatNumber = (classCode: string): string => {
  const coach = String.fromCharCode(65 + Math.floor(Math.random() * 8)); // A-H
  const seat = Math.floor(Math.random() * 72) + 1;
  return `${classCode}${coach}-${seat}`;
};

// Generate random PNR
export const generatePNR = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let pnr = '';
  for (let i = 0; i < 10; i++) {
    pnr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pnr;
};

// Generate random booking ID
export const generateBookingId = (): string => {
  return `BK${Date.now()}${Math.floor(Math.random() * 1000)}`;
};

// Get station name by code
export const getStationName = (code: string): string => {
  const station = stations.find(s => s.code === code);
  return station ? station.name : code;
};

// Search trains by source and destination
export const searchTrains = (source: string, destination: string): Train[] => {
  return trains.filter(
    train =>
      train.source.toLowerCase() === source.toLowerCase() ||
      train.destination.toLowerCase() === destination.toLowerCase() ||
      getStationName(train.source).toLowerCase().includes(source.toLowerCase()) ||
      getStationName(train.destination).toLowerCase().includes(destination.toLowerCase())
  );
};

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
};
