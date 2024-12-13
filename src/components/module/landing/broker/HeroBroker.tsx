import { IMAGES } from "@/constants/files";

import { HeroInfo } from "../HeroInfo";

const BrokerPortals = [
	{
		title: "Make Broker changes",
		description: "Learn how to submit changes via Tilla BROKER WEB PORTAL...",
		image: "broker1" as keyof typeof IMAGES,
		href: "/broker/become_a_broker",
		slug: "become-a-broker",
		linkText: "Make Changes to Providers Information →",
	},
	{
		title: "Features of the Broker Portal",
		description: "",
		image: "broker2" as keyof typeof IMAGES,
		href: "/broker/features",
		slug: "broker-portal",
		linkText: "View The tools and platform provided →",
	},
	{
		title: "Why Partner with Tilla Health?",
		description:
			"Tilla Health has a variety of forms and information related to the claims, appeals and grievances process",
		image: "broker3" as keyof typeof IMAGES,
		href: "/broker/why_tilla",
		slug: "why-partner-with-tilla",
		linkText: "Learn More and Grow your business with Tilla Health →",
	},
];

export default function BrokerHero() {
	return <HeroInfo title="Broker Information" portals={BrokerPortals} />;
}
