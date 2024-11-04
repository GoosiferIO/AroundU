import { RequestHandler } from 'express';
import { createEvent, fetchEvents } from '@/services/events';
import axios from 'axios';

export const processPostEvents: RequestHandler = async (req, res) => {
  try {
    const { name, date, address, description, category } = req.body;

    // Geocoding the address using Google Maps API
    const geocodeResponse = await axios.get(
      'https://maps.googleapis.com/maps/api/geocode/json',
      {
        params: {
          address,
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
      },
    );

    // Add this line to log the geocoding response for debugging
    // console.log(geocodeResponse.data);

    // Check if geocoding was successful
    if (geocodeResponse.data.status !== 'OK') {
      return res.status(400).json({
        success: false,
        message: 'Invalid address or unable to geocode.',
        details: geocodeResponse.data.status,
      });
    }

    // Extract latitude and longitude from geocoding response
    const { location } = geocodeResponse.data.results[0].geometry;
    const { lat, lng } = location;

    // Create the new event
    const newEvent = await createEvent({
      name,
      date,
      address,
      description,
      category,
      coordinates: {
        type: 'Point',
        coordinates: [lng, lat],
      },
    });

    // Return success response
    return res.status(201).json({ success: true, data: newEvent });
  } catch (error) {
    // Handle any errors during the process
    return res.status(500).json({
      success: false,
      message: 'Error creating event',
      error: (error as Error).message,
    });
  }
};

export const processGetEvents: RequestHandler = async (req, res) => {
  try {
    const { date, address, lat, lng, radius, category } = req.query;
    const events = await fetchEvents({
      date: date as string,
      address: address as string,
      lat: parseFloat(lat as string),
      lng: parseFloat(lng as string),
      radius: parseFloat(radius as string),
      category: (category as string) || undefined,
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
