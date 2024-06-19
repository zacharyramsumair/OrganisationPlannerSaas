import * as React from "react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const eventDates = [
    { title: "Feed dog", date: new Date(2024, 5, 15) }, // June 15, 2024
    { title: "Player", date: new Date(2024, 5, 23) }, // June 23, 2024
    { title: "Call them", date: new Date(2024, 5, 23) }, // June 23, 2024
  ];

  const [selectedEvents, setSelectedEvents] = useState([]);

  const isEventDate = (date: Date) =>
    eventDates.some(
      (event) =>
        date.getDate() === event.date.getDate() &&
        date.getMonth() === event.date.getMonth() &&
        date.getFullYear() === event.date.getFullYear()
    );

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
        setSelectedEvents(events); // Update the state with the events for the selected date
        events.forEach((event) => {
          console.log("Event:", event.title, "Date:", event.date);
          toast({
            title: event.title,
            description: event.date.toDateString(),
          });
        });
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
        onClick={handleClick} // Attach onClick event handler
      >
        {date.getDate()}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl">
        <div className="w-full lg:w-1/2 p-2 md:p-4 calendarSection">
          <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn("p-3 w-full", className)}
            classNames={{
              months:
                "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
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
              head_cell:
                "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
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
              day_selected:
                "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              day_today: "bg-accent text-accent-foreground",
              day_outside:
                "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
              day_disabled: "text-muted-foreground opacity-50",
              day_range_middle:
                "aria-selected:bg-accent aria-selected:text-accent-foreground",
              day_hidden: "invisible",
              ...classNames,
            }}
            components={{
              IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
              IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
              Day: CustomDay,
            }}
            {...props}
          />
        </div>

        <div className="w-full lg:w-1/2 p-2 md:p-4 eventSection">
          <h2 className="text-lg font-medium">Events</h2>
          {selectedEvents.length > 0 ? (
            <ul>
              {selectedEvents.map((event, index) => (
                <li key={index} className="mt-2">
                  <strong>{event.title}</strong> on {event.date.toDateString()}
                </li>
              ))}
            </ul>
          ) : (
            <p>No events for this date.</p>
          )}
        </div>
      </div>
    </div>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
