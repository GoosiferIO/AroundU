'use client';

import { Card, CardContent } from '@/components/ui/card';
import Map from './_components/Map';
import Sidebar from './_components/Sidebar';

export default function Home() {
  return (
    <div className="relative home-page min-h-screen bg-gray-50 p-4">
      <Map />

      {/* Card content positioned above the map */}
      <div className="w-1/3 min-h-screen backdrop-blur-md shadow-md z-10 absolute right-5">
        <Sidebar />
      </div>
    </div>
  );
}
