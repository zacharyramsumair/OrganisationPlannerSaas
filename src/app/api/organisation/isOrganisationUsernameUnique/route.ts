import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import { Organisation } from "@/models/organisation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: "Username query parameter is missing" }, { status: 400 });
  }

  await connectMongoDB();
  const organisation = await Organisation.findOne({ username: username.toLowerCase() });
  return NextResponse.json({ isUnique: !organisation });
}


export async function fetchIsOrganisationUsernameUnique(username: string): Promise<boolean> {
  try {
    if (!username) {
      throw new Error("Username is required");
    }

    const response = await fetch(
      `http://localhost:3000/api/organisation/isOrganisationUsernameUnique?username=${username}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    // if (response.ok) {


      return data.isUnique;
    // } else {
      // throw new Error(data.error || "Failed to check username uniqueness");
    // }
  } catch (error:any) {
    console.error("Error checking username uniqueness:", error.message);
    throw error;
  }
}