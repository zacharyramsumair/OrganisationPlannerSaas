import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import { Event } from "@/models/event";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
	const year = searchParams.get("year");

  await connectMongoDB();

  try {
    if (!year) {
      return NextResponse.json({ error: "Year parameter is missing" }, { status: 400 });
    }

    const events = await Event.find({}).lean();

    const filteredEvents = events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() == year;
    });

    return NextResponse.json(filteredEvents);
  } catch (error:any) {
    console.error("Error while fetching events:", error.message);
    return NextResponse.json({ error: "Error while fetching events" }, { status: 500 });
  }
}


export const fetchGetAllEventsForTheYear = async (year: any) => {
	try {
		if (!year) {
			throw new Error("Year is required");
		}

		const response = await fetch(
			`http://localhost:3000/api/event/getAllEventsForTheYear?year=${year}`,
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