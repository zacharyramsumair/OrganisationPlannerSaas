import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import { Event } from "@/models/event";
import { Organisation } from "@/models/organisation";

export async function POST(request: Request) {
  const formData = await request.json();


  await connectMongoDB();



  const { title, description, image, date, startTime, endTime, location, organisation } = formData;

  if(!title || !date || !startTime || !endTime || !organisation){

    return NextResponse.json({ error: "Missing Fields" }, { status: 404 });
  }

  try {
    // Find the organisation by ID

    const organisationDetails = await Organisation.findById(organisation);
    if (!organisationDetails) {

      return NextResponse.json({ error: "Organisation not found" }, { status: 404 });
    }


    let newEvent = await Event.create({
      title,
      description,
      image: "",
      date,
      startTime,
      endTime,
      location,
      host: organisationDetails.name,
      organisation
    });


    organisationDetails.events.push(newEvent._id);
    await organisationDetails.save();


    return NextResponse.json(newEvent);
  } catch (error: any) {

    console.error("Error while creating event:", error.message);
    return NextResponse.json({ error: "Error while creating event" }, { status: 500 });
  }
}



export const fetchCreateEvent = async (formData: any) => {
	try {
		const response = await fetch(
			// `${process.env.URL}/api/event/createEvent`,
			`http://localhost:3000/api/event/createEvent`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			}
		);



		const result = await response.json();
    return result
	} catch (err) {
		console.error("Error creating event:", err);
		throw err;
	}
};
