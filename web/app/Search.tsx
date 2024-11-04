import { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import CreateEventDialog from '@/components/CreateEventDialog';
import { useHomeContext } from '@/context/HomeContext';
import { Input } from '@/components/ui/input';
import { CalendarIcon, MapPinIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

import Map from './home/_components/Map';
import Sidebar from './home/_components/Sidebar';
import Search from './Search';
import Filter from './home/_components/Filter';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type Category = 'Concert' | 'Happy Hour' | 'Karaoke' | 'Yard Sale' | 'Other';

type Item = {
  id: string;
  name: string;
};

export default function LiveSearch() {
    const {
        radius,
        setRadius,
        events,
        loading,
        error,
        setCategoryFilter,
        categoryFilter,
        } = useHomeContext();
    
    const [searchQuery, setSearchQuery] = useState<string>('');

    const filteredEvents = events
    .filter((event) =>
      categoryFilter ? event.category === categoryFilter : true
    )
    .filter((event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleCategoryChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setCategoryFilter(event.target.value as Category);
    };


    return (
        <div className="container p-4">
        <Input
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
        />
            <div className="results mt-4 space-y-4 overflow-y-auto">
            {loading && <p>Loading events...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {!loading && filteredEvents.length === 0 && (
                <p>No events found within {radius} km.</p>
            )}
            {filteredEvents.map((event) => (
                <Card key={event._id} className="result-item flex border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 bg-white">
                {/* Thumbnail Section */}
                <div className="flex-shrink-0 overflow-hidden rounded-l-lg">
                    <img 
                    /* TODO: We should add support for thumbnailUrl  */
                    src={event.thumbnailUrl || 'https://dummyimage.com/150x150/cccccc/ffffff&text=No+Image'}
                    alt={event.name}
                    className="object-cover w-full h-full"
                    />
                </div>
  
                {/* Event Details Section */}
                <CardContent className="p-4 flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{event.name}</h3>
                    <div className="flex items-center mb-1">
                    <CalendarIcon className="h-4 w-4 text-gray-500 mr-2" />
                    <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center">
                    <MapPinIcon className="h-4 w-4 text-gray-500 mr-2" />
                    <p className="text-sm text-gray-600">{event.address}</p>
                    </div>
                </CardContent>
                </Card>
            ))}
            </div>
        </div>
    );
}
