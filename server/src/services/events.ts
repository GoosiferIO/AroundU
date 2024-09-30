/* eslint-disable no-console */
import Event, { EventType } from '@/models/Event';

type EventQuery = {
  date?: Date | string;
  location?: string;
};

export const createEvent = async (
  eventData: Omit<EventType, 'createdAt' | 'updatedAt'>,
) => {
  try {
    const event = new Event(eventData);
    await event.save();
    return event;
  } catch (error) {
    console.error('> Error creating event:', (error as Error).message);
    throw new Error('Unable to create event');
  }
};

export const fetchEvents = async (query: EventQuery) => {
  try {
    const filters: Partial<EventQuery> = {};

    if (query.date) {
      filters.date = new Date(query.date);
    }
    if (query.location) {
      filters.location = query.location;
    }

    const events = await Event.find(filters);
    return events;
  } catch (error) {
    console.error('> Error fetching events:', (error as Error).message);
    throw new Error('Unable to fetch events');
  }
};
