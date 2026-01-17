// Train Search Page - Search for trains between stations

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { stations, trains, Train, getStationName } from '@/data/mockData';
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
import TrainCard from '@/components/TrainCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Search, MapPin, Calendar, Users, Train as TrainIcon, ArrowRight, ArrowLeftRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SearchPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [journeyDate, setJourneyDate] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Train[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const classOptions = [
    { value: 'all', label: 'All Classes' },
    { value: '1A', label: 'First AC (1A)' },
    { value: '2A', label: 'Second AC (2A)' },
    { value: '3A', label: 'Third AC (3A)' },
    { value: 'SL', label: 'Sleeper (SL)' },
    { value: 'CC', label: 'Chair Car (CC)' },
  ];

  // Get today's date for min date validation
  const today = new Date().toISOString().split('T')[0];

  const handleSwapStations = () => {
    const temp = source;
    setSource(destination);
    setDestination(temp);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!source || !destination || !journeyDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (source === destination) {
      toast({
        title: "Invalid Selection",
        description: "Source and destination cannot be the same.",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    setHasSearched(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Filter trains based on search criteria
    let results = trains.filter(train => {
      const sourceMatch = 
        train.source === source || 
        getStationName(train.source).toLowerCase().includes(source.toLowerCase());
      const destMatch = 
        train.destination === destination || 
        getStationName(train.destination).toLowerCase().includes(destination.toLowerCase());
      
      return sourceMatch || destMatch;
    });

    // Filter by class if specific class selected
    if (selectedClass !== 'all') {
      results = results.filter(train => 
        train.classes.some(cls => cls.code === selectedClass)
      );
    }

    setSearchResults(results);
    setIsSearching(false);

    if (results.length === 0) {
      toast({
        title: "No Trains Found",
        description: "Try different stations or dates.",
      });
    } else {
      toast({
        title: `${results.length} Train(s) Found`,
        description: "Select a train to proceed with booking.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">Search Trains</h1>
          <p className="text-muted-foreground">
            Find and book trains between stations across India
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8 shadow-lg animate-fade-in">
          <CardHeader className="bg-primary/5 border-b border-border">
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Search for Trains
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSearch}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Source Station */}
                <div className="space-y-2">
                  <Label htmlFor="source" className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    From
                  </Label>
                  <Select value={source} onValueChange={setSource}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select source station" />
                    </SelectTrigger>
                    <SelectContent>
                      {stations.map((station) => (
                        <SelectItem key={station.code} value={station.code}>
                          {station.name} ({station.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Swap Button - Hidden on small screens, shown inline on larger */}
                <div className="hidden lg:flex items-end justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleSwapStations}
                    className="mb-0.5"
                  >
                    <ArrowLeftRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Destination Station */}
                <div className="space-y-2">
                  <Label htmlFor="destination" className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    To
                  </Label>
                  <Select value={destination} onValueChange={setDestination}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent>
                      {stations.map((station) => (
                        <SelectItem key={station.code} value={station.code}>
                          {station.name} ({station.code})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Journey Date */}
                <div className="space-y-2">
                  <Label htmlFor="journeyDate" className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    Journey Date
                  </Label>
                  <Input
                    id="journeyDate"
                    type="date"
                    value={journeyDate}
                    onChange={(e) => setJourneyDate(e.target.value)}
                    min={today}
                    className="w-full"
                  />
                </div>

                {/* Class Selection */}
                <div className="space-y-2">
                  <Label htmlFor="class" className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    Class
                  </Label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Mobile Swap Button */}
              <div className="flex justify-center mt-4 lg:hidden">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleSwapStations}
                >
                  <ArrowLeftRight className="h-4 w-4 mr-2" />
                  Swap Stations
                </Button>
              </div>

              {/* Search Button */}
              <div className="mt-6 flex justify-center">
                <Button 
                  type="submit" 
                  size="lg"
                  className="btn-railway bg-secondary hover:bg-secondary/90 text-secondary-foreground px-12"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="h-5 w-5 mr-2" />
                      Search Trains
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Search Results */}
        {isSearching ? (
          <div className="flex flex-col items-center justify-center py-20">
            <LoadingSpinner size="lg" text="Searching for trains..." />
          </div>
        ) : hasSearched ? (
          <div className="space-y-4 animate-fade-in">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <TrainIcon className="h-5 w-5 text-primary" />
                {searchResults.length > 0 
                  ? `${searchResults.length} Train(s) Available`
                  : 'No Trains Found'
                }
              </h2>
              {searchResults.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  {getStationName(source)} → {getStationName(destination)}
                </p>
              )}
            </div>

            {/* Train Cards */}
            {searchResults.length > 0 ? (
              <div className="space-y-4">
                {searchResults.map((train, index) => (
                  <div 
                    key={train.id} 
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <TrainCard 
                      train={train} 
                      journeyDate={journeyDate}
                      selectedClass={selectedClass !== 'all' ? selectedClass : undefined}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <TrainIcon className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No Trains Found</h3>
                <p className="text-muted-foreground mb-4">
                  We couldn't find any trains for your search criteria. 
                  Try changing the stations or date.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSource('');
                    setDestination('');
                    setJourneyDate('');
                    setHasSearched(false);
                  }}
                >
                  Clear Search
                </Button>
              </Card>
            )}
          </div>
        ) : (
          // Initial State - Show popular routes
          <Card className="p-8 text-center animate-fade-in">
            <TrainIcon className="h-20 w-20 text-primary/20 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-foreground mb-2">
              Start Your Journey
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Search for trains between any two stations. Select your preferred class and date to find available trains.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSource('NDLS');
                  setDestination('BCT');
                }}
              >
                Delhi → Mumbai
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSource('NDLS');
                  setDestination('MAS');
                }}
              >
                Delhi → Chennai
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSource('NDLS');
                  setDestination('HWH');
                }}
              >
                Delhi → Kolkata
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
