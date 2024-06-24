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

export { createEvent, getAllEventsForTheYear, getAllEventsForSpecificDate,getAllEventsForOrganisation };
