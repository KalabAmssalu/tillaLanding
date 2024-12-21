"use client";

import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

import CTA from "@/components/module/landing/CTA";
import { HeroHighlightDemo } from "@/components/module/landing/HeroHighLight";
import { PartnerSlider } from "@/components/module/landing/PartnerSlider";
import ProviderHero from "@/components/module/landing/provider/HeroProvider";
import ProviderInfo from "@/components/module/landing/provider/ProviderInfo";
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
					link="/providerpow/select"
					btnText="Register as a Provider"
				/>
				<ProviderInfo />
				<PartnerSlider partners={partner} />
				{/* <DiscoverPlans /> */}
				{/* <Features /> */}
				<ProviderHero />

				{/* <Testimonials /> */}
				<CTA
					text="Streamline Your Practice with Tilla Health"
					link="/provider"
					description={[
						// "Our Provider Portal is a secure, all-in-one platform to manage your interactions with Tilla Health.",
						// "Joining the Provider Portal is easy.",
						"[Register Here] and complete the onboarding form. Once verified, you’ll receive your login credentials.",
					]}
					btnText="Launch the Portal"
					registerLink="/broker"
					slug="join-network"
				/>
			</main>
		</div>
	);
}
