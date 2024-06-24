import { getOrganisationByIdWithoutPopulatedEvents } from "@/action/organisation";
import { getCurrentUser } from "@/action/user";
import EditOrganisationForm from "@/components/EditOrganisationForm";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const EditOrganisation = async (props: Props) => {
  const currentUser = await getCurrentUser()
	if (!currentUser) {
    redirect("/")
	}

    if (!(currentUser.organisations.length > 0)) {
        redirect("/createOrganisation")
        }


        let organisationInformation = await getOrganisationByIdWithoutPopulatedEvents(currentUser.organisations[0])

    
//   console.log(currentUser)
	return (
		<div>
			<EditOrganisationForm  currentUser={currentUser} organisationInformation={organisationInformation}/>
		</div>
	);
};

export default EditOrganisation;
