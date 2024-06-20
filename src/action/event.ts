"use server";

import connectMongoDB from "@/lib/mongodb";
import { Event } from "@/models/event";

const createEvent = async (formData: any) => {
  await connectMongoDB();

  const { title, description, image, date, startTime, endTime, location, host, organisation } = formData;

  try {
    await connectMongoDB();
    await Event.create({ title, description, image: "", date, startTime, endTime, location, host: "FMS", organisation: "Leadership Counsil" });
  } catch (error: any) {
    console.log(error.message)
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

export { createEvent, getAllEventsForTheYear };
