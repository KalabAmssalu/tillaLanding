"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type PortalType = {
	title: string;
	href: string;
	linkText: string;
};

export function SimpleCard({ portal }: { portal: PortalType }) {
	const route = useRouter();
	return (
		<div onClick={() => route.push(portal.href as `/${string}`)}>
			<div className="cursor-pointer max-w-sm p-6 h-[200px] sm:p-6 rounded-lg flex flex-col justify-center items-center bg-secondary">
				{" "}
				{/* Set background color and adjusted size */}
				<p className="text-lg  font-bold text-center mb-4"> {portal.title}</p>
				<Button
					className="flex items-center text-primary space-x-1 p-0 text-xs font-bold"
					variant={"link"}
				>
					{portal.linkText}
				</Button>
			</div>
		</div>
	);
}
