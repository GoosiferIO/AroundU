import { useEffect, useState } from 'react';

import { EventType } from '@/types/Event';

type UseFetchEventsReturn = {
  events: EventType[];
  loading: boolean;
  error: string | null;
};

export default function useFetchEvents(
  radius: number,
  userLocation: { lat: number; lng: number } | null,
): UseFetchEventsReturn {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userLocation) return;
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:3001/events?radius=${radius}&lat=${userLocation.lat}&lng=${userLocation.lng}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        if (!response.ok) {
          const resData = await response.json();
          throw new Error(resData.message || 'Failed to fetch events');
        }
        const { data } = await response.json();
        setEvents(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [radius, userLocation]);

  return { events, loading, error };
}
