"use client";

import React, { useState } from "react";
import TimePicker from "./Timepicker/TimePicker";
import { DatePicker } from "./ui/date-picker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { createEvent } from "@/action/event";

type Props = {};

const FormSchema = z.object({
	title: z
		.string()
		.min(2, {
			message: "Title must be at least 2 characters.",
		})
		.max(100, {
			message: "Title must be more than 100 characters.",
		}),
	description: z.string().max(500, {
		message: "Description must be more than 500 characters.",
	}),
	location: z
		.string()
		.max(75, {
			message: "Location must be more than 50 characters.",
		}),
	host: z
		.string()
		.min(2, {
			message: "Host must be at least 2 characters.",
		})
		.max(100, {
			message: "Host must be more than 50 characters.",
		}),
});

const EventForm = (props: Props) => {
	const [startTime, setStartTime] = useState(null);
	const [endTime, setEndTime] = useState(null);
	const [date, setDate] = useState(null);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			title: "",
			description: "",
			location: "",
			host: "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		if (date == null || startTime == null || endTime == null) {
			toast({
				title: "Missing Values",
                description: "Please select a date, start and end time"
			});
		} else {
			let formData = { ...data, date, startTime, endTime};

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

			await createEvent(formData)

		}
	}

	let occupied = [
		{ startTime: "01:45", endTime: "04:00" },
		{ startTime: "11:45", endTime: "14:00" },
	];

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
									<FormLabel>Title</FormLabel>
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

						<FormField
							control={form.control}
							name="host"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Host</FormLabel>
									<FormControl>
										<Input placeholder="You" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div>
							<FormLabel>Date</FormLabel>
							<DatePicker date={date} setDate={setDate} />
						</div>
						<div>
							<FormLabel>Start Time</FormLabel>
							<TimePicker occupiedTimes={occupied} startTime={startTime} setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime} />
						</div>

						<Button type="submit" className="w-full">Submit</Button>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default EventForm;
