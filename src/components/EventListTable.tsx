import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { format } from 'date-fns';

export function EventListTable({ events }: any) {
	return (
		<div className="overflow-x-auto">
			<Table className="min-w-full">
				{/* <TableCaption>A list of your recent invoices.</TableCaption> */}
				<TableHeader>
					<TableRow>
						<TableHead className="text-left">Event</TableHead>
						<TableHead className="text-left hidden sm:table-cell">Host</TableHead>
						<TableHead className="text-left hidden md:table-cell">Location</TableHead>
						<TableHead className="text-left">Date</TableHead>
						<TableHead className="text-left">Time</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{events.map((event) => (
						<TableRow key={event._id}>
							<TableCell className="text-left">
								{event.title}
							</TableCell>
							<TableCell className="text-left hidden sm:table-cell">{event.host}</TableCell>
							<TableCell className="text-left hidden md:table-cell">{event.location || "TBA"}</TableCell>
							<TableCell className="text-left">
								{format(new Date(event.date), "EEEE do MMMM, yyyy")}
							</TableCell>
							<TableCell className="text-left">{event.startTime} - {event.endTime}</TableCell>
						</TableRow>
					))}
				</TableBody>
				{/* <TableFooter>
					<TableRow>
						<TableCell colSpan={3}>Total</TableCell>
						<TableCell className="text-right">$2,500.00</TableCell>
					</TableRow>
				</TableFooter> */}
			</Table>
		</div>
	);
}
