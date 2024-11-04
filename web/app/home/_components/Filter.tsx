'use client';

import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

import CreateEventDialog from '@/components/CreateEventDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { useHomeContext } from '@/context/HomeContext';

type Category = 'All' | 'Concert' | 'Happy Hour' | 'Karaoke' | 'Yard Sale' | 'Other';

export default function Filter() {
  const {
    radius,
    setRadius,
    events,
    loading,
    error,
    setCategoryFilter,
    categoryFilter,
  } = useHomeContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setCategoryFilter(event.target.value as Category);
  };

  const filteredEvents = categoryFilter
    ? events.filter((event) => event.category === categoryFilter)
    : events;

    const categories: Category[] = ['All', 'Concert', 'Happy Hour', 'Karaoke', 'Yard Sale', 'Other'];

    const generateLink = (category: string) => {
        return `<Link href="/concert" className="ml-4 text-black-500 hover:text-blue-700 hover:border-blue-700 hover:border-b-2">/${category}</Link>`;
    }

    return (
        // <div className="flex w-full max-w-6xl items-center h-16 px-4 border-b-2">
        //     {categories.map((category) => (
        //         <Link href={`/${category}`} className="ml-4 text-black-500 border-transparent border-b-2 hover:text-blue-700 hover:border-blue-700 hover:border-b-2">{category}</Link>
        //     ))}
        // </div>

        <Card className="flex flex-col border-none shadow-none rounded-none">
            <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold">Events</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
            <div className="mb-4">
                <CardTitle className="mb-2 text-sm font-semibold">Radius</CardTitle>
                <Slider
                value={[radius]}
                onValueChange={(value) => setRadius(value[0])}
                max={100}
                step={1}
                className="w-full"
                />
                <p className="mt-2 text-center text-sm font-medium">{radius} km</p>
            </div>
            <div>
                <select
                value={categoryFilter || ''}
                onChange={handleCategoryChange}
                className="w-full rounded border p-2"
                >
                <option value="">All Categories</option>
                <option value="Concert">Concert</option>
                <option value="Happy Hour">Happy Hour</option>
                <option value="Karaoke">Karaoke</option>
                <option value="Yard Sale">Yard Sale</option>
                <option value="Other">Other</option>
                </select>
            </div>
            </CardContent>
      </Card>
    );
}

