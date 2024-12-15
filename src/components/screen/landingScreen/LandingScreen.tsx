"use client";

import { useEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

import CTA from "@/components/module/landing/CTA";
import DiscoverPlans from "@/components/module/landing/DiscoverPlan";
import { HeroHighlightDemo } from "@/components/module/landing/HeroHighLight";
import { PartnerSlider } from "@/components/module/landing/PartnerSlider";
import MemberHero from "@/components/module/landing/member/HeroMembers";
import MemberCards from "@/components/module/landing/member/MemberCards";
import MemberInfo from "@/components/module/landing/member/MemberInfo";
import { IMAGES } from "@/constants/files";

gsap.registerPlugin(ScrollTrigger);

export default function LandingScreen() {
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
					text="Your Health, Our Priority."
					link="/member"
					btnText="Register as a Member"
				/>
				<MemberHero />

				<PartnerSlider partners={partner} />
				<MemberCards />
				<DiscoverPlans />
				<MemberInfo />
				{/* <Features /> */}
				{/* <HeroMember /> */}
				{/* <Testimonials /> */}
				{/* <CTA 
				text="Access your Member Portal"
					link="/member"
				description="Our Member Portal is designed to give you full control over your health plan. 
(If you're a new member, registering is simple.[Register Here], complete the form with your details, and create your secure login.)"
					btnText="Launch the Portal"/> */}
				<CTA
					text="Access your Member Portal"
					link="/member"
					description={[
						// "Our Provider Portal is a secure, all-in-one platform to manage your interactions with Tilla Health.",
						// "Joining the Provider Portal is easy.",
						"If you're a new member [Register Here], complete the form with your details, and create your secure login.",
					]}
					btnText="Launch the Portal"
					registerLink="/member"
					slug="member-portal"
				/>
			</main>
		</div>
	);
}
