import { Button } from "@/components/ui/button";


type Props = {};

const HomePage = async (props: Props) => {
	return (
		<div>
		<Button variant={"ghost"}>Search</Button>
		<Button>Create Organisation</Button>
		</div>
	);
};

export default HomePage;
