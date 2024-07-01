import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import { Organisation } from "@/models/organisation";
import { fetchCurrentUser } from "@/app/api/user/getCurrentUser/route";
import { auth } from "@/auth";

export async function PUT(request: Request) {
	const { organisationId, updateData } = await request.json();

	if (!organisationId || !updateData) {
		return NextResponse.json(
			{ error: "organisationId and updateData are required" },
			{ status: 400 }
		);
	}

	const session = await auth();
	let currentUser = false;
	if (session?.user?.email) {
		currentUser = await fetchCurrentUser(session?.user?.email);
	}

	const isOrganisationOwnedByUser = currentUser.organisations.includes(
		organisationId
	);

	if (!isOrganisationOwnedByUser) {
		return NextResponse.json(
			{ error: "User does not own this organisation" },
			{ status: 403 }
		);
	}

	await connectMongoDB();

	try {
		const updatedOrganisation = await Organisation.findByIdAndUpdate(
			organisationId,
			updateData,
			{ new: true }
		).lean();

		if (!updatedOrganisation) {
			return NextResponse.json(
				{ error: "Organisation not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(updatedOrganisation);
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(
			{ error: "Error while updating Organisation" },
			{ status: 500 }
		);
	}
}


export async function fetchUpdateOrganisation(organisationId: string, updateData: any, currentUser:any): Promise<any> {
	try {
	  if (!organisationId || !updateData || !currentUser) {
		throw new Error("organisationId and updateData are required");
	  }
  
	 
  
	  const isOrganisationOwnedByUser = currentUser.organisations.includes(organisationId);
  
	  if (!isOrganisationOwnedByUser) {
		throw new Error("User does not own this organisation");
	  }
  
	  const response = await fetch(
		`http://localhost:3000/api/organisation/updateOrganisation`,
		{
		  method: "PUT",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify({ organisationId, updateData }),
		}
	  );
  
	  const updatedOrganisation = await response.json();
  
	
		return updatedOrganisation;
	
	} catch (error:any) {
	  console.error("Error updating organisation:", error.message);
	  throw error;
	}
  }