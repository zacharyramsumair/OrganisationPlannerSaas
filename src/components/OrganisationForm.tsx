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
import { createOrganisation } from "@/action/organisation";

type Props = {};

const FormSchema = z.object({
	name: z
		.string()
		.min(2, {
			message: "Name must be at least 2 characters.",
		})
		.max(100, {
			message: "Title must be max 100 characters.",
		}),
	description: z.string().max(500, {
		message: "Description must be max 500 characters.",
	}),
	email: z
		.string()
		.max(500, {
			message: "Email must be max 500 characters.",
		}),
	contactNumber: z
		.string()
		.max(20, {
			message: "Contact Number must be max 20 characters.",
		}),
	
});

const OrganisationForm = (props: Props) => {


	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: "",
			description: "",
			email: "",
			contactNumber: "",
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		if (data.name =="") {
			toast({
				title: "Missing Values",
                description: "Please include a Name for your Organisation"
			});
		} else {

			let formData = {...data, organisationMainUser: "6674dcdf134f92c98a29575f"}

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

			await createOrganisation(formData)
			

		}
	}

	

	return (
		<div className="flex items-center justify-center">
			<div className="w-full max-w-xl p-8 bg-white shadow-md rounded-lg">
				<h1 className="text-2xl font-bold mb-6 text-center">Create Organisation</h1>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name <span className="text-red-500">*</span></FormLabel>
									<FormControl>
										<Input placeholder="Leadership Counsil" {...field} />
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
										<Input placeholder="Small Description of your organisation" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="leadership@gmail.com" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="contactNumber"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Contact Number</FormLabel>
									<FormControl>
										<Input placeholder="868-123-4567" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" className="w-full">Submit</Button>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default OrganisationForm;
