import { RequestHandler } from 'express';
import { createEvent, fetchEvents } from '@/services/events';
import axios from 'axios';

export const processPostEvents: RequestHandler = async (req, res) => {
  try {
    const { name, date, address, description } = req.body;

    const geocodeResponse = await axios.get(
      'https://maps.googleapis.com/maps/api/geocode/json',
      {
        params: {
          address,
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
      },
    );

    if (geocodeResponse.data.status !== 'OK') {
      return res.status(400).json({
        success: false,
        message: 'Invalid address or unable to geocode.',
        details: geocodeResponse.data.status,
      });
    }

    const { location } = geocodeResponse.data.results[0].geometry;
    const { lat, lng } = location;

    const newEvent = await createEvent({
      name,
      date,
      address,
      description,
      coordinates: {
        type: 'Point',
        coordinates: [lng, lat],
      },
    });

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
    const { date, address, lat, lng, radius } = req.query;
    const events = await fetchEvents({
      date: date as string,
      address: address as string,
      lat: parseFloat(lat as string),
      lng: parseFloat(lng as string),
      radius: parseFloat(radius as string),
    });
    return res.status(200).json({ success: true, data: events });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching events',
      error: (error as Error).message,
    });
  }
};
