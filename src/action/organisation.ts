"use server";

import connectMongoDB from "@/lib/mongodb";
import { Organisation } from "@/models/organisation";
import { User } from "@/models/user"; // Assuming you have a User model
import { getCurrentUser } from "./user";

const isOrganisationUsernameUnique = async (username: string) => {
  await connectMongoDB();

  const organisation = await Organisation.findOne({ username });

  return !organisation; // Returns true if username is unique, false otherwise
};

const createOrganisation = async (formData: any) => {
  await connectMongoDB();

  const { name, description, contactNumber, email, organisationMainUser, username } = formData;

  try {
    await connectMongoDB();

    // Check if the organisation username is unique
    const isUnique = await isOrganisationUsernameUnique(username);
    if (!isUnique) {
      throw new Error("Organisation username is already taken. Please choose a different username.");
    }

    let currentUser = await getCurrentUser();
    console.log(currentUser);

    if (currentUser.organisations.length > 0) {
      throw new Error("Only allowed One Organisation per account. Upgrade to create more");
    }

    const newOrganisation = await Organisation.create({ 
      name, 
      description, 
      contactNumber, 
      email, 
      organisationMainUser,
      username
    });

    // Update the current user's organisations array
    await User.findByIdAndUpdate(
      currentUser._id, 
      { $push: { organisations: newOrganisation._id } },
      { new: true }
    );

    // return newOrganisation;
    return JSON.parse(JSON.stringify(newOrganisation));
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Error while creating Organisation");
  }
};


const getOrganisationById = async (organisationId: string) => {
  await connectMongoDB();

  try {
    const organisation = await Organisation.findById(organisationId)
      .populate({
        path: "events",
        options: { sort: { updatedAt: -1 } } // Sorting events by updatedAt in descending order
      })
      .lean();

    if (!organisation) {
      throw new Error("Organisation not found");
    }

    return organisation;
  } catch (error: any) {
    console.log(error.message);
    throw new Error("Error while fetching Organisation");
  }
};

export { createOrganisation, isOrganisationUsernameUnique, getOrganisationById };
