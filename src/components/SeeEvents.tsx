"use client"
import React, { useState } from 'react';
import EventsList from '@/components/EventsList';
import { ShowCalendar } from '@/components/ui/showCalendar';
import { Calendar, List } from 'lucide-react';
import { Button } from './ui/button';

const SeeEvents = () => {
  const [view, setView] = useState<'calendar' | 'list'>('calendar');

  const switchToCalendarView = () => {
    setView('calendar');
  };

  const switchToListView = () => {
    setView('list');
  };

  return (
    <>
    <div className='flex justify-center flex-row mt-5'>
      <Button onClick={switchToCalendarView} className={view === 'calendar' ? 'selected' : ''}>
        <Calendar />
    
      </Button>
      <div className="mx-2"></div>
      <Button onClick={switchToListView} className={view === 'list' ? 'selected' : ''}>
        <List />
      </Button>
    </div>
    {view === 'calendar' ? <ShowCalendar /> : <EventsList />}

    </>
  );
};

export default SeeEvents;
