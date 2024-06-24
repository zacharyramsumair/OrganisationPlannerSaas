"use client";

import React, { useState, useEffect } from "react";
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
import { createEvent, getAllEventsForSpecificDate } from "@/action/event";
import { useRouter } from "next/navigation";

type Props = {
    currentUser: any
};

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
    location: z
        .string()
        .max(75, {
            message: "Location must be max 50 characters.",
        }),
});

const EventForm = (props: Props) => {
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [date, setDate] = useState(null);
    const [occupied, setOccupied] = useState([]);
    const [isTimePickerEnabled, setIsTimePickerEnabled] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsTimePickerEnabled(date !== null);
        setStartTime(null);
        setEndTime(null);

        if (date) {
            fetchOccupiedTimes(date);
        }
    }, [date]);

    const fetchOccupiedTimes = async (selectedDate:any) => {
        try {
            let events = await getAllEventsForSpecificDate(selectedDate);
            console.log(events);
    
            // Always setOccupied, even if events is an empty array
            let occupiedTimes:any = events.map(event => ({
                startTime: event.startTime,
                endTime: event.endTime
            }));


            if(events.length == 0){
                occupiedTimes = [{
                    startTime: null,
                endTime: null
                }]
            }

            setOccupied(occupiedTimes);
        } catch (error) {
            console.error("Error fetching events for date:", error);
            // Ensure occupied is cleared in case of an error
            setOccupied([]);
        }
    };

    if (props.currentUser.organisations.length == 0) {
        toast({
            title: "Create an Organisation",
            description: "Create an Organisation in order to set Events",
        });
        router.push("/createOrganisation");
    }

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            description: "",
            location: "",
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        if (date == null || startTime == null || endTime == null) {
            toast({
                title: "Missing Values",
                description: "Please select a date, start and end time"
            });
        } else {
            let formData = { ...data, date, startTime, endTime, organisation: props.currentUser.organisations[0] };

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

            await createEvent(formData);
            router.push("/dashboard");
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-xl p-8 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Create Event</h1>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title <span className="text-red-500">*</span></FormLabel>
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
                            <FormLabel>Date <span className="text-red-500">*</span></FormLabel>
                            <div>
                                <DatePicker date={date} setDate={setDate} />
                            </div>
                        </div>

                        <div>
                            <FormLabel>Start Time and End Time <span className="text-red-500">*</span></FormLabel>
                            <TimePicker
                                occupiedTimes={occupied}
                                startTime={startTime}
                                setStartTime={setStartTime}
                                endTime={endTime}
                                setEndTime={setEndTime}
                                disabled={!isTimePickerEnabled} // Disable TimePicker if date is not selected
                            />
                        </div>

                        <Button type="submit" className="w-full">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default EventForm;
