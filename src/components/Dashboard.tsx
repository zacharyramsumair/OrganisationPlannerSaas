"use client"
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Edit, Plus, Trash2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteEventDialog } from "./DeleteEventDialog";
import convert24HourTo12Hour from "@/lib/convert24HourTo12Hour";

type Props = {
    organisationInformation: any;
};

const Dashboard = (props: Props) => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-primary">Dashboard</h1>

            {props.organisationInformation && (
                <>
                    <div className="mb-6 p-4 border rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold mb-2 text-primary">
                            Organisation: {props.organisationInformation.name}
                        </h2>
                        <p className="mb-4">Username: @{props.organisationInformation.username}</p>
                        <p className="mb-2">
                            Description: {props.organisationInformation.description || "N/A"}
                        </p>
                        <p className="mb-2">Email: {props.organisationInformation.email || "N/A"}</p>
                        <p className="mb-2">
                            Contact Number: {props.organisationInformation.contactNumber || "N/A"}
                        </p>
                        <Link href={`/editOrganisation`}>
                            <Button className="mt-4 bg-primary hover:bg-indigo-700">
                                <Edit className="mr-2" /> Edit Organisation
                            </Button>
                        </Link>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-4 text-primary">Your Events</h2>

                        <div className="my-6">
                            <Link href="/createEvent">
                                <Button className="bg-green-500 hover:bg-green-600">
                                    <Plus className="mr-2" /> Create Event
                                </Button>
                            </Link>
                        </div>

                        {props.organisationInformation.events &&
                        props.organisationInformation.events.length > 0 ? (
                            <ul className="space-y-4">
                                {props.organisationInformation.events.map((eve: any) => (
                                    <motion.li
                                        key={eve._id}
                                        className="p-4 border rounded-lg flex justify-between items-center shadow-md"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div>
                                            <h3 className="text-lg font-medium text-primary">
                                                {eve.title}
                                            </h3>
                                            <p className="">{eve.description}</p>
                                            <p className="text-gray-500 flex items-center">
                                                <Calendar className="mr-1" />
                                                {new Date(eve.date).toDateString()} -{" "}
                                                {convert24HourTo12Hour(eve.startTime)} -{" "}
                                                {convert24HourTo12Hour(eve.endTime)}
                                            </p>
                                        </div>
                                        <div className="flex gap-5">
                                            <Link href={`/editEvent/${eve._id}`}>
                                                <Button className="">
                                                    <Edit className="mr-2" /> Edit
                                                </Button>
                                            </Link>
                                            <DeleteEventDialog eventId={eve._id}>
                                                <Button className="bg-red-500 hover:bg-red-600">
                                                    <Trash2 className="mr-2" /> Delete
                                                </Button>
                                            </DeleteEventDialog>
                                        </div>
                                    </motion.li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No events available.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
