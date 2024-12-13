"use client";

import { useEffect, useRef } from "react";

import { gsap } from "gsap";

import { NormalCard } from "@/components/shared/cards/Normal";
import { IMAGES } from "@/constants/files";

interface Portal {
	title: string;
	description: string;
	image: keyof typeof IMAGES;
	slug: string;
	linkText: string;
}

interface InfoProps {
	title: string;
	portals: Portal[];
}

export function Info({ title, portals }: InfoProps) {
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
			className="relative min-h-[600px] mb-10  bg-cover bg-center bg-no-repeat"
		>
			<div className="absolute inset-0 bg-opacity-50"></div>
			<div className="container relative mx-auto px-4 pt-5 pb-20 z-10">
				<h1 className="hero-animate text-[1rem] md:text-[2rem] font-bold text-center text-primary mb-16 leading-tight">
					{title}
				</h1>
				<div className="hero-animate flex flex-wrap items-center justify-center gap-4 ">
					{portals.map((portal) => (
						<NormalCard
							key={portal.slug}
							portal={{
								...portal,
								href: `/blog/${portal.slug}`,
							}}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
