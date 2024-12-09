"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { BookUser, UserRoundPen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { HeroHighlight } from "@/components/ui/custom/hero-highlight";

const BrokerOrAgent = () => {
	const route = useRouter();
	return (
		<HeroHighlight className="flex items-center">
			<div className="flex flex-col items-center justify-center min-h-screen p-8  space-y-10">
				<h2 className="text-4xl font-extrabold text-primary text-center">
					Choose Your Role
				</h2>

				<p className="text-lg font-bold text-center max-w-md">
					Please select the option that best suits your role to get started with
					your registration process.
				</p>

				<div className="flex justify-center space-x-6">
					<Button
						className="w-52 h-10"
						onClick={() => route.push("/broker/register/1" as `/${string}`)}
					>
						Broker
						<div className="flex gap-0 ml-2">
							<UserRoundPen size={16} />
						</div>
					</Button>

					<Button
						className="w-52 h-10"
						onClick={() => route.push("/broker/register/2" as `/${string}`)}
					>
						Agent
						<div className="flex gap-0 ml-2">
							<BookUser size={16} />
						</div>
					</Button>
				</div>

				<footer className="text-sm text-gray-500 text-center">
					Need help?{" "}
					<Link href="/support" className="text-[#5AD3FC] underline">
						Contact Support
					</Link>
				</footer>
			</div>
		</HeroHighlight>
	);
};

export default BrokerOrAgent;
