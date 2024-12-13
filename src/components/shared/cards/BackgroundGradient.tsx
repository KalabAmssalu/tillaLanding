"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";
import { BackgroundGradient } from "@/components/ui/custom/background-gradient";
import { IMAGES } from "@/constants/files";

type PortalType = {
	title: string;
	description: string;
	image: keyof typeof IMAGES;
	href: string;
	linkText: string;
};

export function BackgroundGradientCard({ portal }: { portal: PortalType }) {
	const route = useRouter();
	return (
		<div onClick={() => route.push(portal.href as `/${string}`)}>
			<BackgroundGradient className="rounded-[22px] cursor-pointer max-w-sm p-4 h-auto sm:p-10 bg-white dark:bg-zinc-900">
				<Image
					src={IMAGES[portal.image]}
					alt="jordans"
					height="200"
					width="300"
					className="object-cover h-64 "
				/>
				<p className="text-base font-bold sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
					{portal.title}
				</p>

				<p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
					{portal.description}
				</p>
				<Button
					className="flex items-center text-primary space-x-1 mt-4 p-0 text-xs font-bold"
					variant={"ghost"}
				>
					{portal.linkText}
				</Button>
			</BackgroundGradient>
		</div>
	);
}
