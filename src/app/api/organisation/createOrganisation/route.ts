import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import { Organisation } from "@/models/organisation";
import { User } from "@/models/user";
import { fetchCurrentUser } from "@/app/api/user/getCurrentUser/route";
import { auth } from "@/auth";

export async function POST(request: Request) {
	const formData = await request.json();
	const {
		name,
		description,
		contactNumber,
		email,
		organisationMainUser,
		username,
	} = formData;

    

    

	if (!name || !organisationMainUser || !username) {

		return NextResponse.json(
			{
				error: "Missing fields",
			},
			{ status: 400 }
		);
	}

	await connectMongoDB();

	const organisation = await Organisation.findOne({
		username: username.toLowerCase(),
	});



	if (organisation) {

		return NextResponse.json(
			{
				error:
					"Organisation username is already taken. Please choose a different username.",
			},
			{ status: 400 }
		);
	}

	try {
		const session = await auth();
		let currentUser = false;
		if (session?.user?.email) {
			currentUser = await fetchCurrentUser(session?.user?.email);
		}


		if (!currentUser) {

			return NextResponse.json(
				{
					error: "User not authenicated",
				},
				{ status: 400 }
			);
		}

		if (currentUser.organisations.length > 0) {

			return NextResponse.json(
				{
					error:
						"Only allowed One Organisation per account. Upgrade to create more",
				},
				{ status: 400 }
			);
		}



		const newOrganisation = await Organisation.create({
			name,
			description,
			contactNumber,
			email,
			organisationMainUser,
			username: username.toLowerCase(),
		});



		await User.findByIdAndUpdate(
			currentUser._id,
			{ $push: { organisations: newOrganisation._id } },
			{ new: true }
		);

		return NextResponse.json(newOrganisation);
	} catch (error) {

		console.log(error.message);
		return NextResponse.json(
			{ error: "Error while creating Organisation" },
			{ status: 500 }
		);
	}
}

export const fetchCreateOrganisation = async (formData: any) => {
	try {
		const response = await fetch(
			// `${process.env.URL}/api/organisation/createOrganisation`,
			`http://localhost:3000/api/organisation/createOrganisation`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			}
		);

		const result = await response.json();
	} catch (err) {
		console.error("Error creating organisation:", err);
		throw err;
	}
};
