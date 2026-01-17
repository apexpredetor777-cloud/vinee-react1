// Payment Page - Simulated payment processing

import React, { useState } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Train, TrainClass, Passenger, formatCurrency, formatDate } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useBooking } from '@/context/BookingContext';
import { useToast } from '@/hooks/use-toast';
import LoadingSpinner from '@/components/LoadingSpinner';
import { 
  CreditCard, 
  Smartphone, 
  Building, 
  Lock, 
  CheckCircle,
  ArrowRight,
  Shield,
  Train as TrainIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface LocationState {
  train: Train;
  journeyDate: string;
  selectedClass: TrainClass;
  passengers: Passenger[];
  totalFare: number;
}

type PaymentMethod = 'upi' | 'debit' | 'credit';

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addBooking, setCurrentBooking } = useBooking();
  const { toast } = useToast();

  const state = location.state as LocationState;

  // Redirect if no state
  if (!state?.train || !state?.passengers || !state?.totalFare) {
    return <Navigate to="/search" replace />;
  }

  const { train, journeyDate, selectedClass, passengers, totalFare } = state;

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const paymentMethods = [
    { id: 'upi', label: 'UPI', icon: Smartphone, description: 'Pay via Google Pay, PhonePe, etc.' },
    { id: 'debit', label: 'Debit Card', icon: CreditCard, description: 'Visa, Mastercard, Rupay' },
    { id: 'credit', label: 'Credit Card', icon: Building, description: 'All major credit cards accepted' },
  ];

  const handlePayment = async () => {
    // Basic validation
    if (paymentMethod === 'upi' && !upiId) {
      toast({
        title: "UPI ID Required",
        description: "Please enter your UPI ID to proceed.",
        variant: "destructive",
      });
      return;
    }

    if ((paymentMethod === 'debit' || paymentMethod === 'credit') && (!cardNumber || !cardExpiry || !cardCvv)) {
      toast({
        title: "Card Details Required",
        description: "Please enter all card details to proceed.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Create booking
    const booking = addBooking({
      trainId: train.id,
      trainNumber: train.number,
      trainName: train.name,
      source: train.source,
      destination: train.destination,
      journeyDate,
      classCode: selectedClass.code,
      className: selectedClass.name,
      passengers,
      totalFare,
    });

    setIsProcessing(false);

    toast({
      title: "Payment Successful! 🎉",
      description: "Your ticket has been booked successfully.",
    });

    // Navigate to confirmation page
    navigate('/confirmation', {
      state: { booking },
      replace: true,
    });
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <Card className="w-full max-w-md p-8 text-center shadow-xl">
          <div className="animate-pulse">
            <div className="bg-primary/20 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Lock className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Processing Payment</h2>
            <p className="text-muted-foreground mb-6">
              Please wait while we securely process your payment...
            </p>
            <LoadingSpinner size="lg" className="mb-4" />
            <p className="text-sm text-muted-foreground">
              Do not close this window or press back button
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Page Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Secure Payment</h1>
          <p className="text-muted-foreground">
            Complete your booking with a secure payment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg animate-fade-in">
              <CardHeader className="bg-primary/5 border-b border-border">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Select Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
                  className="space-y-4"
                >
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={cn(
                        "flex items-center space-x-4 p-4 border rounded-lg cursor-pointer transition-all duration-200",
                        paymentMethod === method.id
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "border-border hover:border-primary/50"
                      )}
                      onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                    >
                      <RadioGroupItem value={method.id} id={method.id} />
                      <div className="bg-muted rounded-lg p-2">
                        <method.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor={method.id} className="font-medium cursor-pointer">
                          {method.label}
                        </Label>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>

                {/* Payment Form */}
                <div className="mt-6 pt-6 border-t border-border">
                  {paymentMethod === 'upi' && (
                    <div className="space-y-4 animate-fade-in">
                      <Label htmlFor="upi">UPI ID</Label>
                      <div className="relative">
                        <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="upi"
                          type="text"
                          placeholder="yourname@upi"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Enter your UPI ID linked to your bank account
                      </p>
                    </div>
                  )}

                  {(paymentMethod === 'debit' || paymentMethod === 'credit') && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="cardNumber"
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                            className="pl-10"
                            maxLength={19}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            type="text"
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                            maxLength={5}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            type="password"
                            placeholder="•••"
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                            maxLength={3}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Your card details are encrypted and secure
                      </p>
                    </div>
                  )}
                </div>

                {/* Security Badge */}
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4 text-success" />
                  <span>Secured by 256-bit SSL encryption</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg sticky top-24 animate-fade-in">
              <CardHeader className="bg-primary text-primary-foreground py-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrainIcon className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">{train.name}</p>
                    <p className="text-sm text-muted-foreground">#{train.number}</p>
                  </div>

                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date</span>
                      <span>{formatDate(journeyDate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Route</span>
                      <span>{train.source} → {train.destination}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Class</span>
                      <span>{selectedClass.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Passengers</span>
                      <span>{passengers.length}</span>
                    </div>
                  </div>

                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Amount</span>
                      <span className="text-primary">{formatCurrency(totalFare)}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full btn-railway bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    size="lg"
                    onClick={handlePayment}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Pay {formatCurrency(totalFare)}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By proceeding, you agree to our terms and conditions
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
