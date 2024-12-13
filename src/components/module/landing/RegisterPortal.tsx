// "use client";

// import { useEffect, useRef } from "react";

// import { gsap } from "gsap";

// import { BackgroundGradientCard } from "@/components/shared/cards/BackgroundGradient";
// import { IMAGES } from "@/constants/files";

// const Portals = [
// 	{
// 		title: "Providers Portal",
// 		description: "Register to our platform to become a health provider.",
// 		image: "provider" as keyof typeof IMAGES,
// 		href: "/providers/register",
// 	},
// 	{
// 		title: "Members Portal",
// 		description: "Register to our platform to have a health insurance.",
// 		image: "avater" as keyof typeof IMAGES,
// 		href: "/member/register",
// 	},
// 	{
// 		title: "Broker Portal",
// 		description:
// 			"Register to our platform to become a broker in health insurance.",
// 		image: "broker" as keyof typeof IMAGES,
// 		href: "/broker/register",
// 	},
// ];
// export default function RegisterPortal() {
// 	const heroRef = useRef(null);

// 	useEffect(() => {
// 		const ctx = gsap.context(() => {
// 			gsap.from(".hero-animate", {
// 				y: 30,
// 				opacity: 0,
// 				duration: 1,
// 				stagger: 0.2,
// 				ease: "power3.out",
// 			});
// 		}, heroRef);

// 		return () => ctx.revert();
// 	}, []);

// 	return (
// 		<section
// 			ref={heroRef}
// 			className="relative min-h-[600px] bg-cover bg-center bg-no-repeat"
// 		>
// 			<div className="absolute inset-0 bg-opacity-50"></div>
// 			<div className="container relative mx-auto px-4 pt-32 pb-16 z-10">
// 				<h1 className="hero-animate text-[3rem] md:text-[4rem] font-bold text-center text-primary mb-8 leading-tight">
// 					Register for?
// 				</h1>

// 				<div className="hero-animate flex items-center justify-center space-x-10 mx-auto">
// 					{Portals.map((portal) => (
// 						<BackgroundGradientCard key={portal.href} portal={portal} />
// 					))}
// 				</div>
// 			</div>
// 		</section>
// 	);
// }
