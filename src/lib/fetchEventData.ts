import connectMongoDB from "@/lib/mongodb";
import { fetchGetEventById } from "@/app/api/event/getEventById/route";
import {fetchCurrentUser} from "@/app/api/user/getCurrentUser/route"
import { auth } from "@/auth"



const fetchEventData = async (eventId: string) => {
  await connectMongoDB();

  const session = await auth()
	let currentUser = false
	if(session?.user?.email){
		currentUser = await fetchCurrentUser(session?.user?.email)
	}

  if (!currentUser) {
    return { redirect: "/" };
  }

  if (!(currentUser.organisations.length > 0)) {
    return { redirect: "/createOrganisation" };
  }

  const currentEvent = await fetchGetEventById(eventId);

  // console.log(currentEvent)
  // console.log(currentEvent.organisation)
  // console.log(currentUser.organisations[0])

  if (!currentEvent || currentEvent.organisation != currentUser.organisations[0]) {
    return { redirect: "/dashboard" };
  }

  return { currentUser, currentEvent };
};

export default fetchEventData;
