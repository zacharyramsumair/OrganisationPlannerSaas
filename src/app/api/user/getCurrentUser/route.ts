import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import { User } from "@/models/user";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const email = searchParams.get('email');

	if (!email) {
		return NextResponse.json({ error: "Email query parameter is missing" }, { status: 400 });
	}

	try {
		await connectMongoDB();
		const currentUser = await User.findOne({ email });

		if (!currentUser) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		return NextResponse.json(currentUser);
	} catch (error) {
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
	}
}


export const fetchCurrentUser = async (email:string) => {
    try {
      const response = await fetch(`${process.env.URL}/api/user/getCurrentUser?email=${email}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };
