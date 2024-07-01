import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import { Organisation } from "@/models/organisation";
import { Event } from "@/models/event";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const organisationId = searchParams.get("organisationId");


	if (!organisationId) {

		return NextResponse.json(
			{ error: "organisationId query parameter is missing" },
			{ status: 400 }
		);
	}


	await connectMongoDB();



	try {

		const organisation = await Organisation.findById(organisationId)
			.populate({
				path: "events",
				model: Event,
				options: { sort: { updatedAt: -1 } },
			})
			.lean();



		if (!organisation) {

			return NextResponse.json(
				{ error: "Organisation not found" },
				{ status: 404 }
			);
		}


		return NextResponse.json(organisation);
	} catch (error:any) {

		console.log(error.message);
		return NextResponse.json(
			{ error: "Error while fetching Organisation" },
			{ status: 500 }
		);
	}
}

export const fetchOrganisationById = async (organisationId: string) => {
	try {
		if (!organisationId) {
			throw new Error("Organisation ID is required");
		}

		const response = await fetch(
			`http://localhost:3000/api/organisation/getOrganisationById?organisationId=${organisationId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				  },
				  cache: "no-store"
			}
		);

		const organisation = await response.json();
		return organisation;
	} catch (err) {
		console.error("Error fetching organisation:", err);
		throw err;
	}
};
