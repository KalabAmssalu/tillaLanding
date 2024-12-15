"use client";

import { useEffect, useRef } from "react";

import { gsap } from "gsap";

import { SimpleCard } from "@/components/shared/cards/SimpleCard";
import { IMAGES } from "@/constants/files";

type PortalType = {
	title: string;
	description: string;
	image: keyof typeof IMAGES;
	href: string;
	linkText: string;
};

type CardProps = {
	portals: PortalType[];
};

export function Cards({ portals }: CardProps) {
	const heroRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from(".hero-animate", {
				y: 30,
				opacity: 0,
				duration: 1,
				stagger: 0.2,
				ease: "power3.out",
			});
		}, heroRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={heroRef}
			className="relative min-h-[300px] mb-10 bg-cover bg-center bg-no-repeat"
		>
			<div className="absolute inset-0 bg-opacity-50"></div>
			<div className="hero-animate  flex-wrap items-center justify-center  mx-auto pt-20 p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
				{portals.map((portal) => (
					<SimpleCard key={portal.href} portal={portal} />
				))}
			</div>
		</section>
	);
}
