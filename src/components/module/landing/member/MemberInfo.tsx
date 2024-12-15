import { IMAGES } from "@/constants/files";

import { Info } from "../Info";

const MemberPortals = [
	{
		title:
			"Keep your Tilla Health account up to date whenever there are changes in your life.",
		description:
			"Tilla Health has a variety of forms and information related to the claims, appeals and grievances process",
		image: "member6" as keyof typeof IMAGES,
		slug: "update-info",
		linkText: "Updating Your Information →",
	},
	{
		title: "Take Control of Your Health with the Tilla Health Member Portal.",
		description:
			"Your one-stop destination to manage your care, track services, access tools, and schedule appointments—all at your fingertips.",
		image: "sampleImage5" as keyof typeof IMAGES,
		slug: "member-portal",
		linkText: "Learn about how to access Your Member Portal →",
	},
	{
		title:
			"Bringing Healthcare Within Reach: Tilla Health's Comprehensive Transportation Assistance",
		description:
			"By providing reliable transport options, Tilla Health helps patients overcome barriers to access, ensuring they can attend essential medical appointments and receive the care they need, when they need it.",
		image: "transportToClinic" as keyof typeof IMAGES,
		slug: "transport-assistance",
		linkText: "Learn More About Our Transportation Assistance →",
	},
];

export default function MemberInfo() {
	return <Info title="Additional Information" portals={MemberPortals} />;
}
