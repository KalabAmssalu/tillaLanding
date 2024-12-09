"use client";

import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

import { HeroHighlightDemo } from "@/components/module/landing/HeroHighLight";
import HeroMember from "@/components/module/landing/HeroMember";
import { PartnerSlider } from "@/components/module/landing/PartnerSlider";
import { IMAGES } from "@/constants/files";

gsap.registerPlugin(ScrollTrigger);

export default function ProviderScreen() {
	const mainRef = useRef(null);
	const t = useTranslations();
	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from(".animate-fade-in", {
				opacity: 0,
				y: 50,
				duration: 1,
				stagger: 0.2,
				ease: "power3.out",
				scrollTrigger: {
					trigger: ".animate-fade-in",
					start: "top 80%",
				},
			});
		}, mainRef);

		return () => ctx.revert();
	}, []);

	const partner = [
		{ name: "blacklionlogo", logo: IMAGES.blackLion },
		{ name: "who", logo: IMAGES.whoLogo },
		{ name: "moh", logo: IMAGES.mohLogo },
		{ name: "paulos", logo: IMAGES.paulosLog },
		{ name: "redcrosslogo", logo: IMAGES.redCrossLog },
		{ name: "pauloslogo", logo: IMAGES.paulosLog },
		{ name: "mohlogo", logo: IMAGES.mohLogo },
		{ name: "blacklion", logo: IMAGES.blackLion },
	];
	return (
		<div className="flex flex-col min-h-screen">
			<main ref={mainRef} className="min-h-screen bg-background">
				<HeroHighlightDemo
					text="Provide A good Health Service"
					link="/provider/register"
					btnText="Register as a Provider"
				/>
				<PartnerSlider partners={partner} />
				{/* <DiscoverPlans /> */}
				{/* <Features /> */}
				<HeroMember />
				{/* <Testimonials /> */}
				{/* <CTA /> */}
			</main>
		</div>
	);
}
