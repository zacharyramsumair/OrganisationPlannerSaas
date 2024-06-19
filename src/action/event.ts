"use server";

import connectMongoDB from "@/lib/mongodb";
import { Event } from "@/models/event";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/getSession";

const createEvent = async (formData:any) => {
    await connectMongoDB();

    const { title, description, image, date, startTime, endTime, location, host, organisation } = formData;

    try {
        await connectMongoDB();
        await Event.create({ title, description, image:"", date, startTime, endTime, location, host:"FMS", organisation:"Leadership Counsil" });
    }  catch (error:any) {
      console.log(error.message)
    throw new Error("Error while creating user");
  }
}
 
  
  
  
  
  export { createEvent };