"use server";

import connectMongoDB from "@/lib/mongodb";
import { Organisation } from "@/models/organisation";

const createOrganisation = async (formData: any) => {
  await connectMongoDB();

  const { name, description, contactNumber, email, organisationMainUser } = formData;

  try {
    await connectMongoDB();
    await Organisation.create({ name, description, contactNumber, email, organisationMainUser });
  } catch (error: any) {
    console.log(error.message)
    throw new Error("Error while creating Organisation");
  }
}



export { createOrganisation };
