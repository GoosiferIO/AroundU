'use client';

import { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import CreateEventDialog from '@/components/CreateEventDialog';

import { Card, CardContent } from '@/components/ui/card';
import Map from './_components/Map';
import Sidebar from './_components/Sidebar';
import Search from '../Search';
import Filter from './_components/Filter';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="home-page flex min-h-screen items-center justify-center bg-gray-50 p-4 flex-col">
      <section className="w-full max-w-6xl">
        <CardContent className="py-20">
          <h1 className="text-3xl font-bold">Start finding events with AroundU.</h1>

      <Card className="flex w-full max-w-6xl flex-col md:flex-row mt-4">
        <CardContent className="flex-1 p-0 md:w-1/3 ">

          {/* Create Event Button */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="default" className="m-4">
                <PlusIcon className="mr-2 h-4 w-4" />
                Create Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <CreateEventDialog onClose={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>

          {/* Filtering Options */}
          <Filter />

          {/* Searchbar */}
          <Search />

        </CardContent>
        <CardContent className="mt-4 flex-1 p-0 md:mt-0 md:w-2/3">
          <Map />
        </CardContent>
      </Card>

        </CardContent>
      </section>
    </div>
  );
}
