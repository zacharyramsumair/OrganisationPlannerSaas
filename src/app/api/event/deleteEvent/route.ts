import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import { Event } from "@/models/event";
import { Organisation } from "@/models/organisation";

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
	const eventId = searchParams.get("eventId");

  await connectMongoDB();

  try {

    const event = await Event.findById(eventId);

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const organisation = await Organisation.findById(event.organisation);

    if (organisation) {
      organisation.events.pull(eventId);
      await organisation.save();
    }

    await Event.deleteOne({ _id: eventId });

    return NextResponse.json({ message: "Event deleted successfully" });
  } catch (error:any) {
    console.error("Error while deleting event:", error.message);
    return NextResponse.json({ error: "Error while deleting event" }, { status: 500 });
  }
}


export const fetchDeleteEvent = async (eventId: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/event/deleteEvent?eventId=${eventId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

  

    return result;
  } catch (err:any) {
    console.error("Error deleting event:", err);
    throw err;
  }
};