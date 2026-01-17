// Train Card Component - Displays train info in search results

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Train, getStationName, formatCurrency } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, ArrowRight, Train as TrainIcon, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrainCardProps {
  train: Train;
  journeyDate: string;
  selectedClass?: string;
}

const TrainCard: React.FC<TrainCardProps> = ({ train, journeyDate, selectedClass }) => {
  const navigate = useNavigate();

  const handleBookNow = (classCode: string) => {
    navigate('/seat-availability', { 
      state: { 
        train, 
        journeyDate,
        selectedClass: classCode 
      } 
    });
  };

  const getAvailabilityColor = (available: number, total: number) => {
    const ratio = available / total;
    if (ratio > 0.5) return 'text-success';
    if (ratio > 0.2) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <Card className="card-railway overflow-hidden">
      <CardContent className="p-0">
        {/* Header */}
        <div className="bg-primary/5 p-4 border-b border-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="bg-primary rounded-lg p-2">
                <TrainIcon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{train.name}</h3>
                <p className="text-sm text-muted-foreground">#{train.number}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {train.daysOfOperation.map((day) => (
                <Badge key={day} variant="secondary" className="text-xs">
                  {day}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Journey Info */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            {/* Source */}
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{train.departureTime}</p>
              <p className="text-sm font-medium text-primary">{train.source}</p>
              <p className="text-xs text-muted-foreground">{getStationName(train.source)}</p>
            </div>

            {/* Duration */}
            <div className="flex-1 flex flex-col items-center px-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{train.duration}</span>
              </div>
              <div className="w-full flex items-center gap-1 my-2">
                <div className="flex-1 h-0.5 bg-border" />
                <ArrowRight className="h-4 w-4 text-secondary" />
                <div className="flex-1 h-0.5 bg-border" />
              </div>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </div>

            {/* Destination */}
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{train.arrivalTime}</p>
              <p className="text-sm font-medium text-primary">{train.destination}</p>
              <p className="text-xs text-muted-foreground">{getStationName(train.destination)}</p>
            </div>
          </div>

          {/* Classes */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
            {train.classes.map((cls) => (
              <div
                key={cls.code}
                className={cn(
                  "border rounded-lg p-3 transition-all duration-200 hover:shadow-md cursor-pointer",
                  selectedClass === cls.code ? "border-primary bg-primary/5" : "border-border"
                )}
                onClick={() => handleBookNow(cls.code)}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium text-sm">{cls.code}</span>
                  <span className="text-xs text-muted-foreground">{cls.name}</span>
                </div>
                <p className="text-lg font-bold text-primary">{formatCurrency(cls.fare)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Users className="h-3 w-3" />
                  <span className={cn("text-xs font-medium", getAvailabilityColor(cls.availableSeats, cls.totalSeats))}>
                    {cls.availableSeats} seats
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Book Button */}
          <div className="mt-4 flex justify-end">
            <Button 
              onClick={() => handleBookNow(train.classes[0].code)}
              className="btn-railway bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              Book Now
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainCard;
