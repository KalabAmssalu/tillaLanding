"use client";

import { useEffect, useRef } from "react";

import { gsap } from "gsap";

import { BackgroundGradientCard } from "@/components/shared/cards/BackgroundGradient";
import { NormalCard } from "@/components/shared/cards/Normal";
import { IMAGES } from "@/constants/files";

type PortalType = {
	title: string;
	description: string;
	image: keyof typeof IMAGES;
	slug: string;
	href: string;
	linkText: string;
};

type HeroInfoProps = {
	title: string;
	portals: PortalType[];
};

export function HeroInfo({ title, portals }: HeroInfoProps) {
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
			className="relative min-h-[600px] mb-20 border-b-2 border-primary bg-cover bg-center bg-no-repeat"
		>
			<div className="absolute inset-0 bg-opacity-50"></div>
			<div className="container relative mx-auto px-4 pt-6 pb-40 z-10">
				<h1 className="hero-animate text-[1rem] md:text-[2rem] font-bold text-center text-primary mb-10 leading-tight">
					{title}
				</h1>

				<div className="hero-animate flex flex-wrap items-center justify-center gap-4 mx-auto">
					{/* {portals.map((portal) => (
						<BackgroundGradientCard key={portal.href} portal={portal} />
					))} */}
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
