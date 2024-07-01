import HomePage from "@/components/HomePage/HomePage";
import StarsCanvas from "@/components/StarBackground";
import { fetchCurrentUser } from "@/app/api/user/getCurrentUser/route";
import { auth } from "@/auth";

export default async function Home() {
	const session = await auth();
	let currentUser = false;
	if (session?.user?.email) {
		currentUser = await fetchCurrentUser(session?.user?.email);
	}

	return (
		<>
			{/* <StarsCanvas/> */}
			<HomePage currentUser={currentUser} />
		</>
	);

	// if (!currentUser) {
	// 	return (
	// 		<main className="p-24">
	// 			<section className="py-12 flex flex-col items-center text-center">
	// 				<h1 className="text-4xl font-bold">Shadcn is awesome</h1>
	// 				<p className="text-2xl text-muted-foreground">
	// 					Hand picked themes that you can copy and paste
	// 				</p>
	// 			</section>
	// 			<section className="flex gap-6  items-center justify-center">
	// 				<Button variant={"outline"}>Learn More</Button>
	// 				<Button>Enroll Now</Button>
	// 			</section>

	// 			<section className="flex gap-6  items-center justify-center">
	// 				<ExampleForm />
	// 			</section>
	// 		</main>
	// 	);
	// }

	// if (currentUser) {
	// 	return (
	// 		<main className="p-24">
	// 			<section className="py-12 flex flex-col items-center text-center">
	// 				<h1 className="text-4xl font-bold">Some Headline</h1>
	// 				{/* <p className="text-2xl text-muted-foreground">
	// 				Hand picked themes that you can copy and paste
	// 			</p> */}
	// 			</section>
	// 			<section className="flex gap-6  items-center justify-center">
	// 				<Button variant={"outline"}>Search</Button>

	// 				{currentUser.organisations.length > 0 ? (
	// 					<Link href={"/dashboard"}>
	// 						<Button>Dashboard</Button>
	// 					</Link>
	// 				) : (
	// 					<Link href={"/createOrganisation"}>
	// 						<Button>Create Organisation</Button>
	// 					</Link>
	// 				)}
	// 			</section>{" "}
	// 		</main>
	// 	);
	// }
}
