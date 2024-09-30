import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { useEffect, useMemo, useState } from 'react';

const mapStyles = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'transit',
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
];

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

export default function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const [userLocation, setUserLocation] = useState({
    lat: 37.7749,
    lng: -122.4194,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (err) => {
          setError(`Error getting location: ${err.message}`);
        },
      );
    }
  }, []);

  const center = useMemo(() => userLocation, [userLocation]);

  if (!isLoaded) {
    return (
      <div className="flex h-full items-center justify-center">Loading...</div>
    );
  }

  return (
    <div className="h-[400px] w-full">
      {error && <p className="text-red-500">{error}</p>}
      <GoogleMap
        zoom={12}
        center={center}
        mapContainerStyle={mapContainerStyle}
        options={{
          styles: mapStyles,
          disableDefaultUI: true,
        }}
      />
    </div>
  );
}
