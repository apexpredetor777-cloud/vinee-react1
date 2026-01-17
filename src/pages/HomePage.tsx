// Home Page - Main landing page with hero section and CTAs

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Train, 
  Search, 
  Ticket, 
  Clock, 
  Shield, 
  CreditCard,
  ArrowRight,
  MapPin,
  Users,
  Star
} from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Search,
      title: 'Easy Search',
      description: 'Find trains between any two stations with real-time availability.',
    },
    {
      icon: Ticket,
      title: 'Quick Booking',
      description: 'Book your tickets in just a few clicks with our streamlined process.',
    },
    {
      icon: Clock,
      title: '24/7 Service',
      description: 'Book tickets anytime, anywhere with our always-available platform.',
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Your transactions are protected with industry-standard security.',
    },
    {
      icon: CreditCard,
      title: 'Multiple Payment Options',
      description: 'Pay via UPI, credit card, debit card, or net banking.',
    },
    {
      icon: Users,
      title: 'Group Bookings',
      description: 'Easily book tickets for multiple passengers in one go.',
    },
  ];

  const stats = [
    { value: '500+', label: 'Trains Daily' },
    { value: '7000+', label: 'Stations' },
    { value: '10M+', label: 'Happy Travelers' },
    { value: '99.9%', label: 'Uptime' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-railway-gradient py-20 lg:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 border-4 border-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-60 h-60 border-4 border-white rounded-full" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-4 border-white rounded-full" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Star className="h-4 w-4 text-secondary fill-secondary" />
              <span className="text-sm text-white/90">India's Most Trusted Railway Booking Platform</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
              Railway Ticket
              <span className="block text-secondary">Reservation System</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-white/80 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Book your train tickets seamlessly across India. 
              Search trains, check availability, and secure your seats in minutes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Link to="/book">
                <Button 
                  size="lg" 
                  className="btn-railway bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-6 glow-gold"
                >
                  <Ticket className="h-5 w-5 mr-2" />
                  Book Ticket
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link to="/search">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="btn-railway border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6"
                >
                  <Search className="h-5 w-5 mr-2" />
                  Check Availability
                </Button>
              </Link>
            </div>
          </div>

          {/* Train Illustration */}
          <div className="mt-16 flex justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 flex items-center gap-6">
              <div className="text-center">
                <MapPin className="h-6 w-6 text-secondary mx-auto mb-2" />
                <p className="text-white font-medium">New Delhi</p>
                <p className="text-white/60 text-sm">NDLS</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-20 h-1 bg-white/30 rounded" />
                <Train className="h-10 w-10 text-secondary animate-pulse" />
                <div className="w-20 h-1 bg-white/30 rounded" />
              </div>
              <div className="text-center">
                <MapPin className="h-6 w-6 text-secondary mx-auto mb-2" />
                <p className="text-white font-medium">Mumbai</p>
                <p className="text-white/60 text-sm">BCT</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <p className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Us?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience seamless train ticket booking with our user-friendly platform 
              designed for your convenience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="card-railway border-border animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="bg-primary/10 rounded-lg p-3 w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Join millions of travelers who trust us for their railway booking needs. 
            Book your next trip today!
          </p>
          <Link to="/register">
            <Button 
              size="lg" 
              className="btn-railway bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-6"
            >
              Get Started Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
