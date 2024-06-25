"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { getAllEventsForTheYear } from "@/action/event";
import { toast } from "@/components/ui/use-toast";
import { EventCard } from "../EventCard";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function ShowCalendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [eventDates, setEventDates] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await getAllEventsForTheYear(currentYear);
        const parsedEvents = events.map(event => ({
          ...event,
          date: new Date(event.date)
        }));
        setEventDates(parsedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
        toast({
          title: "Error",
          description: "Failed to fetch events for the year.",
        });
      }
    };

    fetchEvents();
  }, [currentYear]);

  const isEventDate = (date: Date) =>
    eventDates.some(
      (event) =>
        date.getDate() === event.date.getDate() &&
        date.getMonth() === event.date.getMonth() &&
        date.getFullYear() === event.date.getFullYear()
    );

  const handleMonthChange = (month: Date) => {
    setCurrentMonth(month);
    setCurrentYear(month.getFullYear());
  };

  const CustomDay = ({ date, selected, className, ...props }) => {
    const isEvent = isEventDate(date);

    const handleClick = () => {
      const events = eventDates.filter(
        (event) =>
          date.getDate() === event.date.getDate() &&
          date.getMonth() === event.date.getMonth() &&
          date.getFullYear() === event.date.getFullYear()
      );
      if (events.length > 0) {
        setSelectedEvents(events);
      }
    };

    return (
      <div
        {...props}
        className={cn(
          "relative",
          className,
          isEvent
            ? "bg-blue-200 text-blue-700 cursor-pointer"
            : "cursor-default"
        )}
        onClick={handleClick}
      >
        {date.getDate()}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 flex flex-col justify-center items-center min-h-screen md:min-h-min">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl justify-center">
        <div className="w-full lg:w-1/2 px-2 md:p-4 flex justify-center calendarSection">
          <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn("", className)}
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              nav_button: cn(
                buttonVariants({ variant: "outline" }),
                "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
              ),
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: cn(
                "h-9 w-9 text-center text-sm p-0 relative",
                "[&:has([aria-selected].day-range-end)]:rounded-r-md",
                "[&:has([aria-selected].day-outside)]:bg-accent/50",
                "[&:has([aria-selected])]:bg-accent",
                "first:[&:has([aria-selected])]:rounded-l-md",
                "last:[&:has([aria-selected])]:rounded-r-md",
                "focus-within:relative focus-within:z-20"
              ),
              day: cn(
                buttonVariants({ variant: "ghost" }),
                "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
              ),
              day_range_end: "day-range-end",
              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              day_today: "bg-accent text-accent-foreground",
              day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
              day_disabled: "text-muted-foreground opacity-50",
              day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
              day_hidden: "invisible",
              ...classNames,
            }}
            components={{
              IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
              IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
              Day: CustomDay,
            }}
            onMonthChange={handleMonthChange}
            {...props}
          />
        </div>

        <div className="w-full lg:w-1/2 p-2 md:p-4 eventSection flex flex-col justify-center items-center">
          <h2 className="text-lg font-extrabold my-2">Events</h2>
          {selectedEvents.length > 0 ? (
            <ul className="w-full">
              {selectedEvents.map((event: any, index: any) => (
                <div className="mb-3" key={index}>
                  <EventCard event={event} />
                </div>
              ))}
            </ul>
          ) : (
            <p className="w-full text-center">No events for this date.</p>
          )}
        </div>
      </div>
    </div>
  );
}
ShowCalendar.displayName = "ShowCalendar";

export { ShowCalendar };
