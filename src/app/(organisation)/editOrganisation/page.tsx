import EditOrganisationForm from "@/components/EditOrganisationForm";
import { redirect } from "next/navigation";
import React from "react";
import { fetchCurrentUser } from "@/app/api/user/getCurrentUser/route";
import { auth } from "@/auth"
import { fetchOrganisationByIdWithoutPopulatedEvents } from "@/app/api/organisation/getOrganisationByIdWithoutPopulatedEvents/route";

type Props = {};

const EditOrganisation = async (props: Props) => {
	const session = await auth()
	let currentUser = false
	if(session?.user?.email){
		currentUser = await fetchCurrentUser(session?.user?.email)
	}  
	if (!currentUser) {
    redirect("/")
	}

    if (!(currentUser.organisations.length > 0)) {
        redirect("/createOrganisation")
        }


        let organisationInformation = await fetchOrganisationByIdWithoutPopulatedEvents(currentUser.organisations[0])

    
//   console.log(currentUser)
	return (
		<div>
			<EditOrganisationForm  currentUser={currentUser} organisationInformation={organisationInformation}/>
		</div>
	);
};

export default EditOrganisation;
