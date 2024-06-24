"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import TimePicker from "./Timepicker/TimePicker";
import { DatePicker } from "./ui/date-picker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { editEvent, getAllEventsForSpecificDate } from "@/action/event";

const FormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(100, {
      message: "Title must be max 100 characters.",
    }),
  description: z.string().max(500, {
    message: "Description must be max 500 characters.",
  }),
  location: z.string().max(75, {
    message: "Location must be max 75 characters.",
  }),
});

const EditEventForm = ({ currentUser, currentEvent }: any) => {
  const [startTime, setStartTime] = useState(currentEvent.startTime);
  const [endTime, setEndTime] = useState(currentEvent.endTime);
  const [date, setDate] = useState(currentEvent.date);
  const [occupied, setOccupied] = useState([]);
  const [isTimePickerEnabled, setIsTimePickerEnabled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsTimePickerEnabled(date !== null);
    if (date) {
      fetchOccupiedTimes(date);
    }
  }, [date]);

  const fetchOccupiedTimes = async (selectedDate: string) => {
    try {
      const events = await getAllEventsForSpecificDate(selectedDate);
      const occupiedTimes = events.map((event: any) => ({
        startTime: event.startTime,
        endTime: event.endTime,
      }));
      setOccupied(occupiedTimes);
    } catch (error) {
      console.error("Error fetching events for date:", error);
    }
  };

  if (currentUser.organisations.length === 0) {
    toast({
      title: "Create an Organisation",
      description: "Create an Organisation in order to set Events",
    });
    router.push("/createOrganisation");
  }

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: currentEvent.title,
      description: currentEvent.description,
      location: currentEvent.location,
    },
  });

  const onSubmit = async (data: any) => {
    if (!date || !startTime || !endTime) {
      toast({
        title: "Missing Values",
        description: "Please select a date, start and end time",
      });
      return;
    }

    const formData = {
      ...data,
      date,
      startTime,
      endTime,
      organisation: currentUser.organisations[0],
    };

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(formData, null, 2)}
          </code>
        </pre>
      ),
    });

    await editEvent(currentEvent._id, formData);
    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-xl p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Event</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Title <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="General Meeting" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Small Description of your event" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Amphitheatre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormLabel>
                Date <span className="text-red-500">*</span>
              </FormLabel>
              <div>
                <DatePicker date={date} setDate={setDate} />
              </div>
            </div>

            <div>
              <FormLabel>
                Start Time and End Time <span className="text-red-500">*</span>
              </FormLabel>
              <TimePicker
                occupiedTimes={occupied}
                startTime={startTime}
                setStartTime={setStartTime}
                endTime={endTime}
                setEndTime={setEndTime}
                disabled={!isTimePickerEnabled} // Disable TimePicker if date is not selected
              />
            </div>

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditEventForm;
