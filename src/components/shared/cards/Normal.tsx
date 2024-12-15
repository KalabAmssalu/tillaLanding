"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { IMAGES } from "@/constants/files";

type PortalType = {
	title: string;
	description: string;
	image: keyof typeof IMAGES;
	href: string;
	linkText: string;
};

export function NormalCard({ portal }: { portal: PortalType }) {
	const router = useRouter();

	return (
		<motion.div
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.9 }}
			transition={{ type: "spring", stiffness: 50, damping: 20 }}
		>
			<Card
				className="cursor-pointer w-full max-w-sm h-[500px] bg-background dark:bg-zinc-900 overflow-hidden"
				onClick={() => router.push(portal.href as `/${string}`)}
			>
				<CardHeader className="p-0">
					<div className="relative h-64 w-full">
						<Image
							src={IMAGES[portal.image]}
							alt={portal.title}
							fill
							className="object-cover"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
					</div>
				</CardHeader>
				<CardContent className="p-6">
					<CardTitle className="text-xl mb-2 text-primary dark:text-primary-foreground">
						{portal.title}
					</CardTitle>
					<p className="text-sm text-muted-foreground line-clamp-3">
						{portal.description}
					</p>
				</CardContent>
				<CardFooter className="p-6 pt-0">
					<Button
						variant="ghost"
						className="text-primary transition-colors duration-300 p-2 text-sm font-semibold"
					>
						{portal.linkText}
					</Button>
				</CardFooter>
			</Card>
		</motion.div>
	);
}
