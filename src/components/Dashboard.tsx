"use client";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/action/user";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllEventsForOrganisation } from "@/action/event";
import { DeleteEventDialog } from "./DeleteEventDialog";

type Props = {
	organisationInformation: any;
};

const Dashboard = async (props: Props) => {
	return (
		<>
			<div className="p-6">
				<h1 className="text-3xl font-bold mb-6">Dashboard</h1>

				{props.organisationInformation && (
					<>
						<div className="mb-6">
							<h2 className="text-2xl font-bold mb-2">
								Organisation: {props.organisationInformation.name}
							</h2>
							<p className="text-gray-600 mb-4">
								Username: @{props.organisationInformation.username}
							</p>
							<p className="text-gray-600 mb-2">
								Description:{" "}
								{props.organisationInformation.description || "N/A"}
							</p>
							<p className="text-gray-600 mb-2">
								Email: {props.organisationInformation.email || "N/A"}
							</p>
							<p className="text-gray-600 mb-2">
								Contact Number:{" "}
								{props.organisationInformation.contactNumber || "N/A"}
							</p>
							<Link href={`/editOrganisation`}>
								<Button className="mt-4">Edit Organisation</Button>
							</Link>
						</div>


						<div>
							<h2 className="text-xl font-semibold mb-4">Your Events</h2>

							<div className="my-6">
								<Link href="/createEvent">
									<Button>Create Event</Button>
								</Link>
							</div>

							{props.organisationInformation.events &&
							props.organisationInformation.events.length > 0 ? (
								<ul className="space-y-4">
									{props.organisationInformation.events.map(
										(eve: any) => (
											<li
												key={eve._id}
												className="p-4 border rounded-lg flex justify-between items-center"
											>
												<div>
													<h3 className="text-lg font-medium">
														{eve.title}
													</h3>
													<p>{eve.description}</p>
													<p>
														{new Date(eve.date).toDateString()} -{" "}
														{eve.startTime} to {eve.endTime}
													</p>
												</div>
												<div className="gap-5">

												<Link href={`/editEvent/${eve._id}`}>
													<Button>Edit</Button>
												</Link>
												<DeleteEventDialog eventId={eve._id}/>
												</div>
											</li>
										)
									)}
								</ul>
							) : (
								<p>No events available.</p>
							)}
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default Dashboard;
