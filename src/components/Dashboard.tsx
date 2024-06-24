"use client";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/action/user";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllEventsForOrganisation } from "@/action/event";

type Props = {
	organisationInformation: any;
};

const Dashboard = async (props: Props) => {
	return (
		<>
			<div className="p-6">
				<h1 className="text-2xl font-bold mb-4">Dashboard</h1>

				{props.organisationInformation && (
					<>
						<div className="mb-6">
							<h2 className="text-xl font-semibold">
								Organisation: {props.organisationInformation.name}
							</h2>
							<Link
								href={`/editOrganisation/${props.organisationInformation._id}`}
							>
								<Button className="mt-6">Edit Organisation</Button>
							</Link>
						</div>

						<div>
							<h2 className="text-xl font-semibold mb-4">Your Events</h2>
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
												<Link href={`/editEvent/${eve._id}`}>
													<Button>Edit</Button>
												</Link>
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

				{/* <div className="mb-6">
        <Link href="/createEvent">
          <Button>Create Event</Button>
        </Link>
      </div> */}
			</div>
		</>
	);
};

export default Dashboard;

// {props.organisationInformation && (
//     <div className="mb-6">
//       <h2 className="text-xl font-semibold">Organisation: {props.organisationInformation.name}</h2>
//       <Link href={`/editOrganisation/${props.organisationInformation._id}`}>
//         <Button>Edit Organisation</Button>
//       </Link>
//     </div>

//     <div>
//   <h2 className="text-xl font-semibold mb-4">Events</h2>
//   {props.organisationInformation.events && props.organisationInformation.events.length > 0 ? (
//     <ul className="space-y-4">
//       {props.organisationInformation.events.map((eve: any) => (
//         <li key={eve._id} className="p-4 border rounded-lg flex justify-between items-center">
//           <div>
//             <h3 className="text-lg font-medium">{eve.title}</h3>
//             <p>{eve.description}</p>
//             <p>{new Date(eve.date).toDateString()} - {eve.startTime} to {eve.endTime}</p>
//           </div>
//           <Link href={`/editEvent/${eve._id}`}>
//             <Button>Edit</Button>
//           </Link>
//         </li>
//       ))}
//     </ul>
//   ) : (
//     <p>No events available.</p>
//   )}
// </div>
//   )}
