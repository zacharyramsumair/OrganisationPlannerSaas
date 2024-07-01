import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import { Event } from "@/models/event";

export async function PUT(request: Request) {
  const { eventId, updateData, currentUser } = await request.json();


  if (!eventId || !updateData || !currentUser) {

    return NextResponse.json({ error: "Missing Fields" }, { status: 404 });
  }

  await connectMongoDB();



  try {



    let event = await Event.findById(eventId);

    if (!event) {

      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    if (event.organisation !=currentUser.organisations[0]) {
 
      return NextResponse.json({ error: "User does not have permission" }, { status: 400 });
    }

    // Update event properties with the updateData
    event.title = updateData.title;
    event.description = updateData.description;
    event.image = updateData.image;
    event.date = updateData.date;
    event.startTime = updateData.startTime;
    event.endTime = updateData.endTime;
    event.location = updateData.location;


    // Save the updated event
    await event.save();


    return NextResponse.json(event);
  } catch (error:any) {

    console.error("Error while updating event:", error.message);
    return NextResponse.json({ error: "Error while updating event" }, { status: 500 });
  }
}


export async function fetchUpdateEvent(eventId: string, updateData: any, currentUser:any): Promise<any> {
	try {
	  if (!eventId || !updateData || !currentUser) {
		throw new Error("eventId and updateData are required");
	  }
  
	 
  
	
  
	  const response = await fetch(
		`http://localhost:3000/api/event/updateEvent`,
		{
		  method: "PUT",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify({ eventId, updateData, currentUser }),
		}
	  );
  
	  const updatedEvent = await response.json();
  
	
		return updatedEvent;
	
	} catch (error:any) {
	  console.error("Error updating event:", error.message);
	  throw error;
	}
  }
