// Seat Availability Page - Shows seat availability and allows selection

import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Train, TrainClass, getStationName, formatCurrency } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Train as TrainIcon, 
  Calendar, 
  MapPin, 
  Users, 
  ArrowRight,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBooking } from '@/context/BookingContext';

interface LocationState {
  train: Train;
  journeyDate: string;
  selectedClass?: string;
}

const SeatAvailabilityPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setCurrentBooking } = useBooking();

  const state = location.state as LocationState;

  // Redirect if no state
  if (!state?.train || !state?.journeyDate) {
    return <Navigate to="/search" replace />;
  }

  const { train, journeyDate, selectedClass: initialClass } = state;
  const [selectedClass, setSelectedClass] = useState<string>(initialClass || train.classes[0].code);

  const handleSelectClass = (classCode: string) => {
    setSelectedClass(classCode);
  };

  const handleProceed = () => {
    const selected = train.classes.find(c => c.code === selectedClass);
    if (!selected) return;

    setCurrentBooking({
      trainId: train.id,
      trainNumber: train.number,
      trainName: train.name,
      source: train.source,
      destination: train.destination,
      journeyDate,
      classCode: selected.code,
      className: selected.name,
    });

    navigate('/booking', {
      state: {
        train,
        journeyDate,
        selectedClass: selected,
      },
    });
  };

  const getAvailabilityStatus = (available: number, total: number) => {
    const ratio = available / total;
    if (ratio > 0.5) return { label: 'Available', color: 'bg-success', icon: CheckCircle };
    if (ratio > 0.2) return { label: 'Filling Fast', color: 'bg-warning', icon: Clock };
    if (ratio > 0) return { label: 'Few Seats', color: 'bg-destructive', icon: XCircle };
    return { label: 'Not Available', color: 'bg-muted', icon: XCircle };
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Page Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Seat Availability</h1>
          <p className="text-muted-foreground">
            Select your preferred class to proceed with booking
          </p>
        </div>

        {/* Train Info Card */}
        <Card className="mb-6 shadow-lg animate-fade-in">
          <CardHeader className="bg-primary text-primary-foreground">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-secondary rounded-lg p-2">
                  <TrainIcon className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-xl">{train.name}</CardTitle>
                  <p className="text-primary-foreground/80">#{train.number}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(journeyDate).toLocaleDateString('en-IN', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {/* Route Info */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{train.departureTime}</p>
                <p className="font-medium text-primary">{train.source}</p>
                <p className="text-sm text-muted-foreground">{getStationName(train.source)}</p>
              </div>
              <div className="flex-1 flex flex-col items-center px-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{train.duration}</span>
                </div>
                <div className="w-full flex items-center gap-1">
                  <div className="flex-1 h-0.5 bg-border" />
                  <ArrowRight className="h-5 w-5 text-secondary" />
                  <div className="flex-1 h-0.5 bg-border" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{train.arrivalTime}</p>
                <p className="font-medium text-primary">{train.destination}</p>
                <p className="text-sm text-muted-foreground">{getStationName(train.destination)}</p>
              </div>
            </div>

            {/* Days of Operation */}
            <div className="flex flex-wrap gap-1 justify-center mb-4">
              {train.daysOfOperation.map((day) => (
                <Badge key={day} variant="secondary" className="text-xs">
                  {day}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Seat Availability Cards */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Select Travel Class
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {train.classes.map((cls, index) => {
              const status = getAvailabilityStatus(cls.availableSeats, cls.totalSeats);
              const StatusIcon = status.icon;
              const isSelected = selectedClass === cls.code;
              const isAvailable = cls.availableSeats > 0;

              return (
                <Card
                  key={cls.code}
                  className={cn(
                    "cursor-pointer transition-all duration-300 animate-fade-in",
                    isSelected 
                      ? "ring-2 ring-primary shadow-lg" 
                      : "hover:shadow-md",
                    !isAvailable && "opacity-60 cursor-not-allowed"
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => isAvailable && handleSelectClass(cls.code)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg">{cls.code}</span>
                          {isSelected && (
                            <CheckCircle className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{cls.name}</p>
                      </div>
                      <Badge className={cn(status.color, "text-white")}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {status.label}
                      </Badge>
                    </div>

                    {/* Seat Progress */}
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Seats Available</span>
                        <span className="font-medium">
                          {cls.availableSeats} / {cls.totalSeats}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full transition-all duration-500",
                            cls.availableSeats > cls.totalSeats * 0.5 
                              ? "bg-success" 
                              : cls.availableSeats > cls.totalSeats * 0.2 
                                ? "bg-warning" 
                                : "bg-destructive"
                          )}
                          style={{ width: `${(cls.availableSeats / cls.totalSeats) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Fare */}
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <span className="text-sm text-muted-foreground">Fare per person</span>
                      <span className="text-xl font-bold text-primary">
                        {formatCurrency(cls.fare)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <Card className="mb-8 animate-fade-in">
          <CardContent className="py-4">
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-success" />
                <span className="text-sm text-muted-foreground">Available ({'>'}50%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-warning" />
                <span className="text-sm text-muted-foreground">Filling Fast (20-50%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-destructive" />
                <span className="text-sm text-muted-foreground">Few Seats ({'<'}20%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate(-1)}
          >
            Back to Search
          </Button>
          <Button
            size="lg"
            onClick={handleProceed}
            disabled={!train.classes.find(c => c.code === selectedClass)?.availableSeats}
            className="btn-railway bg-secondary hover:bg-secondary/90 text-secondary-foreground px-12"
          >
            Select & Continue
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SeatAvailabilityPage;
