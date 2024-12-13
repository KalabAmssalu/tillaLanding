"use client";

import { useEffect, useRef } from "react";

import { gsap } from "gsap";

import { BackgroundGradientCard } from "@/components/shared/cards/BackgroundGradient";
import { NormalCard } from "@/components/shared/cards/Normal";
import { IMAGES } from "@/constants/files";

const Portals = [
	{
		title: "Make provider changes",
		description: "Learn how to submit changes via Tilla PROVIDER WEB PORTAL...",
		image: "sampleImage3" as keyof typeof IMAGES,
		href: "/provider/info-update",
		linkText: "Make Changes to Providers Information →",
	},
	{
		title: "Provider Support Resources",
		description:
			"View important news, alerts, newsletters, provider manuals and more for providers.",
		image: "provider" as keyof typeof IMAGES,
		href: "/provider/provider-resources",
		linkText: "View Providers Resources →",
	},
	{
		title: "Claims, Appeals, and Grievances",
		description:
			"Tilla Health has a variety of forms and information related to the claims, appeals and grievances process",
		image: "sampleImage5" as keyof typeof IMAGES,
		href: "/provider/claim-appeal-grievance",
		linkText: "Learn More About Claims, Appeals, and Grievances →",
	},
];

export default function HeroMember() {
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
			<div className="container relative mx-auto px-4 pt-20 pb-40 z-10">
				<h1 className="hero-animate text-[1rem] md:text-[2rem] font-bold text-center text-primary mb-16 leading-tight">
					Provider Information
				</h1>

				<div className="hero-animate flex flex-wrap items-center justify-center gap-4 mx-auto">
					{Portals.map((portal) => (
						<NormalCard key={portal.href} portal={portal} />
					))}
				</div>
			</div>
		</section>
	);
}
