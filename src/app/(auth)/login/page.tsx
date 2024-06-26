// Import necessary modules and components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { signIn } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/getSession";
import googleLogo from "google-logo.png";
import Image from "next/image";

const Login = async () => {
	const session = await getSession();
	const user = session?.user;
	if (user) redirect("/");

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
			<div className="max-w-md w-full mx-auto mb-40 p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800">
				<h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
					Login
				</h1>

				<form
					action={async () => {
						"use server";
						await signIn("google");
					}}
				>
					

					<button
            className="relative group/btn flex space-x-4 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            {/* <IconBrandGoogle className="h-6 w-6 text-neutral-800 dark:text-neutral-300" /> */}
            <Image
						src="/google-logo.png"
						width={20}
						height={20}
						alt="Google Logo"
					/>
            <span className="ml-2 text-neutral-700 dark:text-neutral-300 text-sm">
              Sign in with Google
            </span>
          </button>
				</form>
			</div>
		</div>
	);
};

export default Login;
