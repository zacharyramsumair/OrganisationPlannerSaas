"use server";

import connectMongoDB from "@/lib/mongodb";
import { Event } from "@/models/event";
import { Organisation } from "@/models/organisation";

const createEvent = async (formData: any) => {
  await connectMongoDB();

  const { title, description, image, date, startTime, endTime, location, organisation } = formData;

  try {
    // Find the organisation by ID
    const organisationDetails = await Organisation.findById(organisation);
    if (!organisationDetails) {
      throw new Error("Organisation not found");
    }

    let newEvent = await Event.create({ title, description, image: "", date, startTime, endTime, location, host: organisationDetails.name, organisation });

    organisationDetails.events.push(newEvent._id);
    await organisationDetails.save();
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Error while creating user");
  }
}

const getAllEventsForTheYear = async (year: number) => {
  await connectMongoDB();

  // Fetch all events
  const events = await Event.find({}).lean(); // Use .lean() to get plain JavaScript objects

  // Filter events by the specified year
  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year;
  });

  return filteredEvents;
}

const getAllEventsForSpecificDate = async (date: string) => {
  await connectMongoDB();

  // Parse the provided date string
  const targetDate = new Date(date);

  // Fetch all events
  const events = await Event.find({}).lean(); // Use .lean() to get plain JavaScript objects

  // Filter events by the specified date
  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);

    // Compare year, month, and day to ensure they match the target date
    return (
      eventDate.getFullYear() === targetDate.getFullYear() &&
      eventDate.getMonth() === targetDate.getMonth() &&
      eventDate.getDate() === targetDate.getDate()
    );
  });

  return filteredEvents;
}


const getAllEventsForOrganisation = async (organisationId:any) => {
  await connectMongoDB();

  // Fetch all events for the given organisation
  const events = await Event.find({ organisation: organisationId }).lean();
  
  return JSON.parse(JSON.stringify(events));
};


const getEventById = async (eventId:any) => {
  try {
    console.log("problem 1")
    // Connect to the MongoDB database
    await connectMongoDB();

    console.log("problem 2")


    // Find the event by its ID
    const event = await Event.findById(eventId).lean();
    console.log("problem 3")


    // If event is not found, throw an error
    if (!event) {
      throw new Error("Event not found");
    }

    // Return the found event
    return JSON.parse(JSON.stringify(event));
  } catch (error:any) {
    // Log and throw any errors that occur
    console.error("Error while fetching event by ID:", error.message);
    throw new Error("Error while fetching event");
  }
};

const editEvent = async (eventId:any, formData:any) => {
  try {
    // Connect to the MongoDB database
    await connectMongoDB();

    // Find the event by its ID
    let event = await Event.findById(eventId);

    // If event is not found, throw an error
    if (!event) {
      throw new Error("Event not found");
    }

    // Update event properties with the formData
    event.title = formData.title;
    event.description = formData.description;
    event.image = formData.image;
    event.date = formData.date;
    event.startTime = formData.startTime;
    event.endTime = formData.endTime;
    event.location = formData.location;

    // Save the updated event
    await event.save();

    // Return the updated event
    return event.toJSON();
  } catch (error:any) {
    // Log and throw any errors that occur
    console.error("Error while editing event:", error.message);
    throw new Error("Error while editing event");
  }
};

const deleteEvent = async (eventId: any) => {
  try {
    // Connect to the MongoDB database
    await connectMongoDB();


    // Find the event by its ID
    const event = await Event.findById(eventId);



    // If event is not found, throw an error
    if (!event) {
      throw new Error("Event not found");
    }


    // Find the related organisation
    const organisation = await Organisation.findById(event.organisation);


    if (organisation) {
      // Remove the event reference from the organisation's events array
      
      organisation.events.pull(eventId);
      await organisation.save();
    }
    
    // Remove the event from the database
    await Event.deleteOne({ _id: eventId });
    
    return { message: "Event deleted successfully" };
  } catch (error: any) {
    // Log and throw any errors that occur
    console.error("Error while deleting event:", error.message);
    throw new Error("Error while deleting event");
  }
};

export { createEvent, getAllEventsForTheYear, getAllEventsForSpecificDate, getAllEventsForOrganisation, getEventById, editEvent, deleteEvent };
