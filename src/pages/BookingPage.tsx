// Booking Page - Passenger details and fare summary

import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Train, TrainClass, Passenger, getStationName, formatCurrency, formatDate } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useBooking } from '@/context/BookingContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Train as TrainIcon, 
  User, 
  UserPlus, 
  Trash2, 
  CreditCard, 
  ArrowRight,
  Calendar,
  MapPin,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface LocationState {
  train: Train;
  journeyDate: string;
  selectedClass: TrainClass;
}

interface PassengerForm {
  name: string;
  age: string;
  gender: '' | 'male' | 'female' | 'other';
  errors: { name?: string; age?: string; gender?: string };
}

const BookingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setCurrentBooking } = useBooking();
  const { toast } = useToast();

  const state = location.state as LocationState;

  // Redirect if no state
  if (!state?.train || !state?.journeyDate || !state?.selectedClass) {
    return <Navigate to="/search" replace />;
  }

  const { train, journeyDate, selectedClass } = state;

  const [passengers, setPassengers] = useState<PassengerForm[]>([
    { name: '', age: '', gender: '', errors: {} },
  ]);

  const addPassenger = () => {
    if (passengers.length >= 6) {
      toast({
        title: "Maximum Passengers",
        description: "You can book for up to 6 passengers at a time.",
        variant: "destructive",
      });
      return;
    }
    setPassengers([...passengers, { name: '', age: '', gender: '', errors: {} }]);
  };

  const removePassenger = (index: number) => {
    if (passengers.length === 1) {
      toast({
        title: "Cannot Remove",
        description: "At least one passenger is required.",
        variant: "destructive",
      });
      return;
    }
    setPassengers(passengers.filter((_, i) => i !== index));
  };

  const updatePassenger = (index: number, field: keyof PassengerForm, value: string) => {
    const updated = [...passengers];
    updated[index] = {
      ...updated[index],
      [field]: value,
      errors: { ...updated[index].errors, [field]: undefined },
    };
    setPassengers(updated);
  };

  const validatePassengers = (): boolean => {
    let isValid = true;
    const updated = passengers.map(passenger => {
      const errors: { name?: string; age?: string; gender?: string } = {};
      
      if (!passenger.name.trim()) {
        errors.name = 'Name is required';
        isValid = false;
      } else if (passenger.name.trim().length < 3) {
        errors.name = 'Name must be at least 3 characters';
        isValid = false;
      }

      const age = parseInt(passenger.age);
      if (!passenger.age) {
        errors.age = 'Age is required';
        isValid = false;
      } else if (isNaN(age) || age < 1 || age > 120) {
        errors.age = 'Enter valid age (1-120)';
        isValid = false;
      }

      if (!passenger.gender) {
        errors.gender = 'Gender is required';
        isValid = false;
      }

      return { ...passenger, errors };
    });

    setPassengers(updated);
    return isValid;
  };

  const handleProceedToPayment = () => {
    if (!validatePassengers()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all passenger details correctly.",
        variant: "destructive",
      });
      return;
    }

    const passengerData: Passenger[] = passengers.map(p => ({
      name: p.name.trim(),
      age: parseInt(p.age),
      gender: p.gender as 'male' | 'female' | 'other',
    }));

    const totalFare = selectedClass.fare * passengers.length;

    setCurrentBooking({
      trainId: train.id,
      trainNumber: train.number,
      trainName: train.name,
      source: train.source,
      destination: train.destination,
      journeyDate,
      classCode: selectedClass.code,
      className: selectedClass.name,
      passengers: passengerData,
      totalFare,
    });

    navigate('/payment', {
      state: {
        train,
        journeyDate,
        selectedClass,
        passengers: passengerData,
        totalFare,
      },
    });
  };

  const totalFare = selectedClass.fare * passengers.length;

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Book Your Ticket</h1>
          <p className="text-muted-foreground">
            Enter passenger details to proceed with booking
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Passenger Details */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="shadow-lg animate-fade-in">
              <CardHeader className="bg-primary/5 border-b border-border">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Passenger Details
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addPassenger}
                    disabled={passengers.length >= 6}
                  >
                    <UserPlus className="h-4 w-4 mr-1" />
                    Add Passenger
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {passengers.map((passenger, index) => (
                    <div
                      key={index}
                      className={cn(
                        "p-4 border rounded-lg animate-fade-in",
                        Object.keys(passenger.errors).length > 0
                          ? "border-destructive/50 bg-destructive/5"
                          : "border-border"
                      )}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-foreground">
                          Passenger {index + 1}
                        </h4>
                        {passengers.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removePassenger(index)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Name */}
                        <div className="space-y-2">
                          <Label>Full Name</Label>
                          <Input
                            placeholder="Enter full name"
                            value={passenger.name}
                            onChange={(e) => updatePassenger(index, 'name', e.target.value)}
                            className={passenger.errors.name ? 'border-destructive' : ''}
                          />
                          {passenger.errors.name && (
                            <p className="text-xs text-destructive">{passenger.errors.name}</p>
                          )}
                        </div>

                        {/* Age */}
                        <div className="space-y-2">
                          <Label>Age</Label>
                          <Input
                            type="number"
                            placeholder="Age"
                            value={passenger.age}
                            onChange={(e) => updatePassenger(index, 'age', e.target.value)}
                            className={passenger.errors.age ? 'border-destructive' : ''}
                            min="1"
                            max="120"
                          />
                          {passenger.errors.age && (
                            <p className="text-xs text-destructive">{passenger.errors.age}</p>
                          )}
                        </div>

                        {/* Gender */}
                        <div className="space-y-2">
                          <Label>Gender</Label>
                          <Select
                            value={passenger.gender}
                            onValueChange={(value) => updatePassenger(index, 'gender', value)}
                          >
                            <SelectTrigger className={passenger.errors.gender ? 'border-destructive' : ''}>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          {passenger.errors.gender && (
                            <p className="text-xs text-destructive">{passenger.errors.gender}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground mt-4 text-center">
                  Maximum 6 passengers per booking
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Fare Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Train Info */}
              <Card className="shadow-lg animate-fade-in">
                <CardHeader className="bg-primary text-primary-foreground py-4">
                  <div className="flex items-center gap-2">
                    <TrainIcon className="h-5 w-5" />
                    <CardTitle className="text-lg">{train.name}</CardTitle>
                  </div>
                  <p className="text-primary-foreground/80 text-sm">#{train.number}</p>
                </CardHeader>
                <CardContent className="pt-4">
                  {/* Route */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-center">
                      <p className="font-bold text-primary">{train.source}</p>
                      <p className="text-xs text-muted-foreground">{train.departureTime}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-secondary" />
                    <div className="text-center">
                      <p className="font-bold text-primary">{train.destination}</p>
                      <p className="text-xs text-muted-foreground">{train.arrivalTime}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm border-t border-border pt-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(journeyDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{train.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedClass.name} ({selectedClass.code})</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Fare Summary */}
              <Card className="shadow-lg animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Fare Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Base Fare</span>
                      <span>{formatCurrency(selectedClass.fare)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Passengers</span>
                      <span>× {passengers.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Reservation Charge</span>
                      <span>Included</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">GST</span>
                      <span>Included</span>
                    </div>
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total Fare</span>
                        <span className="text-primary">{formatCurrency(totalFare)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Proceed Button */}
                  <Button
                    className="w-full mt-6 btn-railway bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    size="lg"
                    onClick={handleProceedToPayment}
                  >
                    Proceed to Payment
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
