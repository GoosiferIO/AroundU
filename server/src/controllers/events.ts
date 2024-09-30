import { RequestHandler } from 'express';
import { createEvent, fetchEvents } from '@/services/events';

export const processPostEvents: RequestHandler = async (req, res) => {
  try {
    const eventData = req.body;
    const newEvent = await createEvent(eventData);
    return res.status(201).json({ success: true, data: newEvent });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating event',
      error: (error as Error).message,
    });
  }
};

export const processGetEvents: RequestHandler = async (req, res) => {
  try {
    const { query } = req;
    const events = await fetchEvents(query);
    return res.status(200).json({ success: true, data: events });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching events',
      error: (error as Error).message,
    });
  }
};
