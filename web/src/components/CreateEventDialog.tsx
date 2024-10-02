'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import useCreateEvent from '@/hooks/useCreateEvent';

type CreateEventDialogProps = {
  onClose: () => void;
};

export default function CreateEventDialog({ onClose }: CreateEventDialogProps) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const { createEvent, loading, error } = useCreateEvent();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEvent({
        name,
        date,
        address,
        description,
      });
      toast.success('Event created successfully');
      onClose();
    } catch {
      toast.error(`Failed to create event: ${error}`);
    }
  };

  return (
    <>
      <DialogTitle>Create Event</DialogTitle>
      <DialogDescription className="mt-2 text-sm text-gray-600">
        Fill in the details below to create a new event.
      </DialogDescription>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <Label htmlFor="event-name">Event Name</Label>
          <Input
            id="event-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter event name"
          />
        </div>
        <div>
          <Label htmlFor="event-date">Date</Label>
          <Input
            id="event-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="event-address">Address</Label>
          <Input
            id="event-address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder="Enter event address"
          />
        </div>
        <div>
          <Label htmlFor="event-description">Description</Label>
          <Textarea
            id="event-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter event description (optional)"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" variant="default" disabled={loading}>
            {loading ? 'Creating...' : 'Create'}
          </Button>
        </div>
      </form>
    </>
  );
}
