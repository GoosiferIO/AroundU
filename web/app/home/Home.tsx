'use client';

import Map from '@/components/Map';

export default function Home() {
  return (
    <div className="home-page flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <section className="map-section w-full max-w-4xl p-4">
        <h1 className="mb-6 text-center text-4xl font-bold">
          Your Location...
        </h1>
        <Map />
      </section>
    </div>
  );
}
