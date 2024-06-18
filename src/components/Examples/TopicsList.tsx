"use client";

import React, { useEffect, useState } from "react";

type Topic = {
	id: string;
	title: string;
	description: string;
};

const TopicsList = () => {
	const [topics, setTopics] = useState<Topic[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const getTopics = async () => {
		try {
			const res = await fetch("http://localhost:3000/api/topic", {
				cache: "no-store",
			});

			if (!res.ok) {
				throw new Error("Failed to fetch topics");
			}

			const data = await res.json();

			// Ensure the data is an array, access the data based on model name
			if (Array.isArray(data.topics)) {
				setTopics(data.topics);
			} else {
				throw new Error("Fetched data is not an array");
			}
		} catch (error) {
			setError((error as Error).message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getTopics();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<section>
			{/* <h1>Topics</h1> */}
			<ul>
				{topics.map((topic) => (
					<li key={topic.id}>
						<h2>{topic.title}</h2>
						<p>{topic.description}</p>
					</li>
				))}
			</ul>
		</section>
	);
};

export default TopicsList;
