import EventForm from '@/components/EventForm'
import React from 'react'
import { redirect } from "next/navigation";
import { fetchCurrentUser } from "@/app/api/user/getCurrentUser/route";
import { auth } from "@/auth"



type Props = {}

const page = async (props: Props) => {
  const session = await auth()
	let currentUser = false
	if(session?.user?.email){
		currentUser = await fetchCurrentUser(session?.user?.email)
	}


	if (!currentUser) {
    redirect("/")
	}
  // console.log(currentUser)
  return (
    <div>
      <EventForm currentUser={currentUser}/>
    </div>
  )
}

export default page