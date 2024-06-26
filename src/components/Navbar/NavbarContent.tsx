"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ModeToggle } from "../ui/toggle-mode";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { handleSignOut } from "@/action/signOut";

type Props = {
	currentUser: any;
};

const NavbarContent = (props: Props) => {
	const { currentUser } = props;

	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const drawerRef = useRef(null);

	const toggleDrawer = () => {
		setIsDrawerOpen(!isDrawerOpen);
	};

	const closeDrawer = () => {
		setIsDrawerOpen(false);
	};

	useEffect(() => {
		const handleOutsideClick = (event:any) => {
			if (drawerRef.current && !drawerRef.current.contains(event.target)) {
				setIsDrawerOpen(false);
			}
		};

		if (isDrawerOpen) {
			document.addEventListener("mousedown", handleOutsideClick);
		} else {
			document.removeEventListener("mousedown", handleOutsideClick);
		}

		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, [isDrawerOpen]);

	return (
		<header>
			<nav className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-900">
				<div className="flex items-center">
					<div className="lg:hidden">
						<button onClick={toggleDrawer}>
							{isDrawerOpen ? <X /> : <Menu />}
						</button>
					</div>
					<a
						// href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
						// target="_blank"
						href="/"
						rel="noopener noreferrer"
						className="ml-4"
					>

						UEvents<sup>BETA</sup>
						{/* <Image
							src="/vercel.svg"
							alt="Vercel Logo"
							className="dark:invert"
							width={100}
							height={24}
							priority
						/> */}
					</a>
				</div>
				<div className="hidden lg:flex space-x-4 items-center">
					{!currentUser && <Link href="/login">Login</Link>}
					<Link href="/calendar">Calendar</Link>
					{currentUser && currentUser.organisations.length > 0 && (
						<Link href="/dashboard">Dashboard</Link>
					)}
					{currentUser && (
						<form action={handleSignOut}>
							<Button type="submit" variant={"ghost"}>
								Logout
							</Button>
						</form>
					)}
				</div>
				<div className="flex items-center">
					<ModeToggle />
				</div>
			</nav>
			{/* Drawer Menu */}
			{isDrawerOpen && (
				<div className="lg:hidden fixed inset-0 bg-gray-900 bg-opacity-50 z-50">
					<div
						className="flex flex-col items-start justify-start h-full w-64 bg-white dark:bg-gray-800"
						ref={drawerRef}
					>
						<button className="self-end m-4" onClick={toggleDrawer}>
							<svg
								className="w-6 h-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
						{/* <Link
							href="/login"
							className="mx-4 my-2"
							onClick={closeDrawer}
						>
							Login
						</Link>
						<Link
							href="/calendar"
							className="mx-4 my-2"
							onClick={closeDrawer}
						>
							Calendar
						</Link>
						<Link
							href="/dashboard"
							className="mx-4 my-2"
							onClick={closeDrawer}
						>
							Dashboard
						</Link> */}

						{!currentUser && (
							<Link
								href="/login"
								className="mx-4 my-2"
								onClick={closeDrawer}
							>
								Login
							</Link>
						)}
						<Link
							href="/calendar"
							className="mx-4 my-2"
							onClick={closeDrawer}
						>
							Calendar
						</Link>
						{currentUser && currentUser.organisations.length > 0 && (
							<Link
								href="/dashboard"
								className="mx-4 my-2"
								onClick={closeDrawer}
							>
								Dashboard
							</Link>
						)}
						{currentUser && (
							<form action={handleSignOut}>
								<Button
									type="submit"
									variant={"ghost"}
									className=""
									// onClick={closeDrawer}
								>
									Logout
								</Button>
							</form>
						)}
					</div>
				</div>
			)}
		</header>
	);
};

export default NavbarContent;