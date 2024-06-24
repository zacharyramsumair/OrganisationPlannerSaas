import React from "react";
import fetchEventData from "@/lib/fetchEventData";
import EditEventForm from "@/components/EditEventForm";
import { redirect } from "next/navigation";

const EditEventPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const data = await fetchEventData(id);

  if ('redirect' in data) {
    redirect(data.redirect);
  }

  const { currentUser, currentEvent } = data;

  return (
    <div>
      <EditEventForm currentEvent={currentEvent} currentUser={currentUser} />
    </div>
  );
};

export default EditEventPage;
