'use client';

import { Card, CardContent } from '@/components/ui/card';

import Map from './_components/Map';
import Sidebar from './_components/Sidebar';
import Filter from './_components/Filter';

export default function Home() {
  return (
    <div className="home-page flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="flex w-full max-w-6xl flex-row md:flex-col">
        <Filter />
        <CardContent className="flex-1 p-0 md:w-1/3 md:flex-none">
          <Sidebar />
        </CardContent>
        <CardContent className="mt-4 flex-1 p-0 md:mt-0 md:w-2/3">
          <Map />

        </CardContent>
      </Card>
    </div>
  );
}
