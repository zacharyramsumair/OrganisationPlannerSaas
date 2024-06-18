"use client";
import React from "react";
import { Button } from "@/components/ui/button";

type Props = {};

const AddTopicButton = (props: Props) => {
	function generateRandomString(length: number) {
		const characters =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		let result = "";
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * charactersLength);
			result += characters.charAt(randomIndex);
		}
		return result;
	}

	let addTopic = async () => {
		try {
			const res = await fetch("http://localhost:3000/api/topic", {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					title: "title",
					description: "description",
				}),
			});
		} catch (error) {
			console.log(error);
		}
	};

	return <Button onClick={addTopic}>AddTopicButton</Button>;
};

export default AddTopicButton;
