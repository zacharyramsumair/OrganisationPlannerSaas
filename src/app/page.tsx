import Image from "next/image";
import Navbar from "./../components/Navbar";
import { Button } from "@/components/ui/button";
import { ExampleForm } from "@/components/Examples/ExampleForm";
import { getSession } from "@/lib/getSession";
import { Organisation } from "./../models/organisation";
import Link from "next/link";

export default async function Home() {
	const session = await getSession();

	if (!session) {
		return (
			<main className="p-24">
				<Navbar />
				<section className="py-12 flex flex-col items-center text-center">
					<h1 className="text-4xl font-bold">Shadcn is awesome</h1>
					<p className="text-2xl text-muted-foreground">
						Hand picked themes that you can copy and paste
					</p>
				</section>
				<section className="flex gap-6  items-center justify-center">
					<Button variant={"outline"}>Learn More</Button>
					<Button>Enroll Now</Button>
				</section>

				<section className="flex gap-6  items-center justify-center">
					<ExampleForm />
				</section>
			</main>
		);
	}

	if (session) {
		return (
			<main className="p-24">
				<Navbar />
				<section className="py-12 flex flex-col items-center text-center">
					<h1 className="text-4xl font-bold">Some Headline</h1>
					{/* <p className="text-2xl text-muted-foreground">
					Hand picked themes that you can copy and paste
				</p> */}
				</section>
				<section className="flex gap-6  items-center justify-center">
					<Button variant={"outline"}>Search</Button>
					<Link href={"/createOrganisation"}>
					<Button>Create Organisation</Button>
					</Link>
				</section>{" "}
			</main>
		);
	}
}
