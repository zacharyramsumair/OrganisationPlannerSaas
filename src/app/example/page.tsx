import AddTopicButton from "@/components/Examples/AddTopicButton";
import TopicsList from "@/components/Examples/TopicsList";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

type Props = {};

const page = async (props: Props) => {
	return (
		<div>
			<AddTopicButton />

			<TopicsList />
		</div>
	);
};

export default page;
