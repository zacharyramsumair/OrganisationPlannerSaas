import React from "react";
import Image from "next/image";
import { ModeToggle } from "./ui/toggle-mode";

type Props = {};

const Navbar = (props: Props) => {
	return (
		<header>
			<nav>
				<ul className="flex items-center justify-between">
					<li>
						<a
							className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
							href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Image
								src="/vercel.svg"
								alt="Vercel Logo"
								className="dark:invert"
								width={100}
								height={24}
								priority
							/>
						</a>
					</li>
					<li>
						<ModeToggle />
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Navbar;
