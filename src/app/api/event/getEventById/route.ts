import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import { Event } from "@/models/event";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
	const eventId = searchParams.get("eventId");

  await connectMongoDB();

  try {
    if (eventId) {
      return NextResponse.json({ error: "Event ID parameter is missing" }, { status: 400 });
    }

    const event = await Event.findById(eventId).lean();

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error while fetching event:", error.message);
    return NextResponse.json({ error: "Error while fetching event" }, { status: 500 });
  }
}


export const fetchGetEventById = async (eventId: any) => {
	try {
		if (!eventId) {
			throw new Error("EventId is required");
		}

		const response = await fetch(
			`http://localhost:3000/api/event/getEventById?eventId=${eventId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				  },
				  cache: "no-store"
			}
		);

		const event = await response.json();
		return event;
	} catch (err:any) {
		console.error("Error fetching event:", err);
		throw err;
	}
};