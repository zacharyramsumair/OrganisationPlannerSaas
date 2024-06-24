import EventForm from '@/components/EventForm'
import React from 'react'
import { getCurrentUser } from "@/action/user";
import { redirect } from "next/navigation";



type Props = {}

const page = async (props: Props) => {
  const currentUser = await getCurrentUser()
	if (!currentUser) {
    redirect("/")
	}
  console.log(currentUser)
  return (
    <div>
      <EventForm currentUser={currentUser}/>
    </div>
  )
}

export default page