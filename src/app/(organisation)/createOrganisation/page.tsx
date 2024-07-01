import OrganisationForm from "@/components/OrganisationForm";
import { redirect } from "next/navigation";
import React from "react";
import { fetchCurrentUser } from "@/app/api/user/getCurrentUser/route";
import { auth } from "@/auth";

type Props = {};

const CreateOrganisation = async (props: Props) => {
	const session = await auth();
	let currentUser = false;
	if (session?.user?.email) {
		currentUser = await fetchCurrentUser(session?.user?.email);
	}
	if (!currentUser) {
		redirect("/");
	}
	//   console.log(currentUser)
	return (
		<div>
			<OrganisationForm currentUser={currentUser} />
		</div>
	);
};

export default CreateOrganisation;
