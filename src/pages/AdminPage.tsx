// Admin Panel - View all bookings and trains

import React from 'react';
import { useBooking } from '@/context/BookingContext';
import { trains, formatCurrency, formatDate, getStationName } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Train, ClipboardList, Users, CreditCard } from 'lucide-react';

const AdminPage: React.FC = () => {
  const { bookings } = useBooking();
  const totalRevenue = bookings.filter(b => b.status === 'confirmed').reduce((sum, b) => sum + b.totalFare, 0);
  const totalPassengers = bookings.filter(b => b.status === 'confirmed').reduce((sum, b) => sum + b.passengers.length, 0);

  const stats = [
    { label: 'Total Bookings', value: bookings.length, icon: ClipboardList, color: 'text-primary' },
    { label: 'Active Trains', value: trains.length, icon: Train, color: 'text-secondary' },
    { label: 'Total Passengers', value: totalPassengers, icon: Users, color: 'text-success' },
    { label: 'Total Revenue', value: formatCurrency(totalRevenue), icon: CreditCard, color: 'text-primary' },
  ];

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8 animate-fade-in">
          <div className="bg-primary rounded-lg p-2"><Shield className="h-6 w-6 text-primary-foreground" /></div>
          <div><h1 className="text-3xl font-bold">Admin Panel</h1><p className="text-muted-foreground">Manage bookings and view statistics</p></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <Card key={i} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="bg-muted rounded-lg p-3"><stat.icon className={`h-6 w-6 ${stat.color}`} /></div>
                <div><p className="text-2xl font-bold">{stat.value}</p><p className="text-sm text-muted-foreground">{stat.label}</p></div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="bookings" className="animate-fade-in">
          <TabsList><TabsTrigger value="bookings">All Bookings</TabsTrigger><TabsTrigger value="trains">Train List</TabsTrigger></TabsList>
          
          <TabsContent value="bookings">
            <Card>
              <CardHeader><CardTitle>All Bookings ({bookings.length})</CardTitle></CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader><TableRow><TableHead>PNR</TableHead><TableHead>Train</TableHead><TableHead>Route</TableHead><TableHead>Date</TableHead><TableHead>Passengers</TableHead><TableHead>Fare</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {bookings.map(b => (
                        <TableRow key={b.id}>
                          <TableCell className="font-mono font-medium">{b.pnr}</TableCell>
                          <TableCell>{b.trainName}<br/><span className="text-xs text-muted-foreground">#{b.trainNumber}</span></TableCell>
                          <TableCell>{b.source} → {b.destination}</TableCell>
                          <TableCell>{formatDate(b.journeyDate)}</TableCell>
                          <TableCell>{b.passengers.length}</TableCell>
                          <TableCell>{formatCurrency(b.totalFare)}</TableCell>
                          <TableCell><Badge className={b.status === 'confirmed' ? 'bg-success' : 'bg-destructive'}>{b.status}</Badge></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trains">
            <Card>
              <CardHeader><CardTitle>Train List ({trains.length})</CardTitle></CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader><TableRow><TableHead>Number</TableHead><TableHead>Name</TableHead><TableHead>Route</TableHead><TableHead>Duration</TableHead><TableHead>Classes</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {trains.map(t => (
                        <TableRow key={t.id}>
                          <TableCell className="font-mono">{t.number}</TableCell>
                          <TableCell className="font-medium">{t.name}</TableCell>
                          <TableCell>{getStationName(t.source)} → {getStationName(t.destination)}</TableCell>
                          <TableCell>{t.duration}</TableCell>
                          <TableCell><div className="flex gap-1">{t.classes.map(c => <Badge key={c.code} variant="outline">{c.code}</Badge>)}</div></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;
