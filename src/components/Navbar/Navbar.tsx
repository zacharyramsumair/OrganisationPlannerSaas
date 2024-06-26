import { getCurrentUser } from "@/action/user";
import NavbarContent from "./NavbarContent";
import { signOut } from "@/auth";

const Navbar = async () => {
	let currentUser = await getCurrentUser();

	let signOutUser = async () => {
		"use server";
		await signOut();
	};

	// console.log("curent", currentUser);

	return <NavbarContent currentUser={currentUser} signOutUser={signOutUser} />;
};

export default Navbar;
