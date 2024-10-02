import Event, { EventType, EventData, EventQuery } from '@/models/Event';
import { FilterQuery } from 'mongoose';

export const createEvent = async (eventData: EventData) => {
  try {
    const event = new Event(eventData);
    await event.save();
    return event;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const fetchEvents = async (query: EventQuery) => {
  try {
    const filters: FilterQuery<EventType> = {};
    if (query.date) {
      filters.date = new Date(query.date);
    }
    if (query.address) {
      filters.address = { $regex: query.address, $options: 'i' };
    }
    if (query.lat && query.lng && query.radius) {
      const radiusInMeters = query.radius * 1000;
      filters.coordinates = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [query.lng, query.lat],
          },
          $maxDistance: radiusInMeters,
        },
      };
    }
    const events = await Event.find(filters);
    return events;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
