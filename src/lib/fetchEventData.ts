import connectMongoDB from "@/lib/mongodb";
import { getCurrentUser } from "@/action/user";
import { getEventById } from "@/action/event";

const fetchEventData = async (eventId: string) => {
  await connectMongoDB();

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return { redirect: "/" };
  }

  if (!(currentUser.organisations.length > 0)) {
    return { redirect: "/createOrganisation" };
  }

  const currentEvent = await getEventById(eventId);

  console.log(currentEvent)
  console.log(currentEvent.organisation)
  console.log(currentUser.organisations[0])

  if (!currentEvent || currentEvent.organisation != currentUser.organisations[0]) {
    return { redirect: "/dashboard" };
  }

  return { currentUser, currentEvent };
};

export default fetchEventData;
