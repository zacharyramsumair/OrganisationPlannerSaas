import React from 'react'
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/action/user";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Dashboard from '@/components/Dashboard';
import { getAllEventsForOrganisation } from '@/action/event';
import { getOrganisationById } from '@/action/organisation';


type Props = {}

const dashboard = async (props: Props) => {
  const currentUser = await getCurrentUser()
	if (!currentUser) {
    redirect("/")
	}

  if (!(currentUser.organisations.length > 0)) {
    redirect("/createOrganisation")
	}

  let organisationInformation = await getOrganisationById(currentUser.organisations[0])
  // console.log(organisationInformation)
  // console.log(currentUser)
  
  return (
    <div>
      {/* <Link href={"/createEvent"}>
      <Button>Create Event</Button>
      </Link> */}
      <Dashboard organisationInformation={organisationInformation}/>
    </div>
  )
}

export default dashboard