import { IMAGES } from "@/constants/files";

import { HeroInfo } from "../HeroInfo";
import { Info } from "../Info";

const ProviderPortals = [
	{
		title: "Become a Credentialed Provider in Ethiopia",
		description: "Learn how become a Tilla Health Provider",
		image: "provider3" as keyof typeof IMAGES,
		href: "/provider/become-a-provider",
		slug: "credentialed-provider",
		linkText: "Become a Credentialed Provider →",
	},
	{
		title: "Commitment to Excellence in Quality",
		description:
			"Tilla Health adheres to national health quality assurance standards set forth by Ethiopian regulatory bodies. Our commitment to quality assurance ensures that we deliver safe, effective, and reliable healthcare services across our network.",
		image: "consulting" as keyof typeof IMAGES,
		href: "/provider/quality_assurance",
		slug: "quality-commitment",
		linkText: "Quality Assurance and Monitoring →",
	},
	{
		title: "How to Refer a Patient to a Specialist",
		description:
			"Tilla Health in-network providers can now refer members directly to in-network specialists without requiring a written referral from a primary care physician (PCP). This change is designed to improve access to care and simplify the experience for both members and providers.",
		image: "provider2" as keyof typeof IMAGES,
		href: "/provider/refer-paitent",
		slug: "patient-referral",
		linkText: "Refer a Patient to a Specialist →",
	},
];

export default function ProviderInfo() {
	return <HeroInfo title="Provider Information" portals={ProviderPortals} />;
}
