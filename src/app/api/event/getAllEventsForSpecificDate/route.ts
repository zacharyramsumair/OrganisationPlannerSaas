import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import { Event } from "@/models/event";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
	const date = searchParams.get("date");
  await connectMongoDB();

  try {
    if (!date) {
      return NextResponse.json({ error: "Date parameter is missing" }, { status: 400 });
    }

    const targetDate = new Date(date);
    const events = await Event.find({}).lean();

    const filteredEvents = events.filter(event => {
      const eventDate = new Date(event.date);

      return (
        eventDate.getFullYear() === targetDate.getFullYear() &&
        eventDate.getMonth() === targetDate.getMonth() &&
        eventDate.getDate() === targetDate.getDate()
      );
    });

    return NextResponse.json(filteredEvents);
  } catch (error:any) {
    console.error("Error while fetching events:", error.message);
    return NextResponse.json({ error: "Error while fetching events" }, { status: 500 });
  }
}


export const fetchGetAllEventsForSpecificDate = async (date: any) => {
	try {
		if (!date) {
			throw new Error("Date is required");
		}

		const response = await fetch(
			`http://localhost:3000/api/event/getAllEventsForSpecificDate?date=${date}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				  },
				  cache: "no-store"
			}
		);

		const events = await response.json();
		return events;
	} catch (err:any) {
		console.error("Error fetching events:", err);
		throw err;
	}
};