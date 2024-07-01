import NavbarContent from "./NavbarContent";
import { signOut, auth } from "@/auth";
import { fetchCurrentUser } from "@/app/api/user/getCurrentUser/route";
// import { auth } from "@/auth"

const Navbar = async () => {

	const session = await auth()
	let currentUser = false
	if(session?.user?.email){
		currentUser = await fetchCurrentUser(session?.user?.email)
	}

	

	let signOutUser = async () => {
		"use server";
		await signOut();
	};


	return <NavbarContent currentUser={currentUser} signOutUser={signOutUser} />;
};

export default Navbar;
