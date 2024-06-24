import { getCurrentUser } from "@/action/user";
import OrganisationForm from "@/components/OrganisationForm";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const CreateOrganisation = async (props: Props) => {
  const currentUser = await getCurrentUser()
	if (!currentUser) {
    redirect("/")
	}
//   console.log(currentUser)
	return (
		<div>
			<OrganisationForm  currentUser={currentUser}/>
		</div>
	);
};

export default CreateOrganisation;
