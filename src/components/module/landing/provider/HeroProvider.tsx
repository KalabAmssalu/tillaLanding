import { IMAGES } from "@/constants/files";

import { HeroInfo } from "../HeroInfo";

const ProviderPortals = [
	{
		title: "Make provider changes",
		description: "Learn how to submit changes via Tilla PROVIDER WEB PORTAL...",
		image: "doctor2" as keyof typeof IMAGES,
		href: "/provider/info-update",
		slug: "provider-information-updates",
		linkText: "Make Changes to Providers Information →",
	},
	{
		title: "Provider Support Resources",
		description:
			"View important news, alerts, newsletters, provider manuals and more for providers.",
		image: "provider5" as keyof typeof IMAGES,
		href: "/provider/provider-resources",
		slug: "provider-resource",
		linkText: "View Providers Resources →",
	},
	{
		title: "Claims, Appeals, and Grievances",
		description:
			"Tilla Health has a variety of forms and information related to the claims, appeals and grievances process",
		image: "claimform2" as keyof typeof IMAGES,
		href: "/provider/claim-appeal-grievance",
		slug: "claims-appeals-grievances",
		linkText: "Learn More About Claims, Appeals, and Grievances →",
	},
	{
		title: "How to Join the Tilla Health Network?",
		description:
			"Tilla Health is proud to collaborate with dedicated healthcare professionals to deliver high-quality care to our members. Joining the Tilla Health network means becoming part of a community of providers committed to excellence, innovation, and compassionate care.",
		image: "doctor" as keyof typeof IMAGES,
		href: "/provider/tilla-network",
		slug: "join-network",
		linkText: "Learn More About Joining the Tilla Health Network →",
	},
];

export default function ProviderHero() {
	return <HeroInfo title="Additional Information" portals={ProviderPortals} />;
}
