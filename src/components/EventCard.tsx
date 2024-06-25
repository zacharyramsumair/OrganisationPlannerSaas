import { BellRing, Check } from "lucide-react";
import { format } from 'date-fns';


import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const notifications = [
	{
		title: "Your call has been confirmed.",
		description: "1 hour ago",
	},
	{
		title: "You have a new message!",
		description: "1 hour ago",
	},
	{
		title: "Your subscription is expiring soon!",
		description: "2 hours ago",
	},
];

export function EventCard({ className, event, ...props }: any) {
    console.log(event)
	return (
		<Card className={cn("w-[380px]", className)} {...props}>
			<CardHeader>
				<CardTitle>{event.title}</CardTitle>
				<CardDescription>{event.description}</CardDescription>
				<CardDescription>Hosted by: {event.host}</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4">
				<div>
					{event.location && (
						<div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
							<span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
							<div className="space-y-1">
								<p className="text-sm font-medium leading-none">
									Location: {event.location}
								</p>
								{/* <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p> */}
							</div>
						</div>
					)}

					<div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
						<span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
						<div className="space-y-1">
							<p className="text-sm font-medium leading-none">
								{/* {event.date} */} Date: {format(event.date, "EEEE do MMMM, yyyy")}
							</p>
							<p className="text-sm text-muted-foreground">
								{event.startTime} - {event.endTime}
							</p>
						</div>
					</div>
				</div>
			</CardContent>
			{/* <CardFooter>
				<Button className="w-full">
					<Check className="mr-2 h-4 w-4" /> Mark all as read
				</Button>
			</CardFooter> */}
		</Card>
	);
}
