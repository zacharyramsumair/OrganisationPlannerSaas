import { ourFileRouter } from "@/app/api/uploadthing/core";
import Navbar from "@/components/Navbar/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { extractRouterConfig } from "uploadthing/server";
import "./globals.css";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const runtime =  'nodejs'

export const metadata: Metadata = {
	title: "UEvents",
	description: "Effortlessly Craft a Calendar of Events with Our application",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.ico" />
			</head>
			<body className={inter.className}>
				<Providers>
					<NextSSRPlugin
						/**
						 * The `extractRouterConfig` will extract **only** the route configs
						 * from the router to prevent additional information from being
						 * leaked to the client. The data passed to the client is the same
						 * as if you were to fetch `/api/uploadthing` directly.
						 */
						routerConfig={extractRouterConfig(ourFileRouter)}
					/>

					<Navbar />
					<div className="min-h-screen">{children}</div>
					<Footer />
					<Toaster />
				</Providers>
			</body>
		</html>
	);
}
