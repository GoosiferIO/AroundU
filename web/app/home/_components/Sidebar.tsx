'use client';

import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

import CreateEventDialog from '@/components/CreateEventDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { useHomeContext } from '@/context/HomeContext';

export default function Sidebar() {
  const { radius, setRadius, events, loading, error } = useHomeContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Card className="flex h-full flex-col border-r p-4">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-lg font-bold">Events</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default">
              <PlusIcon className="mr-2 h-4 w-4" />
              Create Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <CreateEventDialog onClose={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="mb-4">
          <CardTitle className="mb-2 text-sm font-semibold">Radius</CardTitle>
          <Slider
            value={[radius]}
            onValueChange={(value) => setRadius(value[0])}
            max={100}
            step={1}
            className="w-full"
          />
          <p className="mt-2 text-center text-sm font-medium">{radius} km</p>
        </div>
        <div className="results mt-4 space-y-4 overflow-y-auto">
          {loading && <p>Loading events...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          {!loading && events.length === 0 && (
            <p>No events found within {radius} km.</p>
          )}
          {events.map((event) => (
            <Card key={event._id} className="result-item">
              <CardContent>
                <h3 className="font-semibold">{event.name}</h3>
                <p>{new Date(event.date).toLocaleDateString()}</p>
                <p>{event.address}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
